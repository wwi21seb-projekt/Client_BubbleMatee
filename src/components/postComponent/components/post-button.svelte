<script lang="ts">
	// Importing required functions and types from Svelte, navigation, error handling, and utility libraries
	import { derived } from 'svelte/store';
	import { isFileSelected, postText, loading } from '$stores';
	import { goto } from '$app/navigation';
	import type { Error, Post } from '$domains';
	import { getErrorMessage } from '$utils';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { PostGeolocation } from '$components';
	import { PaperPlane } from '$images';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	export let isRepost: boolean = false;
	export let post: Post | undefined = undefined;

	// Helper function to remove whitespace and newlines from a string
	function removeWhitespaceAndNewlines(text: string): string {
		return text.replace(/\s+/g, '');
	}

	// Derived Svelte store to determine if the input is valid (either a file is selected or text is entered after whitespace removal)
	const inputValid = derived(
		[isFileSelected, postText],
		([$isFileSelected, $postText]) =>
			$isFileSelected || Boolean(removeWhitespaceAndNewlines($postText))
	);

	// Initialization of toast notifications store
	const toastStore = getToastStore();

	let coords: [number, number];

	// Type definitions for Author and MockData to ensure type safety
	type Author = {
		username: string;
		nickname: string;
		profilePictureUrl: string;
	};

	type MockData = {
		postId: string;
		author: Author;
		creationDate: string;
		content: string;
	};

	type NewPost = {
		repostedPostId?: string;
		content: string;
		location: {
			longitude: number;
			latitude: number;
			accuracy: number;
		} | null;
	};

	// Initializing mock data for demonstration or testing purposes
	const mockData: MockData = {
		postId: '',
		author: { username: '', nickname: '', profilePictureUrl: '' },
		creationDate: '',
		content: ''
	};
	// Define an interface that matches the structure of the data you expect in `body`
	interface MockDataBody {
		data: {
			postId?: string;
			author?: {
				username?: string;
				nickname?: string;
				profilePictureUrl?: string;
			};
			creationDate?: string;
			content?: string;
		};
	}
	// Function to update the mock data based on the response body
	function updateMockDataFromBody(body: MockDataBody): void {
		if (body.data.postId) mockData.postId = body.data.postId;
		if (body.data.author) {
			mockData.author = { ...mockData.author, ...body.data.author };
		}
		mockData.creationDate = body.data.creationDate ?? mockData.creationDate;
		mockData.content = body.data.content ?? mockData.content;
	}

	// Asynchronous function to handle the post action, including API calls and error handling
	const handlePost = async () => {
		console.log('Test');
		if ($inputValid) {
			loading.set(true);
			try {
				// Extrahieren der Längen- und Breitengrade aus der coords Variable
				const LONGITUDE = coords[0];
				const LATITUDE = coords[1];
				const ACCURACY = 1; // oder ein Standardwert, falls gewünscht

				// Prüfen, ob die Koordinaten gültig sind
				const ARE_COORDS_VALID = LONGITUDE >= 0 && LATITUDE >= 0;

				let postBody: NewPost = {
					content: $postText,
					location: ARE_COORDS_VALID
						? {
								//optional
								// Falls Koordinaten vorhanden sind, werden diese hier eingefügt
								longitude: LONGITUDE,
								latitude: LATITUDE,
								accuracy: ACCURACY
							}
						: null
				};

				isRepost && post ? (postBody.repostedPostId = post.postId) : null;
				// Making a POST request to the server with the user input
				const response = await fetch('/api/posts', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(postBody)
				});

				const body = await response.json();
				// Handling potential errors from the response
				if (body.error) {
					const ERROR: Error = body.data.error;
					toastStore.trigger({
						message: getErrorMessage(ERROR.code, false),
						background: 'variant-filled-error'
					});
				} else {
					updateMockDataFromBody(body);
					// Navigation command after successful post
					goto(`/myProfile`);
					toastStore.trigger({
						message: 'Post erfolgreich',
						background: 'variant-filled-success'
					});
				}

				return body;
			} catch (e) {
				console.error(e);
			} finally {
				// Resetting loading state after the operation is complete
				loading.set(false);
				modalStore.close();
			}
		}
	};
</script>

<div class={!isRepost ? '' : 'hidden'}>
	<PostGeolocation bind:coords />
</div>

<button
	type="button"
	class="btn variant-filled-primary mt-4 buttonPost"
	disabled={!$inputValid}
	on:click={handlePost}
>
	<img src={PaperPlane} alt="Icon zum Posten" class="iconImage" />
	<span>Posten</span>
</button>

<style>
	:root {
		--icon-size: 2.188rem;
	}

	.buttonPost {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 31.25rem;
		width: 100%;
	}

	.iconImage {
		height: var(--icon-size);
		width: var(--icon-size);
		margin-right: 0.5rem;
	}
</style>
