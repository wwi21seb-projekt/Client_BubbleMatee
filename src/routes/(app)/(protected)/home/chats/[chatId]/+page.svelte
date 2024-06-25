<script lang="ts">
	import { page } from '$app/stores';
	import { ChatComponent } from '$components';
	import type { ChatData, ChatMessage, ChatMessages, ErrorObject } from '$domains';
	import {
		connectToWebSocket,
		disconnectFromWebSocket,
		subscribeMessage,
		subscribeMessageError
	} from '$stores';
	import { getErrorMessage } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onDestroy, onMount } from 'svelte';

	export let data: ChatData;
	const toastStore = getToastStore();
	let chatId: string = $page.params.chatId;
	let errorChatMessage: string = '';
	$: chatMessagesError = data.chatMessageData.error
		? (data.chatMessageData.data as ErrorObject)
		: null;
	$: chatMessages = data.chatMessageData.error
		? []
		: ((data.chatMessageData.data as ChatMessages).records as Array<ChatMessage>);

	let unsubscribeMessages: (() => void) | null = null;
	let unsubscribeErrorMessages: (() => void) | null = null;

	unsubscribeMessages = subscribeMessage((currentMessage) => {
		if (currentMessage.content && currentMessage.username && currentMessage.creationDate) {
			chatMessages = chatMessages.length
				? [...chatMessages, currentMessage as unknown as ChatMessage]
				: [currentMessage as unknown as ChatMessage];
		}
	});

	unsubscribeErrorMessages = subscribeMessageError((error) => {
		if (error.code !== 'noerror') {
			const t: ToastSettings = {
				message: getErrorMessage(error.code, false),
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	});

	onMount(() => {
		connectToWebSocket(chatId, data.token); //, getToastStore()
		errorChatMessage = chatMessagesError ? getErrorMessage(chatMessagesError.error.code, true) : '';
	});

	onDestroy(() => {
		if (unsubscribeMessages) {
			unsubscribeMessages();
			unsubscribeErrorMessages();
		}
		disconnectFromWebSocket();
	});
</script>

<ChatComponent chatData={data} {chatId} {chatMessages} {chatMessagesError} {errorChatMessage} />
