import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadUser } from '$utils';

/**
 * Handles the server-side loading for the myProfile page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing user data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	return await loadUser(event);
};
