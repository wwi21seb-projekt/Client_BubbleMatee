<script lang="ts">

    import {
            postText
        } from '$stores';    
    
    var localPostText:string = "";
    // Maximum characters allowed in the textarea
    const maxChars = 256;

    // CSS class names for different text states
    const classNormal = "text-surface-50";
    const classWarning = "text-warning-500";
    const classMaxReached = "text-error-500";

    // Character limit for showing a warning
    const charsWarning = 50;

    // Reactive declarations to update the textarea class based on text length
    $: classtext = localPostText.length > maxChars - charsWarning && localPostText.length < maxChars
        ? classWarning
        : localPostText.length >= maxChars
        ? classMaxReached
        : classNormal;

    // Function to handle input changes, update the text, and adjust the textarea height
    function handleInput(event: any) {
        $postText = localPostText;
        localPostText = event.target.value;
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }
</script>

<div class="container">

<textarea class="textarea {classtext}" rows="3" placeholder="Bitte geben sie hier ihren Post mit maximal 256 Zeichen ein." maxlength={maxChars} bind:value={localPostText} on:input={handleInput}></textarea>

    {#if localPostText.length === maxChars}
        <!-- Displayed when the character limit is reached -->
        <div class="{classtext}">Du hast das Zeichenlimit erreicht.</div>
    {/if}

    <!-- Display the number of remaining characters -->
    <div class="{classtext}">Verbleibende Zeichen: {maxChars - localPostText.length}</div>
</div>

<style>
    /* Styling for the main container */
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 31.25rem;
        margin: auto;
        margin-bottom: 2rem;
    }
</style>
