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
