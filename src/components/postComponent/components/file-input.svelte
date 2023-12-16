<script lang="ts">
	import { Filedropzone, ImageDisplay } from '$components';
    import {
        isFileUploaded,
        isEditing,
    } from '$stores';
    $isFileUploaded = false;
    $isEditing = false;

</script>

<div class="container">
    {#if !$isFileUploaded || $isEditing}
        <Filedropzone />
    {:else}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
        <ImageDisplay/>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 31.25rem;
		margin: auto;
		margin-bottom: 2rem;
    }
</style>