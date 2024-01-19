import type { ErrorResponse, FollowResponse, SubscriptionListResponse } from '$domains';
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

/**
 * Handles GET requests to retrieve subscription information.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param url The requested URL containing the search parameters.
 * @returns The response containing feed data or an error.
 */
export const GET: RequestHandler = async ({ fetch, url }) => {
	try {
		console.log(`${PUBLIC_BASE_URL}/api/subscriptions${url.search}`);
		const response = await fetch(`${PUBLIC_BASE_URL}/api/subscriptions${url.search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();

		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as SubscriptionListResponse);
		}
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
