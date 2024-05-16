import type { Author } from "$domains";

export interface CommentList {
	records: Array<Comment>
	pagination: {
		offset: number;
		limit: number;
		records: number;
	};
}

export interface Comment 
{
	commentId: string;
	author: Author;
	creationDate: Date;
	content: string;
}
