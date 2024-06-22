<script lang="ts">
	import type { Author, Error, FollowResponse, Follower } from '$domains';
	import { ErrorAlert, LoadMoreComponent, NothingFoundComponent, UserComponent } from '$components';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { subscribe, unsubscribe, getErrorMessage } from '$utils';
	import { currentUsername, loading } from '$stores';

	export let users: Array<Follower>;
	export let isError: boolean;
	export let error: Error;
	export let loadMore: () => void;
	export let lastPage: boolean;
	export let isFollowerlist: boolean = false;
	export let nothingFoundMessage: string;
	export let nothingFoundSubMessage: string;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	async function onUserClick(user: Author) {
		const basepath = $page.url.pathname;
		const tabPath = basepath.split('/')[1];
		if ($currentUsername === user.username) {
			await goto('/myProfile');
		} else {
			await goto(`/${tabPath}/user/${user.username}`);
		}
		modalStore.close();
	}

	$: setFollowButtonClass = (user: Follower) => {
		let result: string = 'btn m-4';
		user.followingId
			? (result += ' variant-ghost-secondary dark:variant-ghost-primary')
			: (result += ' variant-filled-secondary dark:variant-filled-primary');
		return result;
	};

	$: setFollowButtonText = (user: Follower) => {
		if (user.followingId) {
			return 'Entfolgen';
		} else {
			return 'Abonnieren';
		}
	};

	const handleButtonClick = async (user: Follower) => {
		let body;
		if (user.followingId) {
			body = await unsubscribe(user.followingId, user.username);
		} else {
			body = await subscribe(user.username);
		}
		await invalidateAll();

		if (body && body.error) {
			if (body.data.error) {
				const t: ToastSettings = {
					message: body.data.error.message,
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			}
		}
		changeUsers(user, body);
	};

	function changeUsers(user: Follower, data: FollowResponse | undefined) {
		const newUsers = users.map((record) => {
			if (record === user) {
				if (data) {
					record.followingId = data.data.subscriptionId;
				}
			}
			return record;
		});
		users = [...newUsers];
	}
</script>

{#if !isError}
	{#if users.length > 0}
		{#each users as user}
			{#if !isFollowerlist}
				<button
					on:click={() => onUserClick(user)}
					class="p-4 w-full hover:bg-gradient-to-br hover:dark:to-tertiary-500 hover:to-primary-400 card m-2 bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 rounded-xl"
				>
					<UserComponent author={user} />
				</button>
			{:else}
				<div
					class={`${
						user.username === $currentUsername ? '' : 'grid grid-cols-2 content-center'
					}    p-4 w-full hover:bg-gradient-to-br hover:dark:to-tertiary-500 hover:to-primary-400 card m-2 bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 rounded-xl`}
				>
					<button
						class={`${user.username === $currentUsername ? 'w-full' : ''}`}
						on:click={() => onUserClick(user)}
					>
						<UserComponent author={user} />
					</button>
					{#if user.username !== $currentUsername}
						<button on:click={() => handleButtonClick(user)} class={setFollowButtonClass(user)}
							>{setFollowButtonText(user)}</button
						>
					{/if}
				</div>
			{/if}
		{/each}
		{#if !lastPage}
			<LoadMoreComponent {loadMore} />
		{/if}
	{:else if !$loading}
		<div class="flex justify-center mx-4">
			<NothingFoundComponent message={nothingFoundMessage} submessage={nothingFoundSubMessage} />
		</div>
	{/if}
{:else if error}
	<ErrorAlert message={getErrorMessage(error.code, true)}></ErrorAlert>
{:else}
	<ErrorAlert message={'Es ist ein Fehler aufgetreten'}></ErrorAlert>{/if}
