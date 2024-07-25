import type { ErrorResponse, ImprintResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to retrieve imprint information.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @returns The response containing imprint data or an error.
 */
export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const response: Response = await fetch(`${PUBLIC_BASE_URL}/api/imprint`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await response.json();

		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as ImprintResponse);
		}
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
		} as ErrorResponse);
	}
};
