import type { Picture } from '$domains/Post';

export interface Notification {
	notificationId: string;
	timestamp: Date;
	notificationType: string;
	user: {
		username: string;
		nickname: string;
		picture?: Picture;
	};
}
