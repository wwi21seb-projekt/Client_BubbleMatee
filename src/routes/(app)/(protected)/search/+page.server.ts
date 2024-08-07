import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ErrorObject, PostData } from '$domains';
import { fetchFirstPostsFeed, globalConfig } from '$utils';

/**
 * Handles the server-side loading for the myProfile page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing user data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const data: ErrorObject | PostData = await fetchFirstPostsFeed(
		event,
		'',
		globalConfig.limit,
		'global'
	);
	return data as ErrorObject | PostData;
};
