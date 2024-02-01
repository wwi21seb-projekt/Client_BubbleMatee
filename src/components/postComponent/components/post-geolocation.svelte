<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Geolocation from 'svelte-geolocation';

	export let coords: [number, number] = [-1, -1];
	let getPosition = false;
	let isLocationActivated = false;
	let buttonDisabled = false;
	let status: 'loading' | 'activated' | 'deactivated' = 'deactivated';

	const TOAST_STORE = getToastStore();
	const BUTTON_LOADING_TEXT = 'Standort wird geladen';
	const BUTTON_ACTIVATION_TEXT = 'Standort Aktivieren';
	const BUTTON_ACTIVATED_TEXT = 'Standort aktiviert';
	let buttonGeolocationText = BUTTON_ACTIVATION_TEXT;

	// Reactive statement for button state
	$: {
		switch (status) {
			case 'loading':
				buttonGeolocationText = BUTTON_LOADING_TEXT;
				buttonDisabled = true;
				break;
			case 'activated':
				buttonGeolocationText = BUTTON_ACTIVATED_TEXT;
				buttonDisabled = false;
				isLocationActivated = true;
				break;
			case 'deactivated':
				buttonGeolocationText = BUTTON_ACTIVATION_TEXT;
				buttonDisabled = false;
				isLocationActivated = false;
				coords = [-1, -1];
				break;
		}
	}

	// Toast notifications as a reactive statement
	$: showToast = (message: string, background: string) => {
		TOAST_STORE.trigger({
			message,
			background
		});
	};

	// Handle button click
	function handleButtonClick() {
		if (isLocationActivated) {
			getPosition = false; // Stop Geolocation
			status = 'deactivated';
			showToast('Standort deaktiviert.', 'variant-filled-warning');
		} else {
			getPosition = true; // Start Geolocation
			status = 'loading';
		}
	}
</script>

<button
	class={isLocationActivated
		? 'btn variant-filled-success mt-2'
		: 'btn variant-filled-warning mt-2'}
	disabled={buttonDisabled}
	on:click={handleButtonClick}
>
	{buttonGeolocationText}
</button>

<Geolocation {getPosition} bind:coords let:loading let:success let:error let:notSupported>
	{#if notSupported}
		{showToast('Ihr Browser unterstützt die Standort-API nicht.', 'variant-filled-error')}
		{(status = 'deactivated')}
	{:else}
		{#if loading}
			{showToast('Standort wird geladen', 'variant-filled-success')}
		{/if}
		{#if success}
			{showToast('Standort erfolgreich ermittelt', 'variant-filled-success')}
			{(status = 'activated')}
		{/if}
		{#if error}
			{showToast(`Standort Fehler: ${error.message}`, 'variant-filled-error')}
			{(status = 'deactivated')}
		{/if}
	{/if}
</Geolocation>
