<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Geolocation from 'svelte-geolocation';

	export let coords: [number, number];
	let getPosition = false;
	let isLocationActivated = false;
	let buttonDisabled = false;

	const toastStore = getToastStore();
	const buttonLoadingText = 'Geolocation wird geladen';
	const buttonActivationText = 'Geolocation Aktivieren';
	const buttonActivatedText = 'Geolocation aktiviert';
	let buttonGeolocationText = buttonActivationText;

	// State management for button
	function updateButtonState(status: 'loading' | 'activated' | 'deactivated'): string {
		switch (status) {
			case 'loading':
				buttonGeolocationText = buttonLoadingText;
				buttonDisabled = true;
				return '';
			case 'activated':
				buttonGeolocationText = buttonActivatedText;
				buttonDisabled = false;
				isLocationActivated = true;
				return '';
			case 'deactivated':
				buttonGeolocationText = buttonActivationText;
				buttonDisabled = false;
				isLocationActivated = false;
				coords = [-1, -1];
				return '';
		}
	}

	// Toast notifications
	function showToast(message: string, background: string): string {
		toastStore.trigger({
			message,
			background
		});
		return '';
	}

	// Handle button click
	function handleButtonClick() {
		// Überprüfen, ob der Standort bereits aktiviert ist
		if (isLocationActivated) {
			// Wenn ja, deaktivieren Sie den Standort
			getPosition = false; // Geolocation stoppen
			updateButtonState('deactivated');
			showToast('Geo-Location deaktiviert.', 'variant-filled-warning');
		} else {
			// Wenn nicht, aktivieren Sie den Standort
			getPosition = true; // Geolocation starten
			updateButtonState('loading');
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
		{showToast('Ihr Browser unterstützt die Geolocation-API nicht.', 'variant-filled-error')}
		{updateButtonState('deactivated')}
	{:else}
		{#if loading}
			{showToast('Geo-Location wird geladen', 'variant-filled-success')}
		{/if}
		{#if success}
			{showToast('Geo-Location erfolgreich ermittelt', 'variant-filled-success')}
			{updateButtonState('activated')}
		{/if}
		{#if error}
			{showToast(`Geo-Location Fehler: ${error.message}`, 'variant-filled-error')}
			{updateButtonState('deactivated')}
		{/if}
	{/if}
</Geolocation>
