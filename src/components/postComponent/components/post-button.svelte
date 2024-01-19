<script lang="ts">
	// Importing required functions and types from Svelte, navigation, error handling, and utility libraries
	import { derived } from 'svelte/store';
	import { isFileSelected, postText, loading } from '$stores';
	import { goto } from '$app/navigation'; //Maybe used later for pagenavigation
	import type { Error } from '$domains';
	import { getErrorMessage } from '$utils';
	import { getToastStore } from '@skeletonlabs/skeleton';

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
		if ($inputValid) {
			loading.set(true);
			try {
				// Making a POST request to the server with the user input
				const response = await fetch('/api/posts', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						content: $postText
					})
				});

				const body = await response.json();
				// Handling potential errors from the response
				if (body.error) {
					const error: Error = body.data.error;
					toastStore.trigger({
						message: getErrorMessage(error.code),
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
			}
		}
	};
</script>

<button
	type="button"
	class="btn btn variant-filled-primary mt-2 buttonPost"
	disabled={!$inputValid}
	on:click={handlePost}
>
	<img src="./src/images/icons/paper-plane.png" alt="Icon zum Posten" class="iconImage" />
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
