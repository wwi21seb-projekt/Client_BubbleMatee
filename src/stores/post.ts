import { writable } from 'svelte/store';

export const files = writable<FileList | null>(null);
export const isFileUploaded = writable(false);
export const uploadedImageUrl = writable<string | undefined>(undefined);
export const isEditing = writable(false);
export const isFileSelected = writable(false);
export const isOverlayVisible = writable(false);
export const postText = writable("");
