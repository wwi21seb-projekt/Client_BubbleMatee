import type { ErrorResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles POST requests to register to push notifications.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @param cookies The cookies of the request.
 * @returns The response containing login data or an error.
 */
export const POST: RequestHandler = async ({ fetch, request }) => {
	const requestBody = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/push/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				subscription: requestBody,
				type: 'web'
			})
		});

		if (response.ok) {
			return json({ data: {}, error: false });
		}

		const body = await response.json();
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		console.error(exception);
		return json({
			error: true,
			data: {
				code: '500',
				message: 'Internal Server Error'
			}
		});
	}
};
