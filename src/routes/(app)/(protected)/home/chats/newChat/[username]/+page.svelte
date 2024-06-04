<script lang="ts">
	import { page } from '$app/stores';
	import { ChatComponent } from '$components';
	import type { ChatData, ChatMessage, ChatMessages, Chats, ErrorObject } from '$domains';
	import { subscribeUnsendMessage } from '$stores';
	import { getErrorMessage } from '$utils';
	import { onDestroy, onMount } from 'svelte';

	export let data: ChatData;
	export let newUser: string = $page.params.username;

	let chatId: string = 'newChat';
	let errorChatMessage: string = '';
	$: chatMessagesError = data.chatMessageData.error
		? (data.chatMessageData.data as ErrorObject)
		: null;
	$: chatMessages = data.chatMessageData.error
		? []
		: ((data.chatMessageData.data as ChatMessages).records as Array<ChatMessage>);

	$: data = {
		...data,
		chatsData: {
			...data.chatsData,
			data: {
				...data.chatsData.data,
				records: data.chatsData.error
					? []
					: [
							...(data.chatsData.data as Chats).records,
							{
								chatId: 'newChat',
								user: { username: newUser, email: '', nickname: '' }
							}
						]
			}
		}
	};

	let unsendChatMessages: Array<ChatMessage> = [];
	let unsubscribeUnsendMessages: () => void = subscribeUnsendMessage((currentMessage) => {
		if (currentMessage.content && currentMessage.username && currentMessage.creationDate) {
			unsendChatMessages = unsendChatMessages.length
				? [...unsendChatMessages, currentMessage as unknown as ChatMessage]
				: [currentMessage as unknown as ChatMessage];
		}
	});

	onMount(() => {
		errorChatMessage = chatMessagesError ? getErrorMessage(chatMessagesError.error.code, true) : '';
	});

	onDestroy(() => {
		unsubscribeUnsendMessages();
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
