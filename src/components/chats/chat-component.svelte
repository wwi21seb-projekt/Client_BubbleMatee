<script lang="ts">
	import { page } from '$app/stores';
	import { Chat, ChatMobileHeader, ContactList, ErrorAlert, SendMessageComponent } from '$components';
	import type { ChatData, ChatMessage, ChatsResponse, ErrorObject } from '$domains';
	import { onMount } from 'svelte';

	export let chatId: string;
	export let chatData: ChatData;
	export let chatMessages: Array<ChatMessage>;
	export let unsendChatMessages: Array<ChatMessage>;
	export let chatMessagesError: ErrorObject | null;
	export let errorChatMessage: string;

	let chatPartner: string = "";
	let chatPartnerUsernameFromUrl: string = $page.params.username?.toString() || '';

	$:
	onMount(() => {
		if (chatId) {
			(chatData.chatsData as ChatsResponse).data.records.map((chat) => {
				if (chat.chatId === chatId){
					chatPartner = chat.user.username;
				}
			})
		}
	});
</script>

<div class="chat w-full h-full {chatId ? 'lg:grid lg:grid-cols-[30%_1fr]' : ''}">
	<ContactList {chatId} data={chatData.chatsData} {chatPartner}/>
	{#if chatId}
		<!-- Chat -->
		<div class="grid">
			{#if chatMessagesError}
				<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
					<ErrorAlert message={errorChatMessage} />
				</main>
			{:else}
			<div class="w-full">
				<ChatMobileHeader {chatPartner} />
				<Chat {chatMessages} username={chatData.username} {unsendChatMessages} />
			</div>
				<SendMessageComponent username={chatData.username} chatPartnerUsername={chatPartnerUsernameFromUrl} />
			{/if}
		</div>
	{/if}
</div>
