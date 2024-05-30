import type { ChatMessageResponse, ChatsResponse, ErrorResponse } from '$domains';
import type { ServerLoadEvent } from '@sveltejs/kit';
/**
 * Function for loading all open chats via Svelte Kit
 * @param event Event from Sveltekit Server "ServerLoadEvent"
 */

export async function loadChats(event: ServerLoadEvent) {
	const response = await event.fetch(`/api/chats`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const body = await response.json();
	return body as ChatsResponse | ErrorResponse;
}

/**
 * Loads the first posts from the feed endpoint
 *
 * @param event - The ServerLoadEvent
 * @param offset - the start of the chat messages
 * @param limit - the maximum number of chat messages that should be fetched
 * @returns a ChatMessage-Object consisting of an Array with the next chat messages and additional information needed to load the next page
 * @throws an error: type = Error code
 */ export async function loadChatMessages(
	event: ServerLoadEvent,
	chatId: string,
	offset: string,
	limit: string
) {
	const response = await event.fetch(`/api/chats/${chatId}?offset=${offset}&limit${limit}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const body: ErrorResponse | ChatMessageResponse = await response.json();
	return body;
}
