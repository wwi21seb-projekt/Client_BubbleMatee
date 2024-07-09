import type { ChatMessageResponse, ErrorResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET request to retrieve chat messages.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param url The requested URL containing the search parameters.
 * @returns The response containing all chat messages or an error.
 */
export const GET: RequestHandler = async ({ fetch, url }) => {
	try {
		const response: Response = await fetch(`${PUBLIC_BASE_URL}${url.pathname}${url.search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as ChatMessageResponse);
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
