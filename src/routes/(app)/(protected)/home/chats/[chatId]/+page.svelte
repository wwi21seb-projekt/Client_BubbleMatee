<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ChatComponent } from '$components';
	import type { ChatData, ChatMessage, ChatMessages, ErrorObject } from '$domains';
	import {
		connectToWebSocket,
		disconnectFromWebSocket,
		resetMessage,
		resetMessageError,
		subscribeMessage,
		subscribeMessageError
	} from '$stores';
	import { getErrorMessage } from '$utils';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';

	export let data: ChatData;
	const toastStore = getToastStore();
	$: chatId = $page.params.chatId;
	let errorChatMessage: string = '';
	$: chatMessagesError = data.chatMessageData.error
		? (data.chatMessageData.data as ErrorObject)
		: null;
	$: chatMessages = data.chatMessageData.error
		? []
		: ((data.chatMessageData.data as ChatMessages).records as Array<ChatMessage>);

	let unsubscribeMessages: (() => void) | null = null;
	let unsubscribeErrorMessages: (() => void) | null = null;

	const leaveChat = () => {
		if (unsubscribeMessages && unsubscribeErrorMessages) {
			unsubscribeMessages();
			unsubscribeErrorMessages();
			resetMessageError();
			resetMessage();
		}
		disconnectFromWebSocket();
	};

	const enterChat = () => {
		connectToWebSocket(chatId, data.token);
		errorChatMessage = chatMessagesError ? getErrorMessage(chatMessagesError.error.code, true) : '';
		if (chatMessages) {
			unsubscribeMessages = subscribeMessage((currentMessage) => {
				if (currentMessage.content && currentMessage.username && currentMessage.creationDate) {
					chatMessages = chatMessages.length
						? [...chatMessages, currentMessage as unknown as ChatMessage]
						: [currentMessage as unknown as ChatMessage];
				}
			});
		}
		unsubscribeErrorMessages = subscribeMessageError((error) => {
			if (error.code !== 'noerror') {
				if (error.code === 'ERR-027') goto('/home/chats');
				const t: ToastSettings = {
					message: getErrorMessage(error.code, false),
					background: 'variant-filled-error'
				};
				toastStore.trigger(t);
			}
		});
	};

	$: {
		if (chatId) {
			leaveChat();
			enterChat();
		}
	}

	onDestroy(() => {
		leaveChat();
	});
</script>

<ChatComponent chatData={data} {chatId} {chatMessages} {chatMessagesError} {errorChatMessage} />
