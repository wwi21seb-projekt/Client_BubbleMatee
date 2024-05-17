import type { Comment } from '$domains';
export interface CommentList {
	records: Array<Comment>;
	pagination: {
		offset: number;
		limit: number;
		records: number;
	};
}
