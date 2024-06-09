import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ChatsResponse, ErrorResponse } from '$domains';
import { loadChats } from '$utils';

/**
 * Handles the server-side loading for the the Chats page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing chat data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const chatsData: ChatsResponse | ErrorResponse = await loadChats(event);
	return chatsData;
};
