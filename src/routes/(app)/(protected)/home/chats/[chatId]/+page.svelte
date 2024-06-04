<script lang="ts">
	import { page } from '$app/stores';
	import { SendMessageComponent, ContactList, ErrorAlert, Chat } from '$components';
	import type {
		ChatMessage,
		ChatMessageResponse,
		ChatMessages,
		ChatsResponse,
		ErrorObject,
		ErrorResponse
	} from '$domains';
	import { connectToWebSocket, subscribeMessage, subscribeUnsendMessage } from '$stores';
	import { getErrorMessage } from '$utils';
	import { onMount } from 'svelte';

	interface ServerData {
		chatsData: ChatsResponse | ErrorResponse;
		chatMessageData: ErrorResponse | ChatMessageResponse;
		username: string;
		token: string;
	}

	export let data: ServerData;
	let chatId: string = $page.params.chatId;
	let errorChatMessage: string = '';
	$: chatMessagesError = data.chatMessageData.error
		? (data.chatMessageData.data as ErrorObject)
		: null;
	$: chatMessages = data.chatMessageData.error
		? []
		: ((data.chatMessageData.data as ChatMessages).records as Array<ChatMessage>);

	let unsendChatMessages: Array<ChatMessage> = [];

	onMount(() => {
		connectToWebSocket(chatId, data.token);
		errorChatMessage = chatMessagesError ? getErrorMessage(chatMessagesError.error.code, true) : '';
		subscribeUnsendMessage((currentMessage) => {
			if (currentMessage.content && currentMessage.username && currentMessage.creationDate) {
				unsendChatMessages = unsendChatMessages.length
					? [...unsendChatMessages, currentMessage as unknown as ChatMessage]
					: [currentMessage as unknown as ChatMessage];
			}
		});
		subscribeMessage((currentMessage) => {
			if (currentMessage.content && currentMessage.username && currentMessage.creationDate) {
				unsendChatMessages = unsendChatMessages.filter(
					(message) => message.content !== currentMessage.content
				);
				chatMessages = chatMessages.length
					? [...chatMessages, currentMessage as unknown as ChatMessage]
					: [currentMessage as unknown as ChatMessage];
			}
		});
	});
</script>

<div class="chat w-full h-full {chatId ? 'lg:grid lg:grid-cols-[30%_1fr]' : ''}">
	<ContactList {chatId} data={data.chatsData} />
	{#if chatId}
		<!-- Chat -->
		<div class="grid" style="grid-template-rows: 6fr 1fr;">
			{#if chatMessagesError}
				<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
					<ErrorAlert message={errorChatMessage} />
				</main>
			{:else}
				<Chat {chatMessages} username={data.username} {unsendChatMessages} />
				<SendMessageComponent username={data.username} />
			{/if}
		</div>
	{/if}
</div>
