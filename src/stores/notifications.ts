import type { Notification } from '$domains';
import { writable } from 'svelte/store';

export const hasNotifications = writable<boolean>(false);
export const notifications = writable<Array<Notification>>([]);
