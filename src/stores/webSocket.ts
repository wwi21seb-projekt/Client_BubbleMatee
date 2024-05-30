import type { ChatMessage } from '$domains';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { type Writable, writable } from 'svelte/store';

let socket: WebSocket | null = null;

if (typeof window !== 'undefined') {
	socket = new WebSocket(`ws://${PUBLIC_BASE_URL.replace('http://', '').replace('https://', '')}`);
}

const messageStore: Writable<ChatMessage> = writable({} as ChatMessage);

if (socket) {
	// Connection opened
	socket?.addEventListener('open', function (event: Event) {
		console.log("It's open");
		console.log(event);
	});

	// Listen for messages
	socket?.addEventListener('message', function (event) {
		console.log('Message from server ', event.data);
		try {
			event.data.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
				// Erstellen Sie ein Uint8Array und geben Sie das ArrayBuffer als Argument
				const uint8Array = new Uint8Array(arrayBuffer);

				// Decodieren Sie das Uint8Array in einen String
				const decoder = new TextDecoder();
				const decodedMessage = JSON.parse(decoder.decode(uint8Array));

				console.log(decodedMessage);
				messageStore.set(decodedMessage);
			});
		} catch (error) {
			console.error('Fehler beim Parsen von JSON: ', error);
		}
	});
}

export const sendMessage = (message: string) => {
	if (socket && socket.readyState <= 1) {
		socket.send(message);
	}
};

export const storeMessage = (message: ChatMessage) => {
	messageStore.set(message);
};

export const subscribe = messageStore.subscribe;
