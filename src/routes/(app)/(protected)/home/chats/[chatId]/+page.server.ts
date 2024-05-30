import type { ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ChatMessageResponse, ChatsResponse, ErrorResponse } from '$domains';
import { globalConfig, loadChatMessages, loadChats } from '$utils';

/**
 * Handles the server-side loading for the the Chats page.
 *
 * @param event The SvelteKit server load event.
 * @returns The response containing chat data or an error.
 */
export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const chatId = event.params.chatId ? event.params.chatId : '';
	const chatsData: ChatsResponse | ErrorResponse = await loadChats(event);
	const chatMessageData: ErrorResponse | ChatMessageResponse = await loadChatMessages(
		event,
		chatId,
		'0',
		globalConfig.limit
	);
	return { chatsData: chatsData, chatMessageData: chatMessageData };
};
