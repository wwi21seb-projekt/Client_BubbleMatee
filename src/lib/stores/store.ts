import { writable } from 'svelte/store';

export const isLoggedIn = writable(true);
export const currentUser = writable({ username: '', email: '' });
export const authToken = writable(null);
