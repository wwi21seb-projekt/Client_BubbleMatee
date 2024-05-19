/// <reference types="@sveltejs/kit" />
// / <reference no-default-lib="true"/>
// / <reference lib="esnext" />
// / <reference lib="webworker" />

import { build, files, version } from '$service-worker';

// const sw = self;

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) return;

	/**
	 * Respond to the request with either the cached response or the network response.
	 *
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

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
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

			// if there's no cache, then just error out
			// as there is nothing we can do to respond to this request
			throw err;
		}
	}

	event.respondWith(respond());
});

self.addEventListener('notificationclick', (event) => {
	if (!event.action) {
		// Was a normal notification click
		console.log('Notification Click.');
		return;
	}

	let examplePage = '/';

	switch (event.action) {
		case 'explore':
			console.log("User clicked 'Explore'");
			examplePage = '/trending';
			break;
		default:
			console.log(`Unknown action clicked: '${event.action}'`);
			break;
	}

	const urlToOpen = new URL(examplePage, self.location.origin).href;

	const promiseChain = self.clients
		.matchAll({
			type: 'window',
			includeUncontrolled: true
		})
		.then((windowClients) => {
			let matchingClient = null;

			for (let i = 0; i < windowClients.length; i++) {
				const windowClient = windowClients[i];
				if (windowClient.url === urlToOpen) {
					matchingClient = windowClient;
					break;
				}
			}

			if (matchingClient) {
				return matchingClient.focus();
			} else {
				return self.clients.openWindow(urlToOpen);
			}
		});

	event.waitUntil(promiseChain);
});
