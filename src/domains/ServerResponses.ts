import type { Imprint } from './ServerDomains/imprint';
import type { Feed } from './ServerDomains/feed';
import type { UserFeed } from './ServerDomains/userFeed';
import type { Subscription } from './ServerDomains/subscription';
import type { EditUserInfo, Tokens, User, UserInfo } from './ServerDomains/user';
import type { Author } from './Post';

export interface Response {
	error: boolean;
}

export interface Error {
	code: string;
	message: string;
}

export interface ErrorResponse extends Response {
	data: Error;
}

export interface ImprintResponse extends Response {
	data: Imprint;
}

export interface LoginResponse extends Response {
	data: Tokens;
}

export interface RegisterResponse extends Response {
	data: User;
}

export interface FeedResponse extends Response {
	data: Feed;
}

export interface UserFeedResponse extends Response {
	data: UserFeed;
}

export interface UserInfoResponse extends Response {
	data: UserInfo;
}

export interface EditUserInformationResponse extends Response {
	data: EditUserInfo;
}

export interface FollowResponse extends Response {
	data: Subscription;
}

export interface UserSearchResponse extends Response {
	data: {
		records: Author[];
		pagination: {
			offset: 0;
			limit: 0;
			records: 0;
		};
	};
}
