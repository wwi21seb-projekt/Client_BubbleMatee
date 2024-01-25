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

/**
 * Loads the Users by searchterm
 *
 * @param searchQuery - searchterm for users
 * @param limit - the maximum number of users that should be fetched
 * @param offset - start of the page
 * @returns a UserInfo-Object consisting of an Array with the users and additional information needed to load the next page
 * @throws an error: type = Error code */
export async function loadSearchedUser(searchQuery: string, offset: number, limit: string) {
	const response = await fetch(
		`/api/users?username=${searchQuery}&offset=${offset}&limit=${limit}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	const body = await response.json();
	return body;
}
