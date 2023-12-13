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
	console.log(` GET ${PUBLIC_BASE_URL}/api/v1/imprint`);
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/v1/imprint`, {
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
				code: 500,
				message: 'Internal Server Error'
			}
		} as ErrorResponse);
	}
};