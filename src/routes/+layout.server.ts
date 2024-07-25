import { json, type ServerLoadEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { ErrorResponse, NotificationResponse } from '$domains';

/**
 * Handles the loading for the imprint layout.
 *
 * @param event The SvelteKit load event.
 * @returns The response containing notification data or an error.
 */
export const load: LayoutServerLoad = async (event: ServerLoadEvent) => {
	try {
		const token: string | undefined = event.cookies.get('token');
		if (!token) {
			return { error: true, data: {} } as ErrorResponse;
		}

		const response: Response = await event.fetch('/api/notifications', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const body = await response.json();
		return body as NotificationResponse | ErrorResponse;
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
