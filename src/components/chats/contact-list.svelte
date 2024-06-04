<script lang="ts">
	import { goto } from '$app/navigation';
	import { ErrorAlert } from '$components';
	import type { ChatResponse, Chats, ChatsResponse, ErrorObject, ErrorResponse } from '$domains';
	import { Person } from '$images';
	import { getErrorMessage } from '$utils';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onMount } from 'svelte';

	export let data: ChatsResponse | ErrorResponse;
	export let chatId: string = '';

	$: chats = data.error ? null : (data.data as Chats);
	$: error = data.error ? (data.data as ErrorObject) : null;

	let errorMessage: string = '';
	onMount(() => {
		errorMessage = error ? getErrorMessage(error.error.code, true) : '';
	});

	async function createNewChat(
		username: string,
		content: string
	): Promise<ErrorResponse | ChatResponse> {
		try {
			const response = await fetch(`/api/chats`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: username,
					content: content
				})
			});
			const body: ErrorResponse | ChatResponse = await response.json();
			return body;
		} catch (e) {
			const errorResponse: ErrorResponse = {
				error: true,
				data: {
					error: {
						code: 'internal_server_error',
						message: 'Failed to load comments'
					}
				}
			};
			return errorResponse;
		}
	}
</script>

{#if error}
	<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
		<ErrorAlert message={errorMessage} />
	</main>
{:else}
	<div class="lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
		<!-- List -->
		<div class="p-4 space-y-4 overflow-y-auto">
			<div class="flex justify-between items-center">
				<small class="opacity-50">Kontakte</small>
				<button type="button" class="btn variant-filled-primary" on:click={() => {}}>
					<p>Neuer Chat</p>
					<Icon src={Plus} class="h-4 font-bold hover:stroke-gray-400" />
				</button>
			</div>
			<div class="flex flex-col space-y-1">
				{#if chats}
					{#each chats.records as person}
						<button
							type="button"
							class="btn w-full flex items-center space-x-4 {person.chatId === chatId
								? 'variant-filled-primary'
								: 'bg-surface-hover-token'}"
							on:click={() => {
								goto(`/home/chats/${person.chatId}`);
								chatId = person.chatId;
							}}
						>
							<Avatar src={Person} height="auto" />
							<span class="flex-1 text-start">
								{person.user.username}
							</span>
						</button>
					{/each}
				{:else}
					<p>Keine offenen Chats</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
