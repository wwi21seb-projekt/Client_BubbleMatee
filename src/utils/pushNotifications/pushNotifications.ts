import type { Notification } from '$domains';

/**
 * Activates push notifications for the user.
 * @returns A promise that resolves to void
 */
export const activatePushNotifications = async () => {
	if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
		return;
	}

	// 1. Request permission for notifications
	const permission = await askPermission();

	if (permission !== 'granted') {
		return;
	}

	// 2. Get push subscription
	const subscription: PushSubscription | null = await resubscribeUserToPush();

	// 3. Send push subscription to server
	if (subscription) {
		await sendSubscriptionToBackEnd(subscription);
	}
};

/**
 * @param notificationType - The type of the notification
 * @returns A string with the notification title
 */
export const getNotificationTitle = (notificationType: string): string => {
	switch (notificationType) {
		case 'repost':
			return 'Dein Beitrag wurde geteilt';
		case 'follow':
			return 'Du hast einen neuen Follower';
		case 'message':
			return 'Du hast eine neue Nachricht';
		default:
			return 'Du hast eine neue Benachrichtigung';
	}
};

/**
 * @param notification - The notification object
 * @returns An object with the notification options
 */
export const getNotificationOptions = (notification: Notification): NotificationOptions => {
	let body: string;
	const user = notification.user.nickname ? notification.user.nickname : notification.user.username;

	switch (notification.notificationType) {
		case 'repost':
			body = `${user} hat deinen Beitrag geteilt`;
			break;
		case 'follow':
			body = `${user} folgt dir jetzt`;
			break;
		case 'message':
			body = `${user} hat dir eine Nachricht geschickt`;
			break;
		default:
			body = 'Du hast eine neue Benachrichtigung';
	}

	const options = {
		body,
		data: {
			notificationId: notification.notificationId,
			username: notification.user.username,
			type: notification.notificationType
		},
		icon: '/src/images/layout/logo.png', //icon on the left
		badge: '/src/images/layout/logo.png', //icon on top of screen
		image: '/src/images/layout/logo.png', //on the right on mobile
		vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500],
		sound: '/src/sound/notification.mp3',
		tag: notification.notificationId
		// actions: [{ action: 'explore', title: 'Go to the site' }]
	};
	return options;
};

/**
 * The user is asked for permission to receive push notifications.
 * @returns A promise that resolves to the permission status
 */
async function askPermission(): Promise<string> {
	let status: NotificationPermission = Notification.permission;
	if (Notification.permission === 'default') {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		status = await Notification.requestPermission();
	}
	return status;
}

/**
 * The user is subscribed to push notifications.
 * @returns A promise that resolves to the subscription
 */
async function subscribeUserToPush(): Promise<PushSubscription | null> {
	const vapidKey: string = await getVapidKey();
	if (!vapidKey || vapidKey === '') {
		return null;
	}

	const subscribeOptions: PushSubscriptionOptionsInit = {
		userVisibleOnly: true,
		applicationServerKey: vapidKey // base64encoded or arraybuffer
	};

	const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;

	const pushSubscription: PushSubscription =
		await registration.pushManager.subscribe(subscribeOptions);

	return pushSubscription;
}

/**
 * The VAPID key is requested from the server.
 * @returns A promise that resolves to the VAPID key
 */
async function getVapidKey(): Promise<string> {
	try {
		const response = await fetch('/api/push/vapid', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();

		if (!body.error) {
			return body.data.key;
		}
		return '';
	} catch (e) {
		console.error(e);
		return '';
	}
}

/**
 * The subscription is sent to the server to be stored in the database.
 * @param subscription The subscription to send to the server
 * @returns A promise that resolves to true if the subscription was sent successfully
 */
async function sendSubscriptionToBackEnd(subscription: PushSubscription): Promise<boolean> {
	try {
		const response = await fetch('/api/push/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(subscription)
		});

		if (!response.ok) {
			throw new Error('Bad status code from server.');
		}

		return true;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

/**
 * The user is unsubscribed from push notifications.
 * @returns A promise that resolves to void
 */
async function unsubscribeUserFromPush(): Promise<void> {
	const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
	const subscription: PushSubscription | null = await registration.pushManager.getSubscription();

	if (subscription) {
		await subscription.unsubscribe();
	}
}

/**
 * The user is resubscribed to push notifications.
 * @returns A promise that resolves to the subscription
 */
async function resubscribeUserToPush(): Promise<PushSubscription | null> {
	await unsubscribeUserFromPush();
	return subscribeUserToPush();
}
