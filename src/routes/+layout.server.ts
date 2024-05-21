import type { ServerLoadEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { ErrorResponse, NotificationResponse } from '$domains';

/**
 * Handles the loading for the imprint layout.
 *
 * @param event The SvelteKit load event.
 * @returns The response containing notification data or an error.
 */
export const load: LayoutServerLoad = async (event: ServerLoadEvent) => {
	const token = event.cookies.get('token');
	if (!token) {
		return { error: true, data: {} } as ErrorResponse;
	}

	const response = await event.fetch('/api/notifications', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	return body as NotificationResponse | ErrorResponse;
};
