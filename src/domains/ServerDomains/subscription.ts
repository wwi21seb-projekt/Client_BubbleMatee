import type { Picture } from '$domains/Post';
import type { UUID } from 'crypto';

export interface Subscription {
	subscriptionId: UUID;
	subscriptionDate: 'dateTime UTC';
	follower: string;
	following: string;
}

export interface SubscriptionList {
	records: Array<Follower>;
	pagination: {
		offset: number;
		limit: number;
		records: number;
	};
}

export interface Follower {
	followerId: string;
	followingId: string;
	nickname: string;
	picture?: Picture;
	username: string;
}
