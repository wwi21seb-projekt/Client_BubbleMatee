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
	//TODO: überprüfen ob bereits vorhanden und dann nicht nochmal anfordern
	const subscription: PushSubscription = await subscribeUserToPush();

	// 3. Send push subscription to server
	const successful: boolean = await sendSubscriptionToBackEnd(subscription);
	console.log('Subscription sent to server: ', successful);
};

async function askPermission(): Promise<string> {
	let status: NotificationPermission = Notification.permission;
	if (Notification.permission === 'default') {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		status = await Notification.requestPermission();

		//TODO: move here the code from the next block
	}
	if (Notification.permission === 'granted') {
		const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;
		const options = {
			body: 'Welcome to our website!',
			icon: '/src/images/layout/logo.png', //icon on the left
			badge: '/src/images/layout/logo.png', //icon on top of screen
			image: '/src/images/layout/logo.png', //on the right on mobile
			vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500],
			sound: '/src/sound/notification.mp3',
			actions: [{ action: 'explore', title: 'Go to the site' }]
		};
		registration.showNotification('Welcome to our website!', options);
	}
	return status;
}

async function subscribeUserToPush(): Promise<PushSubscription> {
	const vapidKey: string = await getVapidKey();

	const subscribeOptions: PushSubscriptionOptionsInit = {
		userVisibleOnly: true,
		applicationServerKey: btoa(vapidKey) // base64encoded or arraybuffer
	};

	const registration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;

	const pushSubscription: PushSubscription =
		await registration.pushManager.subscribe(subscribeOptions);

	console.log('Received PushSubscription: ', pushSubscription);
	return pushSubscription;
}

async function getVapidKey(): Promise<string> {
	try {
		const response = await fetch(`/api/push/vapid`, {
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

function sendSubscriptionToBackEnd(subscription: PushSubscription): Promise<boolean> {
	return fetch('/api/push/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(subscription)
	}).then(function (response) {
		if (!response.ok) {
			throw new Error('Bad status code from server.');
		}

		return true;
	});
}
