import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ErrorResponse, ImprintResponse } from '$domains';

/**
 * Handles the server-side loading for the imprint page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing imprint data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const response = await event.fetch('/api/imprint', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	return body as ImprintResponse | ErrorResponse;
};
