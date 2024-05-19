export const activatePushNotifications = async () => {
	// isLoggedIn = !!localStorage.getItem('username');
	// if ('serviceWorker' in navigator) {
	// 	navigator.serviceWorker.register('/service-worker.js');
	// }

	if (Notification.permission === 'default') {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const status = await Notification.requestPermission();

		//TODO: move here the code from the next block
	}
	if (Notification.permission === 'granted') {
		navigator.serviceWorker.ready.then((registration) => {
			const options = {
				body: 'Welcome to our website!',
				icon: '/src/images/layout/logo.png', //icon on the left
				badge: '/src/images/layout/logo.png', //icon on top of screen
				image: '/src/images/layout/logo.png', //on the right on mobile
				vibrate: [
					500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500
				],
				sound: '/src/sound/notification.mp3',
				actions: [{ action: 'explore', title: 'Go to the site' }]
			};
			registration.showNotification('Welcome to our website!', options);
		});
	}
};
