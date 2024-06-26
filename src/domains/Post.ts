export interface UploadRestrictions {
	type: string;
	value: string;
}

//Interface with the data that the post component needs
export interface Post {
	postId: string;
	author: Author;
	creationDate: Date;
	content: string;
	location: Location | null;
	likes: number;
	liked: boolean;
	comments: number;
	picture?: Picture;
}

export interface Picture {
	url: string;
	width: number;
	height: number;
	tag?: number;
}

export interface PostWithRepost extends Post {
	repost?: Post;
}

export interface Author {
	username: string;
	nickname: string;
	picture?: Picture;
}

export interface Location {
	longitude: string;
	latitude: string;
	accuracy: number;
}

export interface LocationPlace {
	longitude: string;
	latitude: string;
	country: string;
	city: string;
}

//interface, that is needed to manage the loading of the next posts
export interface PostData {
	posts: Array<PostWithRepost>;
	lastPostId?: string;
	overallRecords: number;
}

export interface Comment {
	commentId: number;
	content: string;
	author: Author;
	creationDate: Date;
}

export interface CommentData {
	comments: Array<Comment>;
	overallRecords: number;
	isError: boolean;
	errorText: string;
}
