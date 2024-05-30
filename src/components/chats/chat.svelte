<script lang="ts">
	import { ErrorAlert } from '$components';
	import type { ChatMessageResponse, ChatMessages, ErrorObject, ErrorResponse } from '$domains';
	import { Person } from '$images';
	import { getErrorMessage } from '$utils';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let chatMessageData: ChatMessageResponse | ErrorResponse;

	$: chatMessages = chatMessageData.error ? null : (chatMessageData.data as ChatMessages);
	$: error = chatMessageData.error ? (chatMessageData.data as ErrorObject) : null;

	let errorMessage: string = '';
	onMount(() => {
		errorMessage = error ? getErrorMessage(error.error.code, true) : '';
	});
</script>

{#if error}
	<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
		<ErrorAlert message={errorMessage} />
	</main>
{:else}
	<section class="p-4 overflow-y-auto space-y-4">
		{#if chatMessages}
			{#each chatMessages.records as chat}
				{#if chat.username === 'yourOwnUser'}
					<!-- Needs to be changed after proper API integration -->
					<div class="grid grid-cols-[1fr_auto] gap-2">
						<div class="card p-4 rounded-tr-none space-y-2 bg-primary-700 dark:bg-primary-700">
							<header class="flex justify-between items-center">
								<p class="font-bold">{chat.username}</p>
								<small class="opacity-50">{chat.creationDate}</small>
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
								<small class="opacity-50">{chat.creationDate}</small>
							</header>
							<p>{chat.content}</p>
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</section>
{/if}
