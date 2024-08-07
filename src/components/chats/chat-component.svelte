<script lang="ts">
	import { page } from '$app/stores';
	import {
		Chat,
		ChatMobileHeader,
		ContactList,
		ErrorAlert,
		SendMessageComponent
	} from '$components';
	import type {
		Author,
		ChatData,
		ChatMessage,
		ChatsResponse,
		ErrorObject,
		SortedMessages
	} from '$domains';
	import { onMount } from 'svelte';

	export let chatId: string;
	export let chatData: ChatData;
	export let chatMessages: Array<ChatMessage>;
	export let chatMessagesError: ErrorObject | null;
	export let errorChatMessage: string;
	export let overallRecords: number = 0;
	export let loadMoreMessages: (offset: string) => Promise<void> = () => Promise.resolve();

	let chatPartner: Author = {
		username: '',
		picture: { url: '', width: 0, height: 0 },
		nickname: ''
	};
	let chatPartnerUsernameFromUrl: string = $page.params.username?.toString() || '';

	let sortedAndClusteredMessages: Array<SortedMessages> = [];

	$: {
		// Sort messages so the newest ones are first
		chatMessages.sort(
			(a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
		);

		// Reset sortedAndClusteredMessages
		sortedAndClusteredMessages = [];
		// Cluster messages by day
		chatMessages.forEach((message) => {
			const messageDate: string = new Date(message.creationDate).toLocaleDateString('de-DE');
			const cluster: SortedMessages | undefined = sortedAndClusteredMessages.find(
				(cluster) => cluster.date === messageDate
			);

			if (cluster) {
				cluster.messages = [...cluster.messages, message];
			} else {
				sortedAndClusteredMessages = [
					...sortedAndClusteredMessages,
					{ date: messageDate, messages: [message] }
				];
			}
		});
	}

	$: onMount(() => {
		if (chatId && !chatData.chatsData.error) {
			(chatData.chatsData as ChatsResponse).data.records.map((chat) => {
				if (chat.chatId === chatId) {
					chatPartner = chat.user;
				}
			});
		}
	});
</script>

<div class="chat overflow-hidden {chatId ? 'lg:grid lg:grid-cols-[30%_1fr]' : ''}">
	<ContactList {chatId} data={chatData.chatsData} bind:chatPartner />
	{#if chatId}
		<!-- Chat -->
		<div class="flex flex-col h-[calc(100vh-118px)] md:h-[calc(100vh-88px)]">
			{#if chatMessagesError}
				<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
					<ErrorAlert message={errorChatMessage} />
				</main>
			{:else}
				<div class="flex-shrink-0 m-0 top-0 z-40 bg-surface-50 dark:bg-surface-900">
					<ChatMobileHeader {chatPartner} />
				</div>
				<main class="flex-grow overflow-y-auto overflow-x-hidden pr-1">
					<Chat
						bind:chatPartner
						{loadMoreMessages}
						chatMessages={sortedAndClusteredMessages}
						username={chatData.username}
						{overallRecords}
						currentRecords={chatMessages.length}
					/>
				</main>
				<footer class="flex-shrink-0 m-0 bottom-0 z-40 bg-surface-50 dark:bg-surface-900">
					<SendMessageComponent chatPartnerUsername={chatPartnerUsernameFromUrl} />
				</footer>
			{/if}
		</div>
	{/if}
</div>
