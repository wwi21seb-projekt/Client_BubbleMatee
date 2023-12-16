<script>
	import { FileInput, Textarea, PostButton } from '$components';
</script>

<h1 class="h1">
	<span
		class="bg-gradient-to-br from-tertiary-500 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
		>Beitrag teilen</span
	>
</h1>

<hr class="separator" />

<div class="content">
	<FileInput />
	<Textarea />
	<PostButton />
</div>

<style>
	:root {
		--default-margin: 2rem;
		--icon-size: 2.188rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2rem;
	}

	.h1 {
		text-align: center;
		margin: var(--default-margin) auto;
		transition: transform 0.3s ease-in-out;
	}

	.h1:hover {
		transform: scale(1.1);
	}

	.separator {
		border-top: 0.5rem double;
	}
</style>
