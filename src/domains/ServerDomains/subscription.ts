import type { UUID } from 'crypto';

export interface Subscription {
	subscriptionId: UUID;
	subscriptionDate: 'dateTime UTC';
	follower: string;
	following: string;
}
