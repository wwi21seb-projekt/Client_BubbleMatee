import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ErrorResponse, UserInfoResponse } from '$domains';

/**
 * Handles the server-side loading for the myProfile page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing user data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const response = await event.fetch(`/api/users/johanna`, {
		//TODO: change to currentUser
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	return body as UserInfoResponse | ErrorResponse;
};
