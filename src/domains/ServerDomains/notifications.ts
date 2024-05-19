export interface Notification {
	notificationId: string;
	timestamp: Date;
	notificationType: string;
	user: {
		username: string;
		nickname: string;
		profilePictureUrl: string;
	};
}
