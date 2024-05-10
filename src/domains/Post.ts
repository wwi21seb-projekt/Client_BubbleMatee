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
	liked: boolean
}

export interface Author {
	username: string;
	nickname: string;
	profilePictureUrl: string;
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
	posts: Array<Post>;
	lastPostId?: string;
	overallRecords: number;
}

export interface Comment {
	commentId: number;
	content: string;
	author: Author;
	creationDate: Date
}

export interface CommentData {
	comments: Array<Comment>;
	overallRecords: number
}
