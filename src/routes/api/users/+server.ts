import type {
	EditUserInformationResponse,
	ErrorResponse,
	RegisterResponse,
	UserSearchResponse
} from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to get user search.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The parameters extracted from the route.
 * @returns The response containing user data or an error.
 */
export const GET: RequestHandler = async ({ fetch, request }) => {
	const url = new URL(request.url);

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/users${url.search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await response.json();

		if (response.ok) {
			return json({ data: body, error: false } as UserSearchResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: { error: { code: 500, message: 'Internal Server Error' } }
		});
	}
};

/**
 * Handles POST requests for user registration.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @returns The response containing registration data or an error.
 */
export const POST: RequestHandler = async ({ fetch, request }) => {
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const body = await response.json();

		if (response.ok) {
			return json({ data: body, error: false } as RegisterResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: {
				error: { code: '500', message: 'Internal Server Error' }
			}
		});
	}
};

/**
 * Handles PATCH requests for user registration.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @returns The response containing password data or an error.
 */
export const PATCH: RequestHandler = async ({ fetch, request }) => {
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/users`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			return json({ data: {}, error: false } as RegisterResponse);
		}

		const body = await response.json();
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: {
				error: {
					code: '500',
					message: 'Internal Server Error'
				}
			}
		});
	}
};

/**
 * Handles PUT requests for user.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @returns The response containing user data or an error.
 */
export const PUT: RequestHandler = async ({ fetch, request }) => {
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/users`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const body = await response.json();

		if (response.ok) {
			return json({ data: body, error: false } as EditUserInformationResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: {
				error: { code: '500', message: 'Internal Server Error' }
			}
		});
	}
};
