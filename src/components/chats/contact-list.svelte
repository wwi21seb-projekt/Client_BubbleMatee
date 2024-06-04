<script lang="ts">
	import { goto } from '$app/navigation';
	import { ErrorAlert, NewChatsList } from '$components';
	import type { Chats, ChatsResponse, ErrorObject, ErrorResponse } from '$domains';
	import { Person } from '$images';
	import { getErrorMessage } from '$utils';
	import { Avatar, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onMount } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	export let data: ChatsResponse | ErrorResponse;
	export let chatId: string = '';
	export let chatPartner: string = '';

	$: chats = data.error ? null : (data.data as Chats);
	$: error = data.error ? (data.data as ErrorObject) : null;

	let errorMessage: string = '';
	onMount(() => {
		errorMessage = error ? getErrorMessage(error.error.code, true) : '';
	});

	const onNewChat = () => {
		const modalComponent: ModalComponent = {
			ref: NewChatsList
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			backdropClasses:
				'bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 lg:dark:from-transparent lg:darkto-transparent lg:from-transparent lg:to-transparent'
		};
		modalStore.trigger(modal);
	};
</script>

{#if error}
	<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
		<ErrorAlert message={errorMessage} />
	</main>
{:else}
	<div
		class="{chatId
			? 'hidden'
			: ''} lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30"
	>
		<!-- List -->
		<div class="p-4 space-y-4 overflow-y-auto">
			<div class="flex justify-between items-center">
				<small class="opacity-50">Kontakte</small>
				<button type="button" class="btn variant-filled-primary" on:click={onNewChat}>
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
								chatPartner = person.user.username;
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
