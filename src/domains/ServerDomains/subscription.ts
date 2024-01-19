import type { UUID } from 'crypto';

export interface Subscription {
	subscriptionId: UUID;
	subscriptionDate: 'dateTime UTC';
	follower: string;
	following: string;
}

export interface SubscriptionList{
    records: [
        {
            subscriptionId: string,
            subscriptionDate: string,
            user: {
                username: string,
                nickname: string,
                profilePictureUrl : string
            }
        }
    ],
    pagination: {
        offset: number,
        limit: number,
        records : number
    }
}
