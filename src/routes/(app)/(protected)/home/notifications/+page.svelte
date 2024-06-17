<script lang="ts">
	import { goto } from '$app/navigation';
	import { Check, ChevronLeft } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Avatar, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getErrorMessage, getNotificationOptions, getNotificationTitle } from '$utils';
	import { hasNotifications, notifications } from '$stores';
	import { Person } from '$images';
	import type { Notification } from '$domains';
	import { NothingFoundComponent } from '$components';
	import { onMount } from 'svelte';

	const toastStore = getToastStore();

	function handleClick() {
		goto('/home');
	}

	function handleNotificationClick(notification: Notification) {
		goto(`/search/user/${notification.user.username}`);
		deleteNotificationRequest(notification.notificationId);
	}

	async function deleteNotificationRequest(notificationId: string | undefined) {
		try {
			const response = await fetch(`/api/notifications/${notificationId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const body = await response.json();
			if (body.error) {
				if (body.data.error) {
					const t: ToastSettings = {
						message: getErrorMessage(body.data.error.code, false),
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
				//show confirmation if succesfull
			} else {
				const notificationsNew: Array<Notification> = $notifications.filter(
					(notification) => notification.notificationId !== notificationId
				);
				notifications.set(notificationsNew);
				if (notificationsNew.length === 0) {
					hasNotifications.set(false);
				}
			}
			return body;
		} catch (e) {
			console.error(e);
		}
	}

	async function deleteNotification(
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
	) {
		const notificationId: string | undefined = event.currentTarget.parentElement?.id;
		deleteNotificationRequest(notificationId);
	}

	let main: HTMLElement;
	onMount(() => {
		main.scrollIntoView();
	});
</script>

<main bind:this={main}>
	<span class="relative">
		<button on:click={handleClick} class="ml-2 absolute left-0 inset-y-0">
			<Icon
				src={ChevronLeft}
				class="h1 h-8 md:h-10 font-bold stroke-primary-900 dark:stroke-primary-500 z-100"
			/>
		</button>
		<h1
			class="h1 bg-gradient-to-br from-primary-900 to-primary-600 dark:from-primary-500 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone z-0"
		>
			MELDUNGEN
		</h1>
	</span>
	<!-- Separator Line -->
	<hr class="!border-t-8 !border-double" />

	<div class="flex w-full justify-center items-center">
		<div class="w-full sm:w-3/4 md:w-full lg:w-3/4 align-self">
			<div class="w-full">
				{#each $notifications as notification (notification.notificationId)}
					<div
						class="flex justify-between items-center p-2 border-b border-gray-300 dark:border-gray-700"
						id={notification.notificationId}
					>
						<button
							class="flex items-center"
							on:click={() => handleNotificationClick(notification)}
						>
							<Avatar
								border="hover:border-2 hover:!border-surface-600"
								cursor="cursor-pointer"
								src={notification.user.picture && notification.user.picture.url
									? notification.user.picture.url
									: Person}
							/>
						</div>
							<div class="ml-2">
								<p class="text-lg font-semibold dark:text-gray-300">
									{getNotificationTitle(notification.notificationType)}
								</p>
								<p class="text-sm dark:text-gray-400">
									{getNotificationOptions(notification).body}
								</p>
							</div>
						</button>
						<!-- // button to mark notification as read -->
						<button class="ml-2" on:click={deleteNotification}>
							<Icon src={Check} class="h-6 w-6 text-primary-900 dark:text-primary-500 mr-2" />
						</button>
					</div>
				{/each}
				{#if $notifications.length === 0}
					<div class="flex justify-center items-center h-96">
						<NothingFoundComponent
							message="Keine Meldungen"
							submessage="Es sind keine neuen Meldungen vorhanden"
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
	.h1 {
		text-align: center;
		margin: var(--default-margin) auto;
		transition: transform 0.3s ease-in-out;
	}

	.h1:hover {
		transform: scale(1.1);
	}
</style>
