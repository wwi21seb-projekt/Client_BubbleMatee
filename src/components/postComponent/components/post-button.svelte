<script lang="ts">
	// Importing required functions and types from Svelte, navigation, error handling, and utility libraries
	import { derived } from 'svelte/store';
	import { isFileSelected, postText, loading } from '$stores';
	import { goto } from '$app/navigation';
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
				// Extrahieren der Längen- und Breitengrade aus der coords Variable
				const longitude = coords.length > 0 ? coords[0] : '';
				const latitude = coords.length > 0 ? coords[1] : '';
				const accuracy = '100'; // oder ein Standardwert, falls gewünscht

				// Making a POST request to the server with the user input
				const response = await fetch('/api/posts', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						content: $postText,
						location: {
							//optional
							// Falls Koordinaten vorhanden sind, werden diese hier eingefügt
							longitude: longitude,
							latitude: latitude,
							accuracy: accuracy
						}
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

	import Geolocation from 'svelte-geolocation';

	let coords: [number, number];
	let getPosition = false;
	let isLocationActivated = false;
	let buttonDisabled = false;

	const buttonLoadingText = 'Geolocation wird geladen';
	const buttonActivationText = 'Geolocation Aktivieren';
	const buttonActivatedText = 'Geolocation aktiviert';
	let buttonGeolocationText = buttonActivationText;

	// State management for button
	function updateButtonState(status: 'loading' | 'activated' | 'deactivated') {
		switch (status) {
			case 'loading':
				buttonGeolocationText = buttonLoadingText;
				buttonDisabled = true;
				break;
			case 'activated':
				buttonGeolocationText = buttonActivatedText;
				buttonDisabled = false;
				isLocationActivated = true;
				console.log(coords);
				break;
			case 'deactivated':
				buttonGeolocationText = buttonActivationText;
				buttonDisabled = false;
				isLocationActivated = false;
				break;
		}
	}

	// Toast notifications
	function showToast(message: string, background: string) {
		toastStore.trigger({
			message,
			background
		});
	}

	// Handle button click
	function handleButtonClick() {
		// Überprüfen, ob der Standort bereits aktiviert ist
		if (isLocationActivated) {
			// Wenn ja, deaktivieren Sie den Standort
			getPosition = false; // Geolocation stoppen
			updateButtonState('deactivated');
			showToast('Geo-Location deaktiviert.', 'variant-filled-error');
		} else {
			// Wenn nicht, aktivieren Sie den Standort
			getPosition = true; // Geolocation starten
			updateButtonState('loading');
		}
	}
</script>

<button
	class={isLocationActivated ? 'btn variant-filled-success mt-2' : 'btn variant-filled-error mt-2'}
	disabled={buttonDisabled}
	on:click={handleButtonClick}
>
	{buttonGeolocationText}
</button>

<Geolocation {getPosition} bind:coords let:loading let:success let:error let:notSupported>
	{#if notSupported}
		{showToast('Ihr Browser unterstützt die Geolocation-API nicht.', 'variant-filled-error')}
		{updateButtonState('deactivated')}
	{:else}
		{#if loading}
			{showToast('Geo-Location wird geladen', 'variant-filled-success')}
		{/if}
		{#if success}
			{showToast('Geo-Location erfolgreich ermittelt', 'variant-filled-success')}
			{updateButtonState('activated')}
		{/if}
		{#if error}
			{showToast(`Geo-Location Fehler: ${error.message}`, 'variant-filled-error')}
			{updateButtonState('deactivated')}
		{/if}
	{/if}
</Geolocation>
<button
	type="button"
	class="btn variant-filled-primary mt-2 buttonPost"
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
