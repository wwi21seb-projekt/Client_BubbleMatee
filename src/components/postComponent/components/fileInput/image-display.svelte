<script lang="ts">
	import {
		isFileUploaded,
		uploadedImageUrl,
		isEditing,
		isFileSelected,
		isOverlayVisible
	} from '$stores';

	function startEditing() {
		$isEditing = true;
	}

	function startEditingImage() {
		if ($isOverlayVisible) {
			$isEditing = true;
		}
	}

	function removeImage() {
		$isFileUploaded = false;
		$uploadedImageUrl = undefined;
		$isFileSelected = false;
	}

	function removeImageImage() {
		if ($isOverlayVisible) {
			$isFileUploaded = false;
			$uploadedImageUrl = undefined;
			$isFileSelected = false;
		}
	}

	function toggleOverlayVisibilityTrue() {
		$isOverlayVisible = true;
	}

	function toggleOverlayVisibilityFalse() {
		$isOverlayVisible = false;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="image-container"
	on:mouseenter={toggleOverlayVisibilityTrue}
	on:mouseleave={toggleOverlayVisibilityFalse}
>
	<img src={$uploadedImageUrl} alt="Hochgeladenes Bild" />
	<div class="overlay-buttons">
		<button class="overlay-button variant-glass-surface" on:click={startEditingImage}>
			Bearbeiten
		</button>
		<button class="overlay-button variant-glass-surface" on:click={removeImageImage}>
			Entfernen
		</button>
	</div>
</div>
<div class="controls">
	<button class="btn btn variant-filled-surface iconButton" on:click={startEditing}
		><img
			src="./src/images/icons/edit.png"
			alt="Bild zum bearbeiten von Bilddateien"
			class="iconImageEdit"
		/>Bild aktualisieren</button
	>
	<button class="btn btn variant-filled-surface iconButton" on:click={removeImage}
		><img
			src="./src/images/icons/delete.png"
			alt="Bild zum entfernen von Bilddateien"
			class="iconImageDelete"
		/>Bild entfernen</button
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
		height: 30%; /* Feste Höhe für alle Bilder */
	}

	.image-container img {
		max-width: 100%;
		height: 100%; /* Feste Höhe für das Bild */
		object-fit: contain; /* Verhindert Verzerrungen und stellt sicher, dass das gesamte Bild sichtbar ist */
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
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

	.iconImageEdit {
		height: 2.188rem; /* Size for logo icons */
		width: 2.188rem; /* Size for logo icons */
	}

	.iconImageDelete {
		height: 2.188rem; /* Size for logo icons */
		width: 2.188rem; /* Size for logo icons */
	}
	.iconButton {
		display: flex; /* Macht den Button zu einem Flex-Container */
		flex-direction: column;
		align-items: center; /* Zentriert die Inhalte vertikal */
		justify-content: center; /* Zentriert die Inhalte horizontal */
		width: 100%;
		max-width: 230px;
		min-width: 150px;
		margin-bottom: 5px;
	}
</style>
