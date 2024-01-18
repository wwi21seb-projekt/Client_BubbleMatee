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

<div class="flex w-full justify-center items-center">
	<div class="w-full px-4 pt-2 sm:w-3/4 md:w-full lg:w-3/4 align-self">
		<div class="w-full !border rounded-lg border-surface-600">
			<div class="grid grid-cols-4 gap-0 font-semibold p-4">
				<div class="flex flex-col self-center justify-center w-full">
					<Avatar src="/src/images/icons/person.png" />
				</div>
				<div class="flex flex-col self-center !border-r !border-l border-surface-600">
					<div class="place-self-center">{user.posts}</div>
					<div class="place-self-center text-[11px] sm:text-base">Posts</div>
				</div>
				<div class="flex flex-col self-center !border-r border-surface-600">
					<div class="place-self-center">{user.follower}</div>
					<div class="place-self-center text-[11px] sm:text-base">Abonnenten</div>
				</div>
				<div class="flex flex-col self-center">
					<div class="place-self-center">{user.following}</div>
					<div class="place-self-center text-[11px] sm:text-base">Abonnierte</div>
				</div>
			</div>
			<hr class="border-t-2 m-2" />
			<div class="flex flex-row items-center">
				<h3 class="pl-4 pr-2 font-bold text-xl md:text-2xl">{name}</h3>
				<span class="inline-block h-auto w-px self-stretch bg-surface-600" />
				<small class="pl-2 text-lg md:text-xl">{user.nickname}</small>
			</div>

			<div class="w-full px-4 pb-2 flex flex-col md:flex-row justify-center md:justify-between">
				<small class="text- md:text-lg">{user.status}</small>
				{#if !isOwnUser}
					<button class={setFollowButtonClass()} on:click={handleButtonClick}
						>{setFollowButtonText()}</button
					>
				{/if}
			</div>
		</div>
		<!-- Separator Line -->
		<hr class="!border-t-2 !border-double mt-4" />
	</div>
</div>
