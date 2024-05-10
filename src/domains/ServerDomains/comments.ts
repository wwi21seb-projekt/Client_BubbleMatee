import type { Author } from "$domains";

export interface Comment {
	records: [
		{
			commentId: string;
			author: Author;
			creationDate: Date;
			content: string;
		}
	];
	pagination: {
		offset: number;
		limit: number;
		records: number;
	};
}