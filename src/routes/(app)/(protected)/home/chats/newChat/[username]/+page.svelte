<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ChatComponent } from '$components';
	import type { ChatData, ChatMessage, ChatMessages, Chats, ErrorObject } from '$domains';
	import { getErrorMessage } from '$utils';
	import { onMount } from 'svelte';

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

	if (!data.chatsData.error) {
		(data.chatsData.data as Chats).records.map((chat) => {
			if (chat.user.username === newUser) {
				goto(`/home/chats/${chat.chatId}`);
			}
		});
	}

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

	onMount(() => {
		errorChatMessage = chatMessagesError ? getErrorMessage(chatMessagesError.error.code, true) : '';
	});
</script>

<ChatComponent chatData={data} {chatId} {chatMessages} {chatMessagesError} {errorChatMessage} />
