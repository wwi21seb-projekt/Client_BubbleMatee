import type { Location } from '$domains';

//Interface for the data that the server sends for a user feed-request
export interface UserFeed {
	records: [
		{
			postId: string;
			creationDate: Date;
			content: string;
			location: Location | null;
			likes: number;
			liked: boolean
		}
	];
	pagination: {
		offset: number;
		limit: number;
		records: number;
	};
}
