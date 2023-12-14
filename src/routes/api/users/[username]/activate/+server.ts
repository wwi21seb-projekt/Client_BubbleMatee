import type { ErrorResponse, LoginResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles POST requests to activate a user.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @param params The parameters extracted from the route.
 * @returns The response containing login data or an error.
 */
export const POST: RequestHandler = async ({ fetch, request, params }) => {
	const username = params.username;
	console.log(` POST ${PUBLIC_BASE_URL}/api/users/${username}/activate`);
	const requestBody = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/users/${username}/activate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const body = await response.json();

		if (response.ok) {
			return json({ data: body, error: false } as LoginResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: {
				code: 500,
				message: 'Internal Server Error'
			}
		});
	}
};

/**
 * Handles DELETE requests to resend the code to a user.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The parameters extracted from the route.
 * @returns The response containing data or an error.
 */
export const DELETE: RequestHandler = async ({ fetch, params }) => {
	const username = params.username;
	console.log(` DELETE ${PUBLIC_BASE_URL}/api/users/${username}/activate`);

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/users/${username}/activate`, {
			method: 'DELETE'
		});

		const body = await response.json();
		return json({ data: body, error: response.ok ? false : true });
	} catch (exception) {
		return json({
			error: true,
			data: {
				code: 500,
				message: 'Internal Server Error'
			}
		});
	}
};
