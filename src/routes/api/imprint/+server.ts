import type { ErrorResponse, ImprintResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to retrieve imprint information.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @returns The response containing imprint data or an error.
 */
export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/imprint`, {
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
		body.error.message = getErrorMessage(body.code);
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: {
				code: '500',
				message: 'Internal Server Error'
			}
		} as ErrorResponse);
	}
};
