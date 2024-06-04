<script lang="ts">
	import { page } from '$app/stores';
	import { ChatComponent } from '$components';
	import type { ChatData, ChatMessage, ChatMessages, ErrorObject } from '$domains';
	import {
		connectToWebSocket,
		disconnectFromWebSocket,
		subscribeMessage,
		subscribeUnsendMessage
	} from '$stores';
	import { getErrorMessage } from '$utils';
	import { onDestroy, onMount } from 'svelte';

	export let data: ChatData;
	let chatId: string = $page.params.chatId;
	let errorChatMessage: string = '';
	$: chatMessagesError = data.chatMessageData.error
		? (data.chatMessageData.data as ErrorObject)
		: null;
	$: chatMessages = data.chatMessageData.error
		? []
		: ((data.chatMessageData.data as ChatMessages).records as Array<ChatMessage>);

	let unsendChatMessages: Array<ChatMessage> = [];
	let unsubscribeUnsendMessages: () => void = subscribeUnsendMessage((currentMessage) => {
		if (currentMessage.content && currentMessage.username && currentMessage.creationDate) {
			unsendChatMessages = unsendChatMessages.length
				? [...unsendChatMessages, currentMessage as unknown as ChatMessage]
				: [currentMessage as unknown as ChatMessage];
		}
	});
	let unsubscribeMessages: () => void = subscribeMessage((currentMessage) => {
		if (currentMessage.content && currentMessage.username && currentMessage.creationDate) {
			unsendChatMessages = unsendChatMessages.filter(
				(message) => message.content !== currentMessage.content
			);
			chatMessages = chatMessages.length
				? [...chatMessages, currentMessage as unknown as ChatMessage]
				: [currentMessage as unknown as ChatMessage];
		}
	});

	onMount(() => {
		connectToWebSocket(chatId, data.token);
		errorChatMessage = chatMessagesError ? getErrorMessage(chatMessagesError.error.code, true) : '';
	});

	onDestroy(() => {
		unsubscribeUnsendMessages();
		unsubscribeMessages();
		disconnectFromWebSocket();
	});
</script>

<ChatComponent
	chatData={data}
	{chatId}
	{chatMessages}
	{unsendChatMessages}
	{chatMessagesError}
	{errorChatMessage}
/>
