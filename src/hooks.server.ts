import { redirect, type HandleFetch } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { tokenExpired } from '$utils';
import { isLoggedIn } from '$stores';
import { get } from 'svelte/store';

const unauthorizedRoutes = [
	'/',
	'/login.*',
	'/about',
	'/login/passwordForget',
	'/trending',
	'/api/.*/reset-password',
	'/api/feed.*feedType=global',
	'/api/imprint',
	'/api/passwordForget',
	'/api/users/.*/activate', // Verify API
	'/api/users', // User API
	'/api/users/login', // Login API
	'/api/users/logout', // Logout API
	'/api/location.*' //Location API
];

/**
 * Checks if the route is unauthorized.
 *
 * @param pathname The path of the route.
 * @param method The HTTP method of the request.
 * @returns True if the route is unauthorized, false otherwise.
 */
const isUnauthorizedRoute = (pathname: string, method: string) => {
	if (pathname !== '/api/users' || method === 'POST') {
		const result = unauthorizedRoutes.some((route) => {
			const pattern = new RegExp(`^${route}$`);
			return pattern.test(pathname);
		});
		return result;
	} else {
		return false;
	}
};

/**
 * Handles requests to the server.
 *
 * @param event The SvelteKit event object.
 * @param resolve The function to execute the request.
 * @returns The response containing the data or an error.
 */
export const handle = async ({ event, resolve }) => {
	console.log(
		`\tInternal request: ${event.request.method} ${
			event.url.pathname + event.url.search
		}, ${Date.now()}}`
	);
	const isLoggedInLocal: boolean = get(isLoggedIn);
	/**Rerouting to startpage*/
	if (event.route.id && event.route.id === '/') {
		if (get(isLoggedIn)) {
			throw redirect(302, '/home');
		} else {
			throw redirect(302, '/about');
		}
	}
	/**Protection of certain routes.*/
	if (isLoggedInLocal && event.route.id?.startsWith('/(app)/(protected)')) {
		throw redirect(302, '/login?redirect=1');
	}

	// Unauthorized routes: Just let them pass through
	if (isUnauthorizedRoute(event.url.pathname + event.url.search, event.request.method)) {
		const response = await resolve(event);
		return response;
	}

	// Authorized routes:
	// 1. Check if the token is valid
	// 2. If token is not valid, check if the refresh token is valid
	// 3. If refresh token is not valid, redirect to login page
	// 4. If refresh token is valid, refresh the token and execute the request

	// Step 1
	let token = event.cookies.get('token');
	if (token && !tokenExpired(token)) {
		event.request.headers.set('Authorization', `Bearer ${token}`);
		const response = await resolve(event);

		if (response.status === 401) {
			throw redirect(302, '/login?redirect=1');
		}
		return response;
	}

	console.log('Token expired');
	// Step 2
	const refreshToken = event.cookies.get('refreshToken');
	if (!refreshToken || tokenExpired(refreshToken)) {
		// Step 3
		console.log('Refresh token expired');
		throw redirect(302, '/login?redirect=1');
	}

	// Step 4
	console.log('Refreshing token...');
	const refreshTokenResponse = await fetch(`${PUBLIC_BASE_URL}/api/users/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ refreshToken })
	});

	if (!refreshTokenResponse.ok) {
		// Delete the cookies and redirect to login page
		console.log('Refresh token invalid');
		throw redirect(302, '/login?redirect=1');
	}

	console.log('Token refreshed');
	const { token: newToken, refreshToken: newRefreshToken } = await refreshTokenResponse.json();

	event.cookies.set('token', newToken, { path: '/' });
	event.cookies.set('refreshToken', newRefreshToken, { path: '/' });

	token = newToken;
	event.request.headers.set('Authorization', `Bearer ${token}`);

	const response = await resolve(event);
	if (response.status === 401) {
		throw redirect(302, '/login?redirect=1');
	}
	return response;
};

/**
 * Handles requests to the server.
 *
 * @param event The SvelteKit event object.
 * @param request The SvelteKit request object.
 * @param fetch The fetch function for making HTTP requests.
 * @returns The response containing the data or an error.
 */
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const url = new URL(request.url);
	console.log(`Outgoing request: ${request.method} ${url}`);
	if (
		PUBLIC_BASE_URL === url.origin &&
		!isUnauthorizedRoute(url.pathname + url.search, request.method)
	) {
		request.headers.set('Authorization', event.request.headers.get('Authorization') ?? '');
	}
	//Special case:
	// If the global feed (unauthoized route) is requested by an authorized user the auth-token should be send,
	// so that the server can identify wether the user has liked the post or not.
	else if (
		PUBLIC_BASE_URL === url.origin &&
		/^\/api\/feed.*feedType=global/.test(url.pathname + url.search)
	) {
		request.headers.set('Authorization', event.request.headers.get('Authorization') ?? '');
	}
	const response = await fetch(request);
	console.log(`\tResponse: ${response.status} ${response.statusText}`); // skipcq: JS-A1004
	return response;
};
