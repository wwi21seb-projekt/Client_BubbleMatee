import type { ErrorResponse } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * Handles DELETE requests to delete a notification.
 *
 * @param fetch The fetch function for making HTTP requests.
 * @param params The params object containing the postId.
 * @returns The response containing nothing or an error.
 */
export const DELETE: RequestHandler = async ({ fetch, params }) => {
	const notificationId: string = params.notificationId as string;
	try {
		const response: Response = await fetch(
			`${PUBLIC_BASE_URL}/api/notifications/${notificationId}`,
			{
				method: 'DELETE'
			}
		);

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
