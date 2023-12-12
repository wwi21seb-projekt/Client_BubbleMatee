import type { User } from '$domains';
import { writable } from 'svelte/store';

export const isMobileDevice = writable<boolean>(false);
export const isLoggedIn = writable<boolean>(false);
export const currentUser = writable<User>({ username: '', email: '' });
export const authToken = writable<string | null>(null);
