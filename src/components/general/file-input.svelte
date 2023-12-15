<script lang="ts">
    import { FileDropzone } from '@skeletonlabs/skeleton';

    let files: FileList;
    let isFileUploaded = false;
    let uploadedImageUrl: string | undefined;
    let isEditing = false;
    let isFileSelected = false; // Flag, um den Status der Dateiauswahl zu verwalten
	let isOverlayVisible = false;
	const uploadRestrictions = [ {type: "Erlaubte Dateitypen:", value: "jpeg, webp"},
								{type: "Maximale Dateigröße:", value:"5 MB"},
								{type: "Maximale Dateianzahl:", value:"1"}
								];	


    function onChangeHandler(e: Event) {
        if (files.length !== 1) {
            alert('Bitte nur eine Datei hochladen.');
            return;
        }

        isFileSelected = true; // Setzt das Flag, wenn eine Datei ausgewählt wird
        const file = files[0];
        const validTypes = ['image/jpeg', 'image/webp'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in Bytes

        if (!validTypes.includes(file.type)) {
            alert('Nur JPG und WebP Dateien sind erlaubt.');
            return;
        }
        if (file.size > maxSizeInBytes) {
            alert('Die Datei darf nicht größer als 5 MB sein.');
            return;
        }

        showUploadedFile(file);
        isEditing = false; 
    }

    function showUploadedFile(file: File) {
        uploadedImageUrl = URL.createObjectURL(file);
        isFileUploaded = true;
    }

    function startEditing() {
        isEditing = true;
    }

	function startEditingImage() {
        if (isOverlayVisible) {
            isEditing = true;
        }
    }

    function cancelEditing() {
        isEditing = false;
    }

    function removeImage() {
        isFileUploaded = false;
        uploadedImageUrl = undefined;
        isFileSelected = false; 
    }

	function removeImageImage() {
        if (isOverlayVisible) {
            isFileUploaded = false;
            uploadedImageUrl = undefined;
            isFileSelected = false;
        }
    }

	function toggleOverlayVisibilityTrue() {
        isOverlayVisible = true;
    }

	function toggleOverlayVisibilityFalse() {
        isOverlayVisible = false;
    }
</script>

<div class="container">
    {#if !isFileUploaded || isEditing}
        <div class={isEditing ? 'filedropzone' : 'filedropzone filedropzone-hidden'}>
            <FileDropzone name="files" bind:files on:change={onChangeHandler}>
				<svelte:fragment slot="lead">
					<div class="imageUploadContainer">
						<img
				src="./src/images/icons/upload.png"
				alt="Bild zum uploaden von Bilddateien"
				class="iconImageUpload"/>
			</div>
			</svelte:fragment>
				<svelte:fragment slot="message">Laden Sie eine Datei hoch oder ziehen Sie sie per Drag & Drop</svelte:fragment>
				<svelte:fragment slot="meta">
					<dl class="w-full ml-2">
						<hr class="!border-t-2" />
						<span class="flex flex-col w-full">
							{#each uploadRestrictions as uploadRestriction}
								<dt class="font-bold mt-2">{uploadRestriction.type}</dt>
								<dd class="mb-1">{uploadRestriction.value}</dd>
								<hr class="!border-t-2" />
							{/each}
						</span>
					</dl>
				</svelte:fragment>
			</FileDropzone>
        </div>
        {#if isEditing}
            <div class="controls">
                <button class="btn btn variant-filled-error" on:click={cancelEditing}>Abbrechen</button>
            </div>
        {/if}
    {:else}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="image-container" on:mouseenter={toggleOverlayVisibilityTrue} on:mouseleave={toggleOverlayVisibilityFalse}>
		<img src={uploadedImageUrl} alt="Hochgeladenes Bild" />
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
            <button class="btn btn variant-filled-surface iconButton" on:click={startEditing}><img
				src="./src/images/icons/edit.png"
				alt="Bild zum bearbeiten von Bilddateien"
				class="iconImageEdit"
			/>Bild aktualisieren</button>
            <button class="btn btn variant-filled-surface iconButton" on:click={removeImage}><img
				src="./src/images/icons/delete.png"
				alt="Bild zum entfernen von Bilddateien"
				class="iconImageDelete"
			/>Bild entfernen</button>
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 500px;
		margin: auto;
		margin-bottom: 2rem;
    }

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
        justify-content: space-around;
        width: 100%;
        max-width: 500px;
        margin-top: 20px;
    }

    .filedropzone {
        width: 100%;
        margin: 0 auto;
		height: auto; /* Feste Höhe für alle Dropzone */
		display: flex;
        flex-direction: column;
        align-items: center; /* Zentriert Inhalte horizontal */
        justify-content: center; /* Zentriert Inhalte vertikal */

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

	.imageUploadContainer {
        display: flex;
        justify-content: center; /* Zentriert das Icon horizontal */
        align-items: center; /* Zentriert das Icon vertikal */
        height: 100%; /* oder eine feste Höhe, wenn Sie eine spezifische Größe möchten */
		margin-left: 5px;
    }

	.iconImageUpload{
		height: 3.188rem; /* Size for logo icons */
		width: 3.188rem; /* Size for logo icons */
		
	}

	.iconImageEdit{
		height: 2.188rem; /* Size for logo icons */
		width: 2.188rem; /* Size for logo icons */
		
	}

	.iconImageDelete{
		height: 2.188rem; /* Size for logo icons */
		width: 2.188rem; /* Size for logo icons */
		
	}
	.iconButton{
		display: flex; /* Macht den Button zu einem Flex-Container */
		flex-direction: column;
        align-items: center; /* Zentriert die Inhalte vertikal */
        justify-content: center; /* Zentriert die Inhalte horizontal */
	}
</style>