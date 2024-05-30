<script lang="ts">
	import { page } from '$app/stores';
	import { SendMessageComponent, ContactList } from '$components';
	import Chat from '$components/chats/chat.svelte';
	import type { ChatMessageResponse, ChatsResponse, ErrorResponse } from '$domains';

	interface ServerData {
		chatsData: ChatsResponse | ErrorResponse;
		chatMessageData: ErrorResponse | ChatMessageResponse;
	}

	export let data: ServerData;

	let chatId: string = $page.params.chatId;
</script>

<div class="chat w-full h-full {chatId ? 'lg:grid lg:grid-cols-[30%_1fr]' : ''}">
	<ContactList {chatId} data={data.chatsData} />
	{#if chatId}
		<!-- Chat -->
		<div class="grid" style="grid-template-rows: 6fr 1fr;">
			<Chat chatMessageData={data.chatMessageData} />
			<SendMessageComponent />
		</div>
	{/if}
</div>
