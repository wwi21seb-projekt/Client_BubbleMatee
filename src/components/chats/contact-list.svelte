<script lang="ts">
	import { goto } from '$app/navigation';
	import { ErrorAlert } from '$components';
	import type { Chats, ChatsResponse, ErrorObject, ErrorResponse } from '$domains';
	import { Person } from '$images';
	import { getErrorMessage } from '$utils';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onMount } from 'svelte';

	export let data: ChatsResponse | ErrorResponse;
	export let chatId: string = '';
	export let chatPartner: string = '';

	$: chats = data.error ? null : (data.data as Chats);
	$: error = data.error ? (data.data as ErrorObject) : null;

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
	<div class="{chatId ? 'hidden': ''} lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
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
								chatPartner = person.user.username
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
