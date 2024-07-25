import type { ErrorResponse, LoginResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to get user information.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The parameters extracted from the route.
 * @returns The response containing user data or an error.
 */
export const GET: RequestHandler = async ({ fetch, params }) => {
	const username: string | undefined = params.username;

	try {
		const response: Response = await fetch(`${PUBLIC_BASE_URL}/api/users/${username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await response.json();

		if (response.ok) {
			return json({ data: body, error: false } as LoginResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: { error: { code: 500, message: 'Internal Server Error' } }
		});
	}
};
