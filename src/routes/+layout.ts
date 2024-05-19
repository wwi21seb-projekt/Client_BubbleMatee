import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import type { ErrorResponse, NotificationResponse } from '$domains';

/**
 * Handles the loading for the imprint layout.
 *
 * @param event The SvelteKit load event.
 * @returns The response containing notification data or an error.
 */
export const load: LayoutLoad = async (event: LoadEvent) => {
	const response = await event.fetch('/api/notifications', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	return body as NotificationResponse | ErrorResponse; //TODO: type
};
