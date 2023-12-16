<script lang="ts">
	import { derived } from 'svelte/store';
	import { isFileSelected, postText } from '$stores';

	// Hilfsfunktion zum Entfernen von Leerzeichen und Zeilenumbrüchen
	function removeWhitespaceAndNewlines(text: string): string {
		return text.replace(/\s+/g, '');
	}

	// Der Button ist aktiviert (klickbar), wenn ein Text (nach dem Entfernen von Leerzeichen)
	// eingegeben oder eine Datei ausgewählt wurde
	const inputValid = derived(
		[isFileSelected, postText],
		([$isFileSelected, $postText]) =>
			$isFileSelected || Boolean(removeWhitespaceAndNewlines($postText))
	);
</script>

<button
	type="button"
	class="btn btn variant-filled-secondary mt-2 buttonPost"
	disabled={!$inputValid}
>
	<img src="./src/images/icons/paper-plane.png" alt="Icon zum Posten" class="iconImage" />
	<span>Posten</span>
</button>

<style>
	:root {
		--icon-size: 2.188rem;
	}

	.buttonPost {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 31.25rem;
		width: 100%;
	}

	.iconImage {
		height: var(--icon-size);
		width: var(--icon-size);
		margin-right: 0.5rem;
	}
</style>
