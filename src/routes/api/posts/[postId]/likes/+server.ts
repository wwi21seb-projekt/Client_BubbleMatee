import type { ErrorResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';
/**
 * Handles DELETE requests to delete a like.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The params object containing the postId.
 * @returns The response containing nothing or an error.
 */
export const DELETE: RequestHandler = async ({ fetch, params }) => {
	const postId = params.postId;
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/posts/${postId}/likes`, {
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
		});
	}
};

/**
 * Handles POST requests to like a post.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The params object containing the postId.
 * @returns The response containing nothing or an error.
 */
export const POST: RequestHandler = async ({ fetch, params }) => {
	const postId = params.postId;
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/posts/${postId}/likes`, {
			method: 'POST'
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
		});
	}
};