import type { ChatMessage, Error } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { type Writable, writable } from 'svelte/store';

let socket: WebSocket | null = null;

const messageStore: Writable<ChatMessage> = writable({
	content: '',
	creationDate: '',
	username: ''
} as ChatMessage);
const messageErrorStore: Writable<Error> = writable({
	code: 'noerror',
	message: 'Kein Fehler aufgetreten'
} as Error);

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
 * Stores an error message.
 *
 * @param error The error to store.
 * @returns void
 */
const storeMessageError = (error: Error) => {
	messageErrorStore.set(error);
};

/**
 * Resets the error message.
 *
 * @returns void
 */
export const resetMessageError = () => {
	storeMessageError({
		code: 'noerror',
		message: 'Kein Fehler aufgetreten'
	});
};

/**
 * Resets the message.
 *
 * @returns void
 */
export const resetMessage = () => {
	storeMessage({
		content: '',
		creationDate: '',
		username: ''
	});
};

export const subscribeMessage = messageStore.subscribe;
export const subscribeMessageError = messageErrorStore.subscribe;

/**
 * Connects to the WebSocket.
 *
 * @param chatId The ID of the chat.
 * @param token The token to connect with.
 * @returns void
 */
export function connectToWebSocket(chatId: string, token: string) {
	if (typeof window !== 'undefined') {
		const protocol = PUBLIC_BASE_URL.startsWith('https') ? 'wss' : 'ws';
		const base_url = `${protocol}://${PUBLIC_BASE_URL.replace('http://', '').replace('https://', '')}`;
		socket = new WebSocket(`${base_url}/api/chat?chatId=${chatId}`, [token]);
	}

	if (socket) {
		// Connection opened
		socket?.addEventListener('open', () => {
			console.log("It's open");
		});

		// Listen for messages
		socket?.addEventListener('message', (event) => {
			try {
				const decodedMessage = JSON.parse(event.data);
				if (decodedMessage.error) {
					storeMessageError(decodedMessage.error);
				} else if (
					!decodedMessage.content ||
					!decodedMessage.creationDate ||
					!decodedMessage.username
				) {
					storeMessageError({
						code: '500',
						message: 'Unbekannter Fehler'
					});
				} else {
					storeMessage(decodedMessage);
				}
			} catch (error) {
				console.error('Fehler beim Parsen von JSON: ', error);
			}
		});
	}
}

/**
 * Disconnects from the WebSocket.
 */
export function disconnectFromWebSocket() {
	if (socket) {
		socket.close();
		console.log('Disconnected from WebSocket');
	}
}
