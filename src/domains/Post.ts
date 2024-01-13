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

//interface, that is needed to manage the loading of the next posts
export interface PostData {
	posts: Array<Post>;
	lastPostId?: string;
	overallRecords: number;
}
