import type { Author } from '$domains/Post';
import type { ChatMessageResponse, ChatsResponse, ErrorResponse } from '$domains/ServerResponses';

export interface Chats {
	records: Array<Chat>;
}

export interface Chat {
	chatId: string;
	user: Author;
}

export interface ChatMessages {
	records: Array<ChatMessage>;
	pagination: {
		offset: number;
		limit: number;
		records: number;
	};
}

export interface ChatMessage {
	content: string;
	username: string;
	creationDate: string;
}

export interface SortedMessages {
	date: string;
	messages: ChatMessage[];
}

export interface ChatData {
	chatsData: ChatsResponse | ErrorResponse;
	chatMessageData: ChatMessageResponse | ErrorResponse;
	username: string;
	token: string;
}
