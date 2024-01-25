import type { ErrorResponse, FollowResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { getErrorMessage } from '$utils';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles POST requests to follow a user.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param request The incoming request object.
 * @returns The response containing follow data or an error.
 */
export const POST: RequestHandler = async ({ fetch, request }) => {
	const requestBody = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/subscriptions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const body = await response.json();

		if (response.ok) {
			return json({ data: body, error: false } as FollowResponse);
		}
		body.error.message = getErrorMessage(body.code);
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		console.error(exception);
		return json({
			error: true,
			data: {
				code: 500,
				message: 'Internal Server Error'
			}
		});
	}
};
