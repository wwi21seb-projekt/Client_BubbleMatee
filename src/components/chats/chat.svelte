<script lang="ts">
	import type { SortedMessages } from '$domains';
	import { afterUpdate } from 'svelte';

	export let username: string;
	export let chatMessages: Array<SortedMessages>;

	let scrollDiv: HTMLDivElement;

	// After rendering the new child, call this function
	function autoScrollToChild() {
		const lastChild = scrollDiv.lastElementChild;
		if (lastChild) {
			lastChild.scrollIntoView({ behavior: 'auto', block: 'end' });
		}
	}

	$: {
		afterUpdate(autoScrollToChild);
	}
</script>

<div class="p-4 space-y-4" bind:this={scrollDiv}>
	{#if chatMessages}
		{#each chatMessages as chatDay}
			<div class="flex flex justify-center items-center">
				<span class="chip-disabled variant-ghost text-sm w-auto rounded px-2">{chatDay.date}</span>
			</div>
			{#each chatDay.messages as chat}
				{#if chat.username === username}
					<div class="flex justify-end gap-2">
						<div
							class="card p-4 rounded-tr-none space-y-2 bg-primary-700 dark:bg-primary-700 w-64 lg:w-96"
						>
							<header class="flex justify-between items-center">
								<p class="text-lg md:text-xl font-bold">{chat.username}</p>
								<small class="opacity-50 text-sm md:text-base"
									>{new Date(chat.creationDate).toLocaleTimeString('de-DE', {
										hour: '2-digit',
										minute: '2-digit'
									})}</small
								>
							</header>
							<p class="break-words">{chat.content}</p>
						</div>
					</div>
				{:else}
					<div class="flex gap-2">
						<div class="card p-4 variant-soft rounded-tl-none space-y-2 w-64 lg:w-96">
							<header class="flex justify-between items-center">
								<p class="font-bold">{chat.username}</p>
								<small class="opacity-50"
									>{new Date(chat.creationDate).toLocaleTimeString('de-DE', {
										hour: '2-digit',
										minute: '2-digit'
									})}</small
								>
							</header>
							<p class="break-words">{chat.content}</p>
						</div>
					</div>
				{/if}
			{/each}
		{/each}
	{/if}
</div>

<style>
	/* Safari */
	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
