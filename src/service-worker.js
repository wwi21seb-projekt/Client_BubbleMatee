/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';
import { getNotificationOptions, getNotificationTitle } from '$utils';

const sw = self;

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

sw.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

sw.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

sw.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) return;

	/**
	 * Respond to the request with either the cached response or the network response.
	 * @returns The response to the request
	 */
	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		// for everything else, try the network first, but fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}

			if (response.status === 200) {
				await cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			// if there's no cache, then just error out as there is nothing we can do to respond to this request
			throw err;
		}
	}
	event.respondWith(respond());
});

sw.addEventListener('notificationclick', (event) => {
	let examplePage = '/';
	if (!event.action) {
		console.log('Notification Click.', event.notification.data.username);
		examplePage = `/search/user/${event.notification.data.username}`;
		console.log(event);
		if (event.notification.data.type === 'message') examplePage = '/home/chats';
	}

	switch (event.action) {
		case 'explore':
			console.log("User clicked 'Explore'");
			examplePage = '/trending';
			break;
		default:
			console.log(`Unknown action clicked: '${event.action}'`);
			break;
	}
	const urlToOpen = new URL(examplePage, sw.location.origin).href;

	const promiseChain = handleClient(sw, urlToOpen);
	event.waitUntil(promiseChain);

	/**
	 * Handle the client interaction
	 * @param {ServiceWorkerGlobalScope} serviceWorker The Service Worker
	 * @param {string} url The URL to open
	 * @returns {Promise<void>} An empty Promise
	 */
	async function handleClient(serviceWorker, url) {
		const windowClients = await serviceWorker.clients.matchAll({
			type: 'window',
			includeUncontrolled: true
		});

		let matchingClient = null;
		for (let i = 0; i < windowClients.length; i++) {
			const windowClient = windowClients[i];
			if (windowClient.url === url) {
				matchingClient = windowClient;
				break;
			}
		}

		if (matchingClient) {
			return matchingClient.focus();
		} else {
			return serviceWorker.clients.openWindow(url);
		}
	}
});

sw.addEventListener('push', (event) => {
	const notification = event.data.json();
	const title = getNotificationTitle(notification.notificationType);
	const options = getNotificationOptions(notification);

	const promiseChain = Promise.all([
		postMessageToClients(),
		sw.registration.showNotification(title, options)
	]);

	event.waitUntil(promiseChain);

	/**
	 * Check if the client is focused
	 * @returns {Promise<boolean>} Whether the client is focused
	 */
	async function isClientFocused() {
		const windowClients = await sw.clients.matchAll({
			type: 'window',
			includeUncontrolled: true
		});

		let clientIsFocused = false;
		for (let i = 0; i < windowClients.length; i++) {
			const windowClient = windowClients[i];
			if (windowClient.focused) {
				clientIsFocused = true;
				break;
			}
		}
		return clientIsFocused;
	}

	/**
	 * Post a message to all the clients
	 * @returns {Promise<void>} An empty Promise
	 */
	async function postMessageToClients() {
		if (!(await isClientFocused())) return;
		const windowClients = await sw.clients.matchAll({
			type: 'window',
			includeUncontrolled: true
		});

		windowClients.forEach((windowClient) => {
			windowClient.postMessage({
				message: 'Received a push message.',
				time: new Date().toString()
			});
		});
	}
});
