<script lang="ts">
	import type { Author } from '$domains';
	import { LoadMoreComponent, UserComponent } from '$components';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let users: Array<Author>;
	export let isError: boolean;
	console.log(users);
	export let loadMore: () => void;
	export let hasMorePages: boolean;
	const modalStore = getModalStore();

	function onUserClick(user: Author) {
		const basepath = $page.url.pathname;
		const tabPath = basepath.split('/')[1];
		goto(`/${tabPath}/user/${user.username}`);
		modalStore.close();
	}
</script>

{#if !isError}
	{#each users as user}
		<button class="w-full m-2" on:click={() => onUserClick(user)}>
			<div
				class="card p-2 bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 rounded-xl hover:bg-gradient-to-br hover:dark:to-tertiary-500 hover:to-primary-400"
			>
				<UserComponent author={user} />
			</div>
		</button>
	{/each}
	{#if hasMorePages}
		<LoadMoreComponent {loadMore} />
	{/if}
{:else}
	<p>Es ist ein Fehler aufgetreten</p>
{/if}
