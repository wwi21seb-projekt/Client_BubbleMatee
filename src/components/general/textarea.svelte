<script lang="ts">
    // Initialize the text variable for storing textarea input
    let text = '';
    
    // Maximum characters allowed in the textarea
    const maxChars = 256;

    // CSS class names for different text states
    const classNormal = "text-surface-50";
    const classWarning = "text-warning-500";
    const classMaxReached = "text-error-500";

    // Character limit for showing a warning
    const charsWarning = 50;

    // Reactive declarations to update the textarea class based on text length
    $: classtext = text.length > maxChars - charsWarning && text.length < maxChars
        ? classWarning
        : text.length >= maxChars
        ? classMaxReached
        : classNormal;

    // Reactive declaration to set a boolean based on whether there's any text
    $: inputBoolean = text.length > 0;

    // Function to handle input changes, update the text, and adjust the textarea height
    function handleInput(event: any) {
        text = event.target.value;
        event.target.style.height = 'inherit';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }
</script>

<div class="container">

<textarea class="textarea {classtext}" rows="3" placeholder="Bitte geben sie hier ihren Post mit maximal 256 Zeichen ein." maxlength={maxChars} bind:value={text} on:input={handleInput}></textarea>


    {#if text.length === maxChars}
        <!-- Displayed when the character limit is reached -->
        <div class="{classtext}">Du hast das Zeichenlimit erreicht.</div>
    {/if}

    <!-- Display the number of remaining characters -->
    <div class="{classtext}">Verbleibende Zeichen: {maxChars - text.length}</div>
</div>

<style>
    /* Styling for the main container */
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 500px;
        margin: auto;
        margin-bottom: 2rem;
    }
</style>
