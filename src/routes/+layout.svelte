<script lang="ts">
	import '../app.postcss';
	import { AppShell, Toast, Modal } from '@skeletonlabs/skeleton';
	import { Header, NavigationBarMobile, NavigationBarDesktop } from '$components';
	import { initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { hasNotifications, notifications } from '$stores';
	import type { ErrorResponse, NotificationResponse, Notification } from '$domains';
	import { redirectToLogin1, redirectToLogin2 } from '$stores/loading';
	import { goto, invalidateAll } from '$app/navigation';

	export let data: NotificationResponse | ErrorResponse;

	let isInvalidating: boolean = false;

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();

	if (typeof navigator !== 'undefined') {
		navigator.serviceWorker.addEventListener('message', async function (event) {
			hasNotifications.set(true);
			if (
				!$notifications.find(
					(notification) => notification.notificationId === event.data.data.notificationId
				) &&
				!isInvalidating
			) {
				isInvalidating = true;
				await invalidateAll();
				isInvalidating = false;
			}
		});
	}
	$: pageNotifications = data.error
		? undefined
		: (data.data as { records: Array<Notification> }).records;

	redirectToLogin1.subscribe((value) => {
		if (value) {
			goto('/login?redirect=1');
			redirectToLogin1.set(false);
		}
	});

	redirectToLogin2.subscribe((value) => {
		if (value) {
			goto('/login?redirect=2');
			redirectToLogin2.set(false);
		}
	});

	$: {
		if (pageNotifications) {
			hasNotifications.set(pageNotifications?.length > 0);
			notifications.set(pageNotifications);
		}
	}
</script>

<Modal transitions={false} />
<Toast position="t" zIndex="z-[1000]" />
<!-- Basic Layout of the App -->
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- If the App is rendered on a mobile device, the navigation Bar is displayed on the bottom, otherwise on the left sidebar  -->
	<svelte:fragment slot="footer">
		<div class="md:hidden">
			<NavigationBarMobile />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div class="hidden md:flex h-full">
			<NavigationBarDesktop />
		</div>
	</svelte:fragment>
	<slot />
</AppShell>
