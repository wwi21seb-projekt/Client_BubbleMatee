import type { ErrorResponse, FeedResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles POST for Password-Reset Code.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The requested URL containing the search parameters.
 * @returns The response containing feed data or an error.
 * @param request The SvelteKit request object.
 */
export const POST: RequestHandler = async ({ fetch, params }) => {
	const username: string = params.username as string;
	console.log(username);
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/${username}/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as FeedResponse);
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

export const PATCH: RequestHandler = async ({ fetch, request, params }) => {
	const username: string = params.username as string;
	const requestBody = await request.json();

	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/${username}/reset-password`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		const body = await response.json();
		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as FeedResponse);
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
