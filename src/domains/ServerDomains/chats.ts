import type { User } from './user';

export interface Chats {
	records: Array<Chat>;
}

export interface Chat {
	chatId: string;
	user: User;
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
