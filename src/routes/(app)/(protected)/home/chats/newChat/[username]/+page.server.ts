import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ChatMessageResponse, ChatsResponse, ErrorResponse } from '$domains';
import { getCurrentUser, loadChats } from '$utils';

/**
 * Handles the server-side loading for the the Chats page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing chat data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const username: string = getCurrentUser(event.cookies.get('token'));
	const chatsData: ChatsResponse | ErrorResponse = await loadChats(event);
	const chatMessageData: ErrorResponse | ChatMessageResponse = { data: { records: [], pagination: { offset: 0, limit: 0, records: 0 } }, error: false };
	return { chatsData: chatsData, chatMessageData: chatMessageData, username: username };
};
