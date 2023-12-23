<script lang="ts">
	import type { UserInfo } from '$domains';
	import { Avatar, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { currentUsername } from '$stores';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	const toastStore = getToastStore();

	export let user: UserInfo;

	let name: string = user.nickname === '' ? user.username : user.nickname;
	let isOwnUser: boolean =
		$page.params.username === $currentUsername || $page.url.pathname === '/myProfile';
	$: isSubscriber = Boolean(user.subscriptionId && user.subscriptionId.trim().length);
	let loading: boolean = false;

	$: setFollowButtonClass = () => {
		let result: string = 'btn w-full md:max-w-xs ';
		isSubscriber ? (result += ' variant-ghost-primary') : (result += ' variant-filled-primary');
		return result;
	};

	const subscribe = async () => {
		loading = true;
		try {
			const response = await fetch('/api/subscription', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ following: user.username })
			});

			const body = await response.json();

			if (body.error) {
				if (body.data.error) {
					const t: ToastSettings = {
						message: body.data.error.message,
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			}
			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};

	const unsubscribe = async () => {
		loading = true;
		try {
			const response = await fetch(`/api/subscription/${user.subscriptionId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ following: user.username })
			});

			const body = await response.json();

			if (body.error) {
				if (body.data.error) {
					const t: ToastSettings = {
						message: body.data.error.message,
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
				}
			}
			return body;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};

	const handleButtonClick = async () => {
		if (isSubscriber) {
			await unsubscribe();
		} else {
			await subscribe();
		}
		await invalidateAll();
	};

	$: setFollowButtonText = () => {
		if (loading) {
			return 'Lädt...';
		} else if (isSubscriber) {
			return 'Entfolgen';
		} else {
			return 'Abonnieren';
		}
	};
</script>

<div class="p-4 grid grid-cols-4 gap-1 font-semibold">
	<div class="flex flex-col self-center justify-center">
		<Avatar initials={name.charAt(0)} background="bg-surface-300" width="w-22 lg:w-18 xl:w-16  " />
	</div>
	<div class="flex flex-col self-center">
		<div class="place-self-center">{user.posts}</div>
		<div class="place-self-center">Posts</div>
	</div>
	<div class="flex flex-col self-center">
		<div class="place-self-center">{user.follower}</div>
		<div class="place-self-center">Abonnenten</div>
	</div>
	<div class="flex flex-col self-center">
		<div class="place-self-center">{user.following}</div>
		<div class="place-self-center">Abonnierte</div>
	</div>
</div>
<div class="px-4 pb-1 font-semibold">{name}</div>
<div class="w-full px-4 flex flex-col md:flex-row justify-center md:justify-between">
	<div class="pb-4 md:pb-0 md:pr-4">{user.status}</div>
	{#if !isOwnUser}
		<button class={setFollowButtonClass()} on:click={handleButtonClick}
			>{setFollowButtonText()}</button
		>
	{/if}
</div>
