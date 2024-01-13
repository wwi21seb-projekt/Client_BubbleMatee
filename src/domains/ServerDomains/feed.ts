//Interface for the data that the server sends for a feed-request
export interface Feed {
	records: [
		{
			postId: string;
			author: {
				username: string;
				nickname: string;
				profilePictureUrl: string;
			};
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
