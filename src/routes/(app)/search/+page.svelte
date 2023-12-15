<!-- Search-Page of the App -->
<script>
	import { FileInput, Textarea } from '$components';
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
    <button type="button" class="btn btn variant-filled-secondary mt-2 buttonPost">
        <img src="./src/images/icons/paper-plane.png" alt="Icon zum Posten" class="iconImage" />
        <span>Posten</span>
    </button>
</div>

<style>
    :root {
        --default-margin: 2rem;
        --icon-size: 2.188rem;
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
        border-top: 8px double;
        margin: var(--default-margin) auto;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10%;
    }

    .buttonPost {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 500px;
        width: 100%;
    }

    .iconImage {
        height: var(--icon-size);
        width: var(--icon-size);
        margin-right: 0.5rem;
    }
</style>