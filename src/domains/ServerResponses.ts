import type { Imprint } from './ServerDomains/imprint';
import type { Feed } from './ServerDomains/feed';
import type { UserFeed } from './ServerDomains/userFeed';
import type { Subscription, SubscriptionList } from './ServerDomains/subscription';
import type { EditUserInfo, Tokens, User, UserInfo } from './ServerDomains/user';
import type { Author, LocationPlace, PostWithRepost } from './Post';

export interface Response {
	error: boolean;
}

export interface Error {
	code: string;
	message: string;
}

export interface ErrorObject {
	error: Error;
}

export interface ErrorResponse extends Response {
	data: ErrorObject;
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

export interface LocationResponse extends Response {
	data: LocationPlace;
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
	data: UserSearch;
}

export interface UserSearch {
	records: Author[];
	pagination: {
		offset: 0;
		limit: 0;
		records: 0;
	};
}

export interface FeedSearch {
	records: PostWithRepost[];
	pagination: {
		offset: 0;
		limit: 0;
		records: 0;
	};
}

export interface SubscriptionListResponse extends Response {
	data: SubscriptionList;
}
