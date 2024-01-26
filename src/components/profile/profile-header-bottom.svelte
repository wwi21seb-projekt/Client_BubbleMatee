<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { UserInfo } from '$domains';
	import { currentUsername } from '$stores';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let user: UserInfo;

	const toastStore = getToastStore();

	let loading: boolean = false;
	let isOwnUser: boolean =
		$page.params.username === $currentUsername || $page.url.pathname === '/myProfile';

	$: isSubscriber = Boolean(user.subscriptionId && user.subscriptionId.trim().length);
	$: setFollowButtonClass = () => {
		let result: string = 'btn w-full mt-2 md:max-w-xs mx-4';
		isSubscriber ? (result += ' variant-ghost-primary') : (result += ' variant-filled-primary');
		return result;
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

	const subscribe = async () => {
		loading = true;
		try {
			const response = await fetch('/api/subscriptions', {
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
			const response = await fetch(`/api/subscriptions/${user.subscriptionId}`, {
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
</script>

<!--Show the Follow-Button next to the username, if the user has no status-->
<div class="flex flex-col md:flex-row justify-center md:justify-between items-center px-4">
	<div class="flex flex-row items-center w-full">
		<h3 class="pr-2 font-bold text-xl md:text-2xl">{user.username}</h3>
		{#if user.nickname}
			<span class="inline-block h-auto w-px self-stretch bg-surface-600" />
			<small class="pl-2 text-lg md:text-xl">{user.nickname}</small>
		{/if}
	</div>
	<!--Show the Follow-Button next to the username, if the user has no status-->
	{#if !isOwnUser && !user.status}
		<button class={setFollowButtonClass()} on:click={handleButtonClick}
			>{setFollowButtonText()}</button
		>
	{/if}
</div>

<div class="w-full px-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
	<small class="text-base md:text-lg break-words w-full">
		{user.status}
	</small>
	<!--Show the Follow-Button next to the status, if the user has a status-->
	{#if !isOwnUser && user.status}
		<button class={setFollowButtonClass()} on:click={handleButtonClick}
			>{setFollowButtonText()}</button
		>
	{/if}
</div>