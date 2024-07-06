<script lang="ts">
	// Importing the FileDropzone component and upload restrictions
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getErrorMessage } from '$utils';
	import { Photo } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { uploadRestrictions } from '../../../../static/components/index.ts';
	const toastStore = getToastStore();
	// Importing stores for managing file upload state
	import { files, isFileUploaded, uploadedImageUrl, isEditing, isFileSelected } from '$stores';
	// Local variable to track selected files
	let localFiles: FileList;
	//Base 64 convert
	function convertToBase64(file: File) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			$uploadedImageUrl = reader.result as string;
			$isFileUploaded = true;
		};
		reader.onerror = (error) => {
			console.error('Error converting file to Base64:', error);
		};
	}
	// Handler for file change events
	function onChangeHandler() {
		let passedChecks = true;
		if (localFiles.length === null || localFiles.length !== 1) {
			passedChecks = false;
			const t: ToastSettings = {
				message: getErrorMessage('ERR-100', true),
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
			return;
		}
		const file = localFiles[0];
		const validTypes = ['image/jpeg', 'image/webp', 'image/png', 'image/svg+xml'];
		const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
		// Checking for valid file type and size
		if (!validTypes.includes(file.type)) {
			passedChecks = false;
			const t: ToastSettings = {
				message: getErrorMessage('ERR-101', true),
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
			return;
		}
		if (file.size > maxSizeInBytes) {
			passedChecks = false;
			const t: ToastSettings = {
				message: getErrorMessage('ERR-102', true),
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
			return;
		}
		if (passedChecks) {
			// Displaying the uploaded file
			showUploadedFile(file);
			convertToBase64(file); // Verwenden Sie die neue Funktion
			files.set(localFiles);
			$isEditing = false;
			$isFileSelected = true; // Sets the flag when a file is selected
		}
	}
	// Function to display the uploaded file
	function showUploadedFile(file: File) {
		$uploadedImageUrl = URL.createObjectURL(file);
		$isFileUploaded = true;
	}
	// Function to cancel editing
	function cancelEditing() {
		$isEditing = false;
	}
</script>

<div class={$isEditing ? 'filedropzone' : 'filedropzone filedropzone-hidden'}>
	<FileDropzone name="files" bind:files={localFiles} on:change={onChangeHandler} class="h-72">
		<svelte:fragment slot="lead">
			<div class="imageUploadContainer">
				<Icon src={Photo} class="h-10"></Icon>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="message"
			>Lade eine Datei hoch oder ziehe sie per Drag & Drop</svelte:fragment
		>
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
{#if $isEditing}
	<div class="controls">
		<button class="btn variant-filled-error" on:click={cancelEditing}
			>Bildaktualisierung Abbrechen</button
		>
	</div>
{/if}

<style>
	:root {
		/* Definition variables*/
		--controls-max-width: 31.25rem;
		--controls-margin-top: 1.25rem;
		--dropzone-width: 100%;
		--dropzone-margin: 0 auto;
		--dropzone-flex-direction: column;
		--image-container-margin-left: 5px;
		--icon-size: 3.188rem; /* Size for logo icons */
	}

	.controls {
		display: flex;
		justify-content: space-around;
		width: var(--dropzone-width);
		max-width: var(--controls-max-width);
		margin-top: var(--controls-margin-top);
	}

	.filedropzone {
		width: var(--dropzone-width);
		display: flex;
		flex-direction: var(--dropzone-flex-direction);
		align-items: center; /* Centers content horizontally */
		justify-content: center; /* Centers content vertically */
	}

	.imageUploadContainer {
		display: flex;
		justify-content: center; /* Centers the icon horizontally */
		align-items: center; /* Centers the icon vertically */
		margin-left: var(--image-container-margin-left);
	}
</style>
