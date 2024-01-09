//Interface with the data that the post component needs
export interface Post {
	postId: string;
	author: Author;
	date: Date;
	content: string;
}

export interface Author {
	username: string;
	nickname: string;
	profilePictureUrl: string;
}

export interface PostData {
	posts: Array<Post>;
	lastPostId: string;
	overallRecords: number;
}
