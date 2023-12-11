import { writable } from 'svelte/store';

export const isMobileDevice = writable(false);
export const isLoggedIn = writable(false);
export const currentUser = writable({ username: '', email: '' });
export const authToken = writable(null);
