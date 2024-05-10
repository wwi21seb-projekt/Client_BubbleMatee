import type { ErrorResponse } from '$domains';
import type { CommentResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET requests to retrieve comments.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param url The requested URL containing the search parameters.
 * @returns The response containing feed data or an error.
 */
export const GET: RequestHandler = async ({ fetch, url, params }) => {
    const postId = params.postId;
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/posts/${postId}/comments${url.search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as CommentResponse);
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