<script lang="ts">
	// Importing reactive variables from Svelte store
	import {
		isFileUploaded, // Tracks if a file has been uploaded
		uploadedImageUrl, // Stores the URL of the uploaded image
		isEditing, // Indicates if the user is in editing mode
		isFileSelected, // Indicates if a file has been selected
		isOverlayVisible // Tracks the visibility of the overlay on the image
	} from '$stores';
	// Set a delay in milliseconds (e.g., 500ms = 0.5 seconds)
	const delay = 50;
	// Function to start editing (sets editing mode to true)
	function startEditing() {
		$isEditing = true;
	}

	// Function to start editing the image, but only if the overlay is visible
	function startEditingImage() {
		if ($isOverlayVisible) {
			$isEditing = true;
		}
	}

	// Function to remove the image (resets related variables)
	function removeImage() {
		$isFileUploaded = false;
		$uploadedImageUrl = undefined;
		$isFileSelected = false;
	}

	// Function to remove the image, but only if the overlay is visible
	function removeImageImage() {
		if ($isOverlayVisible) {
			$isFileUploaded = false;
			$uploadedImageUrl = undefined;
			$isFileSelected = false;
		}
	}

	// Function to make the overlay visible
	function toggleOverlayVisibilityTrue() {
		setTimeout(() => {
			$isOverlayVisible = true;
		}, delay);
	}

	// Function to hide the overlay
	function toggleOverlayVisibilityFalse() {
		$isOverlayVisible = false;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="image-container h-72"
	on:mouseenter={toggleOverlayVisibilityTrue}
	on:mouseleave={toggleOverlayVisibilityFalse}
>
	<img src={$uploadedImageUrl} alt="Hochgeladenes Bild" class="h-72 w-auto rounded-md" />
	<div class="overlay-buttons">
		<button class="overlay-button variant-glass-surface" on:click={startEditingImage}>
			Bearbeiten
		</button>
		<button class="overlay-button variant-glass-surface" on:click={removeImageImage}>
			Entfernen
		</button>
	</div>
</div>
<div class="controls mt-4 controls flex justify-between">
	<button class="btn variant-filled-surface w-[47%]" on:click={startEditing}>
		Bild ändern</button
	>
	<button class="btn btn variant-filled-surface w-[47%]" on:click={removeImage}>
		Bild entfernen</button
	>
</div>

<style>
	.image-container {
		position: relative;
		width: 100%; /* Angepasste Breite */
		margin: 0 auto;
		display: flex;
		justify-content: center; /* Zentriert das Bild horizontal */
		align-items: center; /* Zentriert das Bild vertikal */
	}

	.controls {
		width: 100%;
		max-width: 31.25rem;
	}

	.overlay-buttons {
		position: absolute;
		bottom: 0px; /* Positioniert am unteren Rand des Padding-Bereichs */
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		opacity: 0;
	}

	.overlay-button {
		flex: 1;
		background: none;
		border: none;
		cursor: pointer;
		width: 100%;
	}

	.image-container:hover .overlay-buttons {
		opacity: 1;
	}
</style>
