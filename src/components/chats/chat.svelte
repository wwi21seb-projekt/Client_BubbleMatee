<script lang="ts">
	import { LoadMoreComponent } from '$components';
	import type { Author, SortedMessages } from '$domains';
	import { afterUpdate, onMount } from 'svelte';

	export let username: string;
	export let chatMessages: Array<SortedMessages>;
	export let overallRecords: number;
	export let currentRecords: number;
	export let chatPartner: Author;
	export let loadMoreMessages: (offset: string) => Promise<void>;

	let scrollDiv: HTMLDivElement;
	let firstChildId: string;

	$: latestMessageDate =
		chatMessages[chatMessages.length - 1].messages[
			chatMessages[chatMessages.length - 1].messages.length - 1
		].creationDate;

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	// After rendering the new child, call this function
	async function autoScrollDown() {
		if (!scrollDiv) return;
		await sleep(10);
		const lastMessage = document.getElementById(latestMessageDate);
		if (lastMessage instanceof HTMLElement) {
			lastMessage.scrollIntoView({ behavior: 'auto', block: 'end' });
		}
	}

	function scrollTo(id: string) {
		if (document) {
			const element = document.getElementById(id);
			if (element instanceof HTMLElement) {
				element.scrollIntoView({ behavior: 'instant', block: 'start' });
			}
		}
	}
	// After rendering the new child, call this function
	function loadMore() {
		firstChildId = chatMessages[0].messages[0].creationDate;
		loadMoreMessages(currentRecords.toString());
	}

	$: if (chatPartner) {
		autoScrollDown();
	}

	$: {
		if (latestMessageDate) {
			autoScrollDown();
		}
	}

	$: afterUpdate(() => {
		scrollTo(firstChildId);
	});
</script>

<div class="p-4 space-y-4" bind:this={scrollDiv}>
	{#if overallRecords > currentRecords}
		<LoadMoreComponent {loadMore} isDown={false} />
	{/if}
	{#if chatMessages}
		{#each chatMessages as chatDay (chatDay.date)}
			<div class="flex flex justify-center items-center">
				<span class="chip-disabled variant-ghost text-sm w-auto rounded px-2">{chatDay.date}</span>
			</div>
			{#each chatDay.messages as chat (chat.creationDate)}
				{#if chat.username === username}
					<div class="flex justify-end gap-2" id={chat.creationDate}>
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
					<div class="flex gap-2" id={chat.creationDate}>
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
