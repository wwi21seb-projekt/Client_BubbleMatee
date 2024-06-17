<script lang="ts">
	import { postText } from '$stores';

	var localPostText: string = '';
	$postText = '';
	// CSS class names for different text states
	const classNormal = ' dark:from-tertiary-500 dark:to-secondary-500';
	const classWarning = 'text-warning-500';
	const classMaxReached = 'text-error-500';

	// Character limit for showing a warning
	const charsWarning = 50;

	// Maximum characters allowed in the textarea
	export let maxChars: number = 256;

	// Reactive declarations to update the textarea class based on text length
	$: classtext =
		localPostText.length > maxChars - charsWarning && localPostText.length < maxChars
			? classWarning
			: localPostText.length >= maxChars
				? classMaxReached
				: classNormal;

	// Function to handle input changes, update the text, and adjust the textarea height
	function handleInput(event: Event) {
		// Assert that event.target is of a specific type, e.g., HTMLTextAreaElement
		const target = event.target as HTMLTextAreaElement;

		// Now you can use the target with its specific type properties
		$postText = localPostText;
		localPostText = target.value;
		target.style.height = 'inherit';
		target.style.height = `${target.scrollHeight}px`;
	}
</script>

<div class="container">
	<textarea
		class="textarea !bg-surface-300 dark:!bg-surface-700 {classtext}"
		rows="3"
		placeholder={`Bitte geben Sie hier ihren Post mit maximal ${maxChars} Zeichen ein.`}
		maxlength={maxChars}
		bind:value={localPostText}
		on:input={handleInput}
	></textarea>

	{#if localPostText.length === maxChars}
		<!-- Displayed when the character limit is reached -->
		<div class={classtext}>Du hast das Zeichenlimit erreicht.</div>
	{/if}

	<!-- Display the number of remaining characters -->
	<div class={classtext}>Verbleibende Zeichen: {maxChars - localPostText.length}</div>
</div>

<style>
	/* Styling for the main container */
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 31.25rem;
		max-height: 7rem;
		margin: auto;
		margin-bottom: 2rem;
		margin-top: 2rem;
	}
</style>
