<script lang="ts">
	// Importing required functions and types from Svelte, navigation, error handling, and utility libraries
	import { derived } from 'svelte/store';
	import { isFileSelected, postText, files, currentUser, loading } from '$stores';
	// import { goto } from '$app/navigation'; //Maybe used later for pagenavigation
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

	// Function to convert a file to a Base64 encoded string for image handling
	async function convertFileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

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
		imageBase64: string;
	};

	// Initializing mock data for demonstration or testing purposes
	const mockData: MockData = {
		postId: '',
		author: { username: '', nickname: '', profilePictureUrl: '' },
		creationDate: '',
		content: '',
		imageBase64: ''
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
			imageBase64?: string;
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
		mockData.imageBase64 = body.data.imageBase64 ?? mockData.imageBase64;
	}

	// Asynchronous function to handle the post action, including API calls and error handling
	const handlePost = async () => {
		if ($inputValid) {
			loading.set(true);
			try {
				let imageBase64 = '';
				if ($isFileSelected && $files && $files.length > 0) {
					imageBase64 = await convertFileToBase64($files[0]);
				}

				// Making a POST request to the server with the user input
				const response = await fetch('/api/posts', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						text: $postText,
						image: imageBase64,
						user: $currentUser.username
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
					// Navigation command after successful post (currently commented out)
					// goto('');
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
<div>
	<h1>Post Details</h1>
	<p><strong>Post ID:</strong> {mockData.postId}</p>
	<p><strong>Author Username:</strong> {mockData.author.username}</p>
	<p><strong>Author Nickname:</strong> {mockData.author.nickname}</p>
	<p><strong>Author Profile Picture:</strong> {mockData.author.profilePictureUrl}</p>
	<p><strong>Creation Date:</strong> {mockData.creationDate}</p>
	<p><strong>Content:</strong> {mockData.content}</p>
	<img src={mockData.imageBase64} alt="Gesendetes Bild" class="sendedPicture" />
</div>

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
