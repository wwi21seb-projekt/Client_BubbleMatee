import type { ErrorResponse, ChatsResponse, ChatResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles GET request to get all chats.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param url The requested URL containing the search parameters.
 * @returns The response containing data of about all chat partners.
 */
export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/chats`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();
		if (response.ok) {
			const result = { data: body, error: false };
			return json(result as ChatsResponse);
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
 * Handles POST requests for creating a new chat.
 * @param fetch The fetch function for making HTTP requests.
 * @param request The SvelteKit request object.
 * @returns The response containing the created chat.
 */

export const POST: RequestHandler = async ({ fetch, request }) => {
	const requestBody = await request.json();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/api/chats`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		const body = await response.json();
		if (response.ok) {
			return json({ data: body, error: false } as ChatResponse);
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
