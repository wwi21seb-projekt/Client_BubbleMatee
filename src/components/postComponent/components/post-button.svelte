<script lang="ts">
	// Importing required functions and types from Svelte, navigation, error handling, and utility libraries
	import { derived, type Readable } from 'svelte/store';
	import { isFileSelected, postText, loading, uploadedImageUrl } from '$stores';
	import { goto } from '$app/navigation';
	import type { Post } from '$domains';
	import { getErrorMessage } from '$utils';
	import { getToastStore, type ToastStore, type ModalStore } from '@skeletonlabs/skeleton';
	import { PostGeolocation } from '$components';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore: ModalStore = getModalStore();

	export let isRepost: boolean = false;
	export let post: Post | undefined = undefined;

	$isFileSelected = false;
	$postText = '';
	$uploadedImageUrl = undefined;
	$loading = false;

	// Helper function to remove whitespace and newlines from a string
	function removeWhitespaceAndNewlines(text: string): string {
		return text.replace(/\s+/g, '');
	}

	// Derived Svelte store to determine if the input is valid (either a file is selected or text is entered after whitespace removal)
	const inputValid: Readable<boolean> = derived(
		[isFileSelected, postText],
		([$isFileSelected, $postText]) =>
			$isFileSelected || Boolean(removeWhitespaceAndNewlines($postText))
	);

	// Initialization of toast notifications store
	const toastStore: ToastStore = getToastStore();

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
		picture?: string;
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

	// Function to remove the Base64 prefix from an image URL
	function removeBase64Prefix(base64Url: string): string {
		return base64Url.split(',')[1]; // Split the string at the comma and return the second part, which is the actual Base64 data
	}

	// Asynchronous function to handle the post action, including API calls and error handling
	const handlePost: () => Promise<void> = async () => {
		if ($inputValid) {
			loading.set(true);

			// Extrahieren der Längen- und Breitengrade aus der coords Variable
			const LONGITUDE: number = coords[0];
			const LATITUDE: number = coords[1];
			const ACCURACY: number = 1; // oder ein Standardwert, falls gewünscht

			// Prüfen, ob die Koordinaten gültig sind
			const ARE_COORDS_VALID: boolean = LONGITUDE >= 0 && LATITUDE >= 0;

			try {
				// Ensure picture is set only if $uploadedImageUrl is defined
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

				if ($uploadedImageUrl) {
					postBody.picture = removeBase64Prefix($uploadedImageUrl);
				}

				if (isRepost && post) {
					postBody.repostedPostId = post.postId;
				}

				const response: Response = await fetch('/api/posts', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(postBody)
				});

				const body = await response.json();
				if (body.error) {
					toastStore.trigger({
						message: getErrorMessage(body.data.error.code, false),
						background: 'variant-filled-error'
					});
				} else {
					updateMockDataFromBody(body);
					goto(`/myProfile`);
					toastStore.trigger({
						message: 'Post erfolgreich',
						background: 'variant-filled-success'
					});
				}
			} catch (e) {
				goto('/login?redirect=1');
			} finally {
				loading.set(false);
				modalStore.close();
			}
		}
	};
</script>

<div class="flex flex-col items-center w-full max-w-[31.25rem]">
	<div class="w-full max-w-[31.25rem]">
		<PostGeolocation bind:coords />
	</div>

	<button
		type="button"
		class="btn variant-filled-primary mt-4 w-full"
		disabled={!$inputValid}
		on:click={handlePost}
	>
		Posten
	</button>
</div>
