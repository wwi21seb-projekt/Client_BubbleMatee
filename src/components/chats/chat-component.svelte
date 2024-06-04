<script lang="ts">
	import { page } from '$app/stores';
	import { Chat, ContactList, ErrorAlert, SendMessageComponent } from '$components';
	import type { ChatData, ChatMessage, ErrorObject } from '$domains';

	export let chatId: string;
	export let chatData: ChatData;
	export let chatMessages: Array<ChatMessage>;
	export let unsendChatMessages: Array<ChatMessage>;
	export let chatMessagesError: ErrorObject | null;
	export let errorChatMessage: string;

	let chatPartnerUsername: string = $page.params.username?.toString() || '';
</script>

<div class="chat w-full h-full {chatId ? 'lg:grid lg:grid-cols-[30%_1fr]' : ''}">
	<ContactList {chatId} data={chatData.chatsData} />
	{#if chatId}
		<!-- Chat -->
		<div class="grid" style="grid-template-rows: 6fr 1fr;">
			{#if chatMessagesError}
				<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
					<ErrorAlert message={errorChatMessage} />
				</main>
			{:else}
				<Chat {chatMessages} username={chatData.username} {unsendChatMessages} />
				<SendMessageComponent username={chatData.username} {chatPartnerUsername} />
			{/if}
		</div>
	{/if}
</div>
