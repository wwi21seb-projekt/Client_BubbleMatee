import type { Picture } from "$domains/Post";

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
	picture?: Picture;
	follower: number;
	following: number;
	posts: number;
	subscriptionId: string;
}
export interface EditUserInfo {
	nickname: string;
	status: string;
}

export interface SearchParams {
	q: string | null;
	username: string | null;
	offset: number;
}
