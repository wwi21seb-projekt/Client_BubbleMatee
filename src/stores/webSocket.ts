import { PUBLIC_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';

let socket: WebSocket | null = null;

if (typeof window !== 'undefined') {
	socket = new WebSocket(`ws://${PUBLIC_BASE_URL.replace('http://', '').replace('https://', '')}`);
}
const messageStore = writable('');

if (socket) {
	// Connection opened
	socket?.addEventListener('open', function (event: Event) {
		console.log("It's open");
		console.log(event);
	});

	// Listen for messages
	socket?.addEventListener('message', function (event) {
		console.log('Message from server ', event.data);
		messageStore.set(event.data);
	});
}

export const sendMessage = (message: string) => {
	if (socket && socket.readyState <= 1) {
		socket.send(message);
	}
};

export const storeMessage = (message: string) => {
	messageStore.set(`You: ${message}`);
};

export const subscribe = messageStore.subscribe;
