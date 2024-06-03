import type { ChatMessage } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { type Writable, writable } from 'svelte/store';

let socket: WebSocket | null = null;

const messageStore: Writable<ChatMessage> = writable({} as ChatMessage);
const unsendMessageStore: Writable<ChatMessage> = writable({} as ChatMessage);

/**
 * Stores a message.
 *
 * @param message The message to store.
 * @returns void
 */
const storeMessage = (message: ChatMessage) => {
	messageStore.set(message);
};

/**
 * Sends a message to the WebSocket.
 *
 * @param message The message to send.
 * @returns void
 */
export const sendMessage = (message: string) => {
	if (socket && socket.readyState <= 1) {
		socket.send(
			JSON.stringify({
				content: message
			})
		);
	}
};

/**
 * Stores an unsend message.
 *
 * @param message The unsend message.
 * @returns void
 */
export const storeUnsendMessage = (message: ChatMessage) => {
	unsendMessageStore.set(message);
};

export const subscribeMessage = messageStore.subscribe;
export const subscribeUnsendMessage = unsendMessageStore.subscribe;

/**
 * Connects to the WebSocket.
 *
 * @param chatId The ID of the chat.
 * @returns void
 */
export function connectToWebSocket(chatId: string) {
	console.log('Connecting to WebSocket');
	if (typeof window !== 'undefined') {
		const protocol = PUBLIC_BASE_URL.startsWith('https') ? 'wss' : 'ws';
		const base_url = `${protocol}://${PUBLIC_BASE_URL.replace('http://', '').replace('https://', '')}`;
		socket = new WebSocket(`${base_url}/api/chat?chatId=${chatId}`);
	}

	if (socket) {
		// Connection opened
		socket?.addEventListener('open', (event: Event) => {
			console.log("It's open");
			console.log(event);
		});

		// Listen for messages
		socket?.addEventListener('message', (event) => {
			try {
				const decodedMessage = JSON.parse(event.data);
				storeMessage(decodedMessage);
			} catch (error) {
				console.error('Fehler beim Parsen von JSON: ', error);
			}
		});
	}
}
