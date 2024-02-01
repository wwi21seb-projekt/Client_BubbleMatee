import type { Author, Location } from '$domains';

//Interface for the data that the server sends for a feed-request
export interface Feed {
	records: [
		{
			postId: string;
			author: Author;
			location: Location | null;
			creationDate: Date;
			content: string;
		}
	];
	pagination: {
		lastPostId: string;
		limit: number;
		records: number;
	};
}
