import type { PostWithRepost } from '$domains';

//Interface for the data that the server sends for a feed-request
export interface Feed {
	records: Array<PostWithRepost>;
	pagination: {
		lastPostId: string;
		limit: number;
		records: number;
	};
}
