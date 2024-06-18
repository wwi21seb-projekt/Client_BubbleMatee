<script lang="ts">
	import { Filedropzone, ImageDisplay } from '$components';
	import { isFileUploaded, isEditing, uploadedImageUrl } from '$stores';
	$isFileUploaded = false;
	$isEditing = false;
	$uploadedImageUrl = undefined;
</script>

<!-- show filedropzone or uploaded Image  -->
<div class="container my-4 mx-auto">
	{#if !$isFileUploaded || $isEditing}
		<!-- show filedropzone -->
		<Filedropzone />
	{:else}
		<!-- show uploaded Image  -->
		<ImageDisplay />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 31.25rem;
	}
</style>
