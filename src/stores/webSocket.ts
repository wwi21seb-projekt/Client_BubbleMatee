import type { ChatMessage } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { type Writable, writable } from 'svelte/store';

let socket: WebSocket | null = null;

const messageStore: Writable<ChatMessage> = writable({} as ChatMessage);
const unsendMessageStore: Writable<ChatMessage> = writable({} as ChatMessage);

export function connectToWebSocket(chatId: string) {
	console.log('Connecting to WebSocket');
	if (typeof window !== 'undefined') {
		const protocol = PUBLIC_BASE_URL.startsWith('https') ? 'wss' : 'ws';
		const base_url = `${protocol}://${PUBLIC_BASE_URL.replace('http://', '').replace('https://', '')}`;
		socket = new WebSocket(base_url + '/api/chat?chatId=' + chatId);
	}

	if (socket) {
		// Connection opened
		socket?.addEventListener('open', function (event: Event) {
			console.log("It's open");
			console.log(event);
		});

		// Listen for messages
		socket?.addEventListener('message', function (event) {
			try {
				const decodedMessage = JSON.parse(event.data);
				storeMessage(decodedMessage);
			} catch (error) {
				console.error('Fehler beim Parsen von JSON: ', error);
			}
		});
	}
}

export const sendMessage = (message: string) => {
	if (socket && socket.readyState <= 1) {
		socket.send(
			JSON.stringify({
				content: message
			})
		);
	}
};

const storeMessage = (message: ChatMessage) => {
	messageStore.set(message);
};

export const storeUnsendMessage = (message: ChatMessage) => {
	unsendMessageStore.set(message);
};

export const subscribeMessage = messageStore.subscribe;
export const subscribeUnsendMessage = unsendMessageStore.subscribe;
