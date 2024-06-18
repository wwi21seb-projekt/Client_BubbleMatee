<script lang="ts">
	import { Filedropzone, ImageDisplay } from '$components';
	import { isFileUploaded, isEditing, uploadedImageUrl } from '$stores';
	$isFileUploaded = false;
	$isEditing = false;
	$uploadedImageUrl = undefined;
</script>

<!-- show filedropzone or uploaded Image  -->
<div class="container">
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
		margin: auto;
		margin-bottom: 2rem;
	}
</style>
