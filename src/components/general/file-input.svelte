<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';

	let files: FileList;
	let isFileUploaded = false;
	let uploadedImageUrl: string | undefined;

	function onChangeHandler(e: Event) {
		if (files.length !== 1) {
			alert('Bitte nur eine Datei hochladen.');
			return;
		}

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

		// Direkte Anzeige der hochgeladenen Datei ohne Server-Upload
		showUploadedFile(file);
	}

	function showUploadedFile(file: File) {
		uploadedImageUrl = URL.createObjectURL(file);
		isFileUploaded = true;
	}
</script>

{#if !isFileUploaded}
	<FileDropzone name="files" bind:files on:change={onChangeHandler}>
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<svelte:fragment slot="message">(message)</svelte:fragment>
		<svelte:fragment slot="meta">(meta)</svelte:fragment>
	</FileDropzone>
{:else}
	<img src={uploadedImageUrl} alt="Hochgeladenes Bild" />
{/if}
