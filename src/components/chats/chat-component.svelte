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
	export let unsendChatMessages: Array<ChatMessage>;
	export let chatMessagesError: ErrorObject | null;
	export let errorChatMessage: string;

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
			const messageDate = new Date(message.creationDate).toLocaleDateString('de-DE');
			const cluster = sortedAndClusteredMessages.find((cluster) => cluster.date === messageDate);

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
		if (chatId) {
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
						chatMessages={sortedAndClusteredMessages}
						username={chatData.username}
						{unsendChatMessages}
					/>
				</main>
				<footer class="flex-shrink-0 m-0 bottom-0 z-40 bg-surface-50 dark:bg-surface-900">
					<SendMessageComponent
						username={chatData.username}
						chatPartnerUsername={chatPartnerUsernameFromUrl}
					/>
				</footer>
			{/if}
		</div>
	{/if}
</div>
