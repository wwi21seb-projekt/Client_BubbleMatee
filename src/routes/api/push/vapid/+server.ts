import type { ErrorResponse, VapidResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to retrieve vapid key of server.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param url The requested URL containing the search parameters.
 * @returns The response containing feed data or an error.
 */
export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const response: Response = await fetch(`${PUBLIC_BASE_URL}/api/push/vapid`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();

		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as VapidResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		console.error(exception);
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
