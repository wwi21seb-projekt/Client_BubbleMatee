import { redirect, type HandleFetch } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { tokenExpired } from '$utils';
import { isLoggedIn } from '$stores';
import { get } from 'svelte/store';
/* import { tokenExpired } from './utils/token/tokenExpired'; */

const unauthorizedRoutes = [
	'/',
	'/login',
	'/login/register',
	'/login/resendToken',
	'/login/verify',
	'/about',
	'/search',
	'/search/user/.*', // Username page
	'/api/imprint',
	'/api/users/.*/activate', // Verify API
	'/api/users', // User API
	'/api/users/login' // Login API
];

/**
 * Creates a response to reset the cookies and redirect to the login page.
 *
 * @returns The response to reset the cookies and redirect to the login page.
 */
const resetCookieResponse = () => {
	const response = new Response('Redirect', { status: 303, headers: { Location: '/login' } });
	response.headers.set('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
	response.headers.set(
		'Set-Cookie',
		'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
	);

	return response;
};

/**
 * Handles requests to the server.
 *
 * @param event The SvelteKit event object.
 * @param resolve The function to execute the request.
 * @returns The response containing the data or an error.
 */
export const handle = async ({ event, resolve }) => {
	/**Protection of certain routes.*/
	if (get(isLoggedIn) && event.route.id?.startsWith('/(app)/(protected)')) {
		throw redirect(302, '/login');
	}

	console.log(`\tInternal request: ${event.request.method} ${event.url.pathname}, ${Date.now()}}`);

	// Unauthorized routes: Just let them pass through
	const isUnauthorizedRoute = (url: string) => {
		return unauthorizedRoutes.some((route) => {
			const pattern = new RegExp(`^${route}$`);
			return pattern.test(url);
		});
	};

	if (isUnauthorizedRoute(event.url.pathname)) {
		const response = await resolve(event);
		return response;
	}

	// Authorized routes:
	// 1. Check if the token is valid
	// 2. If token is not valid, check if the refresh token is valid
	// 3. If refresh token is valid, refresh the token and execute the request
	// 4. If refresh token is not valid, redirect to login page

	// Step 1
	const token = event.cookies.get('token');
	if (token && !tokenExpired(token)) {
		event.request.headers.set('Authorization', `Bearer ${token}`);
		const response = await resolve(event);

		return response;
	}

	// Step 2
	const refreshToken = event.cookies.get('refreshToken');
	if (!refreshToken || tokenExpired(refreshToken)) {
		// Step 4
		return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
	}

	/* 	// Step 3
	const refreshTokenResponse = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ refreshToken })
	}); 

	if (!refreshTokenResponse.ok) {
		// Delete the cookies and redirect to login page
		return resetCookieResponse();
	}

	const { token: newToken, refreshToken: newRefreshToken } = await refreshTokenResponse.json();

	event.cookies.set('token', newToken, { path: '/' });
	event.cookies.set('refreshToken', newRefreshToken, { path: '/' });

	token = newToken;
	event.request.headers.set('Authorization', `Bearer ${token}`); */

	const response = await resolve(event);
	return response.status === 401 ? resetCookieResponse() : response;
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

	if (PUBLIC_BASE_URL === url.origin && !unauthorizedRoutes.includes(url.pathname)) {
		request.headers.set('Authorization', event.request.headers.get('Authorization') ?? '');
	}
	const response = await fetch(request);
	return response.status === 401 ? resetCookieResponse() : response;
};
