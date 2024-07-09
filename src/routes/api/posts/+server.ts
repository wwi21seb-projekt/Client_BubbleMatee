import type { ErrorResponse, FeedResponse, RegisterResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to retrieve posts.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param url The requested URL containing the search parameters.
 * @returns The response containing feed data or an error.
 */
export const GET: RequestHandler = async ({ fetch, url }) => {
	try {
		const response: Response = await fetch(`${PUBLIC_BASE_URL}/api/posts${url.search}`, {
			method: 'GET',
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
 * Handles POST requests for creating a new post.
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @returns The response containing registration data or an error.
 */
export const POST: RequestHandler = async ({ fetch, request }) => {
	const requestBody = await request.json();
	try {
		const response: Response = await fetch(`${PUBLIC_BASE_URL}/api/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		const body = await response.json();

		if (response.ok) {
			return json({ data: body, error: false } as RegisterResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: {
				error: { code: '500', message: 'Internal Server Error' }
			}
		});
	}
};
