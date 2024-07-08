import type { ErrorResponse, SubscriptionListResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles DELETE requests to unfollow a user.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The params object containing the subscriptionId.
 * @returns The response containing follow data or an error.
 */
export const DELETE: RequestHandler = async ({ fetch, params }) => {
	const subscriptionId = params.subscriptionId;
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/subscriptions/${subscriptionId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			return json({ data: {}, error: false });
		}
		const body = await response.json();
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

/**
 * Handles GET requests to retrieve subscription information.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param url The requested URL containing the search parameters.
 * @returns The response containing feed data or an error.
 */
export const GET: RequestHandler = async ({ fetch, url, params }) => {
	const username = params.subscriptionId;
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/subscriptions/${username + url.search}`, {
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
				error: {
					code: '500',
					message: 'Internal Server Error'
				}
			}
		} as ErrorResponse);
	}
};
