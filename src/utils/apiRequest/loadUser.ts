import type { ErrorResponse, UserInfoResponse } from '$domains';
import type { ServerLoadEvent } from '@sveltejs/kit';
/**
 * Function for loading users via Svelte Kit
 * @param event Event from Sveltekit Server "ServerLoadEvent"
 */

export async function loadUser(event: ServerLoadEvent) {
	const username = event.params.username;

	const response = await event.fetch(`/api/users/${username}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	return body as UserInfoResponse | ErrorResponse;
}
