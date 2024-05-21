import { writable } from 'svelte/store';

export const loading = writable<boolean>(false);
export const redirectToLogin1 = writable<boolean>(false);
export const redirectToLogin2 = writable<boolean>(false);
