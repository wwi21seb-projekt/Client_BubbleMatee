export interface Tokens {
	token: string;
	refreshToken: string;
}

export interface User {
	username: string;
	nickname: string;
	email: string;
}

export interface UserInfo {
	username: string;
	nickname: string;
	status: string;
	profilePictureUrl: string;
	follower: number;
	following: number;
	posts: number;
	subscriptionId: string;
}
