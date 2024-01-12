import type { ErrorResponse } from '$domains';
import type { UserFeedResponse } from '$domains/ServerResponses';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to retrieve imprint information.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param url The requested URL containing the search parameters.
 * @param params The parameters extracted from the route.

 * @returns The response containing feed data or an error.
 */
export const GET: RequestHandler = async ({ fetch, url, params }) => {
	const username = params.username;
	console.log(` GET ${PUBLIC_BASE_URL}/api/user/${username}/feed${url.search}`);
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/users/${username}/feed${url.search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();

		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as UserFeedResponse);
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
