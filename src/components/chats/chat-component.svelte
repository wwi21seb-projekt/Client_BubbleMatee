<script lang="ts">
	import { page } from '$app/stores';
	import {
		Chat,
		ChatMobileHeader,
		ContactList,
		ErrorAlert,
		SendMessageComponent
	} from '$components';
	import type { ChatData, ChatMessage, ErrorObject, SortedMessages } from '$domains';

	export let chatId: string;
	export let chatData: ChatData;
	export let chatMessages: Array<ChatMessage>;
	export let unsendChatMessages: Array<ChatMessage>;
	export let chatMessagesError: ErrorObject | null;
	export let errorChatMessage: string;

	let chatPartner: string = '';
	let chatPartnerUsernameFromUrl: string = $page.params.username?.toString() || '';

	let sortedAndClusteredMessages: Array<SortedMessages> = [];

	$: {
		// Sort messages so the newest ones are first
		chatMessages.sort(
			(a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
		);

		// Reset sortedAndClusteredMessages
		sortedAndClusteredMessages = [];

		// Cluster messages by day
		chatMessages.forEach((message) => {
			const messageDate = new Date(message.creationDate).toLocaleDateString('de-DE');
			const cluster = sortedAndClusteredMessages.find((cluster) => cluster.date === messageDate);

			if (cluster) {
				cluster.messages = [...cluster.messages, message];
			} else {
				sortedAndClusteredMessages = [
					...sortedAndClusteredMessages,
					{ date: messageDate, messages: [message] }
				];
			}
		});
	}
</script>

<div class="chat w-full h-full {chatId ? 'lg:grid lg:grid-cols-[30%_1fr]' : ''}">
	<ContactList {chatId} data={chatData.chatsData} {chatPartner} />
	{#if chatId}
		<!-- Chat -->
		<div class="h-full">
			{#if chatMessagesError}
				<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
					<ErrorAlert message={errorChatMessage} />
				</main>
			{:else}
				<div class="w-full h-full">
					<div class="flex justify-center m-0 sticky top-0 z-40 bg-surface-50 dark:bg-surface-900">
						<ChatMobileHeader {chatPartner} />
					</div>
					<div class="overflow-y-auto h-full">
						<Chat
							chatMessages={sortedAndClusteredMessages}
							username={chatData.username}
							{unsendChatMessages}
						/>
					</div>
				</div>
				<div class="m-0 sticky bottom-0 z-40 bg-surface-50 dark:bg-surface-900">
					<SendMessageComponent
						username={chatData.username}
						chatPartnerUsername={chatPartnerUsernameFromUrl}
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>
