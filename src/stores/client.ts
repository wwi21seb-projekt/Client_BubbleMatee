import type { User } from '$domains';
import { writable } from 'svelte/store';

export const isLoggedIn = writable<boolean>(false);
export const currentUser = writable<User>({ username: '', email: '', nickname: '' });
export const authToken = writable<string | null>(null);
