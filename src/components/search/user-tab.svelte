<script lang="ts">
	import type { Author } from '$domains';
	import { UserComponent } from '$components';
	import { goto } from '$app/navigation';

	export let users: Array<Author>;
	export let isError: boolean;

	function onUserClick(user: Author) {
		goto(`/search/user/${user.username}`);
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
{:else}
	<p>Es ist ein Fehler aufgetreten</p>
{/if}
