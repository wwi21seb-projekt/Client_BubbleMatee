<script lang="ts">
    // Importing the FileDropzone component and upload restrictions
    import { FileDropzone } from '@skeletonlabs/skeleton';
    import { uploadRestrictions } from '../../../../static/components/index.ts';

    // Importing stores for managing file upload state
    import {
        files,
        isFileUploaded,
        uploadedImageUrl,
        isEditing,
        isFileSelected,
    } from '$stores';

    // Local variable to track selected files
    let localFiles: FileList;
    
    // Reactively update the files store when localFiles changes
    $: if (localFiles) {
        files.set(localFiles);
    }

    // Handler for file change events
    function onChangeHandler(e: Event) {
        console.log(localFiles.length !== 1)
        if ($files === null || $files.length !== 1) {
            alert('Please upload only one file.');
            return;
        }

        $isFileSelected = true; // Sets the flag when a file is selected
        const file = $files[0];
        const validTypes = ['image/jpeg', 'image/webp'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes

        // Checking for valid file type and size
        if (!validTypes.includes(file.type)) {
            alert('Only JPG and WebP files are allowed.');
            return;
        }
        if (file.size > maxSizeInBytes) {
            alert('The file must not be larger than 5 MB.');
            return;
        }

        // Displaying the uploaded file
        showUploadedFile(file);
        $isEditing = false; 
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
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <FileDropzone name="files" bind:files={localFiles} on:change={onChangeHandler}>
                <svelte:fragment slot="lead">
                    <div class="imageUploadContainer">
                        <img
                src="./src/images/icons/upload.png"
                alt="Image for uploading image files"
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
        {#if $isEditing}
            <div class="controls">
                <button class="btn btn variant-filled-error" on:click={cancelEditing}>Bildaktualisierung Abbrechen</button>
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
    margin: var(--dropzone-margin);
    height: auto; /* Flexible height for all dropzones */
    display: flex;
    flex-direction: var(--dropzone-flex-direction);
    align-items: center; /* Centers content horizontally */
    justify-content: center; /* Centers content vertically */
}

.imageUploadContainer {
    display: flex;
    justify-content: center; /* Centers the icon horizontally */
    align-items: center; /* Centers the icon vertically */
    height: 100%; /* Or a fixed height if you want a specific size */
    margin-left: var(--image-container-margin-left);
}

.iconImageUpload {
    height: var(--icon-size);
    width: var(--icon-size);
}
</style>