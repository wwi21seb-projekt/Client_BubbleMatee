import type { ErrorResponse, LoginResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles POST requests for user login.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @param cookies The cookies of the request.
 * @returns The response containing login data or an error.
 */
export const POST: RequestHandler = async ({ fetch, request, cookies }) => {
	const requestBody = await request.json();
	try {
		const response: Response = await fetch(`${PUBLIC_BASE_URL}/api/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const body = await response.json();

		if (response.ok) {
			const { token, refreshToken }: { token: string; refreshToken: string } = body;

			cookies.set('token', token, { path: '/' });
			cookies.set('refreshToken', refreshToken, { path: '/' });

			return json({ data: body, error: false } as LoginResponse);
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
