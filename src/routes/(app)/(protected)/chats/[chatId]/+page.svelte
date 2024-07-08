<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ChatComponent } from '$components';
	import type {
		ChatData,
		ChatMessage,
		ChatMessageResponse,
		ChatMessages,
		ErrorObject,
		ErrorResponse
	} from '$domains';
	import {
		connectToWebSocket,
		disconnectFromWebSocket,
		resetMessage,
		resetMessageError,
		subscribeMessage,
		subscribeMessageError
	} from '$stores';
	import { getErrorMessage, globalConfig, loadNextChatMessages } from '$utils';
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

	$: overallRecords = data.chatMessageData.error
		? 0
		: (data.chatMessageData as ChatMessageResponse).data.pagination.records;

	async function loadMoreMessages(offset: string): Promise<void> {
		let result: ChatMessageResponse | ErrorResponse = await loadNextChatMessages(
			chatId,
			offset,
			(parseInt(offset) + parseInt(globalConfig.limit)).toString()
		);
		if (result.error) {
			const t: ToastSettings = {
				message: getErrorMessage((result.data as ErrorObject).error.code, false),
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		} else {
			chatMessages = [
				...chatMessages,
				...((result.data as ChatMessages).records as Array<ChatMessage>)
			];
		}
	}
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
				if (error.code === 'ERR-027') goto('/chats');
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

<ChatComponent
	{loadMoreMessages}
	chatData={data}
	{chatId}
	{chatMessages}
	{chatMessagesError}
	{errorChatMessage}
	{overallRecords}
/>
