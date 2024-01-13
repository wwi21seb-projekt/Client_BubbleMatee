import type { Imprint } from './ServerDomains/imprint';
import type { Subscription } from './ServerDomains/subscription';
import type { EditUserInfo, Tokens, User, UserInfo, UserSearchItem } from './ServerDomains/user';

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
		records: UserSearchItem[];
		pagination: {
			offset: 0;
			limit: 0;
			records: 0;
		};
	};
}
