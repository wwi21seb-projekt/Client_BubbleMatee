import type { User } from '$domains';
import { checkAuth } from '$utils';
import { writable } from 'svelte/store';

export const isLoggedIn = writable<boolean>(checkAuth());
export const currentUser = writable<User>({ username: '', email: '', nickname: '' });
export const authToken = writable<string | null>(null);
