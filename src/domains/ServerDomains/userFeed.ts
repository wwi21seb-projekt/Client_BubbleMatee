import type { Location, PostWithRepost } from '$domains';

//Interface for the data that the server sends for a user feed-request
export interface UserFeed {
	records: Array<PostWithRepost>;
	pagination: {
		offset: number;
		limit: number;
		records: number;
	};
}
