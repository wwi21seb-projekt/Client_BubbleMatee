<script lang="ts">
	import type { ChatMessage, SortedMessages } from '$domains';
	import { afterUpdate } from 'svelte';
	import { Person } from '$images';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let username: string;
	export let chatMessages: Array<SortedMessages>;
	export let unsendChatMessages: Array<ChatMessage>;

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

<div class="p-4 overflow-auto h-96 lg:h-3/4 space-y-4" bind:this={scrollDiv}>
	{#if chatMessages}
		{#each chatMessages as chatDay}
			<span class="chip-disabled variant-ghost flex justify-center items-center text-sm"
				>{chatDay.date}</span
			>
			{#each chatDay.messages as chat}
				{#if chat.username === username}
					<!-- Needs to be changed after proper API integration -->
					<div class="grid grid-cols-[1fr_auto] gap-2">
						<div class="card p-4 rounded-tr-none space-y-2 bg-primary-700 dark:bg-primary-700">
							<header class="flex justify-between items-center">
								<p class="font-bold">{chat.username}</p>
								<small class="opacity-50"
									>{new Date(chat.creationDate).toLocaleTimeString('de-DE', {
										hour: '2-digit',
										minute: '2-digit'
									})}</small
								>
							</header>
							<p>{chat.content}</p>
						</div>
						<Avatar src={Person} height="auto" />
					</div>
				{:else}
					<div class="grid grid-cols-[auto_1fr] gap-2">
						<Avatar src={Person} height="auto" />
						<div class="card p-4 variant-soft rounded-tl-none space-y-2">
							<header class="flex justify-between items-center">
								<p class="font-bold">{chat.username}</p>
								<small class="opacity-50"
									>{new Date(chat.creationDate).toLocaleTimeString('de-DE', {
										hour: '2-digit',
										minute: '2-digit'
									})}</small
								>
							</header>
							<p>{chat.content}</p>
						</div>
					</div>
				{/if}
			{/each}
		{/each}
	{/if}
	{#if unsendChatMessages}
		{#each unsendChatMessages as chat}
			<div class="grid grid-cols-[1fr_auto] gap-2">
				<div class="card p-4 rounded-tr-none space-y-2 bg-primary-700 dark:bg-primary-700 relative">
					<header class="flex justify-between items-center">
						<p class="font-bold">{chat.username}</p>
						<small class="opacity-50"
							>{new Date(chat.creationDate).toLocaleTimeString('de-DE', {
								hour: '2-digit',
								minute: '2-digit'
							})}</small
						>
					</header>
					<p>{chat.content}</p>
					<div class="loader-container">
						<div class="loader"></div>
					</div>
				</div>
				<Avatar src={Person} height="auto" />
			</div>
		{/each}
	{/if}
</div>

<style>
	.loader-container {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 10px;
	}

	.loader {
		border: 3px solid #f3f3f3; /* Adjust border thickness */
		border-radius: 50%;
		border-top: 3px solid #3498db; /* Adjust border thickness */
		width: 20px; /* Adjust width */
		height: 20px; /* Adjust height */
		-webkit-animation: spin 2s linear infinite; /* Safari */
		animation: spin 2s linear infinite;
	}

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
