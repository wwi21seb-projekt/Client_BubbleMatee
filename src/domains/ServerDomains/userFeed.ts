//Interface for the data that the server sends for a user feed-request
export interface UserFeed {
	records: [
		{
			postId: string;
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
