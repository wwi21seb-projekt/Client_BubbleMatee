import type { User } from '$domains';
import { checkAuth } from '$utils';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';

export const isLoggedIn: Writable<boolean> = localStorageStore('isLoggedIn', checkAuth());
export const currentUser = writable<User>({ username: '', email: '', nickname: '' }); //TODO: Why is this needed?
export const authToken = writable<string | null>(null); //TODO: Why is this needed?
export const currentUsername: Writable<string | null> = localStorageStore('currentUsername', null);
