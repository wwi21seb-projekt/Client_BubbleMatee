<script lang="ts">
	import type { UserInfo } from '$domains';
	import {
		Avatar,
		getModalStore,
		getToastStore,
		type ModalComponent,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { currentUsername } from '$stores';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { Comments } from '$components';
	import FollowerList from './follower-list.svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	export let user: UserInfo;

	let name: string = user.nickname === '' ? user.username : user.nickname;
	let isOwnUser: boolean =
		$page.params.username === $currentUsername || $page.url.pathname === '/myProfile';
	$: isSubscriber = Boolean(user.subscriptionId && user.subscriptionId.trim().length);
	let loading: boolean = false;

	$: setFollowButtonClass = () => {
		let result: string = 'btn w-full mt-2 md:max-w-xs mx-4';
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

	function handlePictureClick(): void {
		user.profilePictureUrl;
		const modalComponent: ModalComponent = {
			ref: Avatar,

			props: {
				src: user.profilePictureUrl ? user.profilePictureUrl : '/src/images/icons/person.png',
				width: 'w-1/2 sm:w-1/3 md:w-1/6'
			}
		};

		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			backdropClasses: 'bg-transparent'
		};
		modalStore.trigger(modal);
	}

	const comments = [
		'barsjdgasdjgkjasbarsjdgasdjgkjasbarsjdgasdjgkjasdlkfjaslkdjfkldsajflkasdjflkjasdkfjsalkdjflksadjfksjdlkfjsalkdjflksadjflkajdflkjsadlkfjs adlkjflkdsaj barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj',
		'barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj',
		'barsjdgasdjgkjasbarsjdgasdjgkjasbarsjdgasdjgkjasdlkfjaslkdjfkldsajflkasdjflkjasdkfjsalkdjflksadjfksjdlkfjsalkdjflksadjflkajdflkjsadlkfjs adlkjflkdsaj barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj',
		'barsjdgasdjgkjasbarsjdgasdjgkjasbarsjdgasdjgkjasdlkfjaslkdjfkldsajflkasdjflkjasdkfjsalkdjflksadjfksjdlkfjsalkdjflksadjflkajdflkjsadlkfjs adlkjflkdsaj barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj'
	];

	function openFollowerlist(isFollowerlist: boolean): void {
		const modalComponent: ModalComponent = {
			ref: FollowerList,
			props: { isFollowerlist: isFollowerlist }
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			backdropClasses:
				'bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 lg:dark:from-transparent lg:darkto-transparent lg:from-transparent lg:to-transparent'
		};
		modalStore.trigger(modal);
	}
</script>

<div class="flex w-full justify-center items-center">
	<div class="w-full px-4 pt-2 sm:w-3/4 md:w-full lg:w-3/4 align-self">
		<div class="w-full">
			<div class="grid grid-cols-4 gap-0 font-semibold p-4">
				<div class="flex flex-col self-center justify-center w-full">
					<Avatar
						border="hover:border-2 hover:!border-surface-600"
						cursor="cursor-pointer"
						src={user.profilePictureUrl ? user.profilePictureUrl : '/src/images/icons/person.png'}
						on:click={handlePictureClick}
					/>
				</div>
				<div class="flex flex-col self-center">
					<div class="place-self-center">{user.posts}</div>
					<div class="place-self-center text-[11px] sm:text-base">Posts</div>
				</div>
				<button on:click={() => openFollowerlist(true)}>
					<div class="flex flex-col self-center">
						<div class="place-self-center">{user.follower}</div>
						<div class="place-self-center text-[11px] sm:text-base">Abonnenten</div>
					</div>
				</button>
				<button on:click={() => openFollowerlist(false)}>
					<div class="flex flex-col self-center">
						<div class="place-self-center">{user.following}</div>
						<div class="place-self-center text-[11px] sm:text-base">Abonnierte</div>
					</div>
				</button>
			</div>
			<!--Show the Follow-Button next to the username, if the user has no status-->
			<div class="flex flex-col md:flex-row justify-center md:justify-between items-center px-4">
				<div class="flex flex-row items-center w-full">
					<h3 class="pr-2 font-bold text-xl md:text-2xl">{name}</h3>
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

			<div
				class="w-full px-4 flex flex-col md:flex-row justify-center md:justify-between items-center"
			>
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
		</div>
		<!-- Separator Line -->
		<hr class="!border-t-2 !border-double mt-4 mx-4" />
	</div>
</div>
