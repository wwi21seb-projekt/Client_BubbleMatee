import type { ErrorResponse, PostCommentResponse, CommentResponse} from '$domains';
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

/**
 * Handles POST requests for commenting a post.
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @returns The response containing registration data or an error.
 */

export const POST: RequestHandler = async ({ fetch, request, params }) => {
	const postId = params.postId;
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/posts/${postId}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		const body = await response.json();
		if (response.ok) {
			return json({ data: body, error: false } as PostCommentResponse);
		}
		return json({ data: body, error: true } as ErrorResponse);
	} catch (exception) {
		return json({
			error: true,
			data: {
				code: '500',
				message: 'Internal Server Error'
			}
		});
	}
};
