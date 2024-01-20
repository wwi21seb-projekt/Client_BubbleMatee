import type { ErrorResponse, LoginResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles POST requests to activate a user.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @param params The parameters extracted from the route.
 * @param cookies The cookies of the request.
 * @returns The response containing login data or an error.
 */
export const POST: RequestHandler = async ({ fetch, request, params, cookies }) => {
	const username = params.username;
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

		if (response.ok && response.status !== 208) {
			const { token, refreshToken } = body;

			cookies.set('token', token, { path: '/' });
			cookies.set('refreshToken', refreshToken, { path: '/' });

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

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/users/${username}/activate`, {
			method: 'DELETE'
		});

		if (response.ok) {
			return json({ data: {}, error: false });
		}
		return json({
			data: {
				error: {
					code: response.status.toString(),
					message: getErrorMessage(response.status.toString())
				}
			},
			error: true
		});
	} catch (exception) {
		return json({
			error: true,
			data: {
				code: '500',
				message: 'Internal Server Error'
			}
		});
	}
};
