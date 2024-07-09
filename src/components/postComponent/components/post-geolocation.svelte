<script lang="ts">
	import type { LocationPlace } from '$domains';
	import Pin from '$lib/assets/pin.png';
	import { fetchLocation } from '$utils';
	import { getToastStore, type ToastStore } from '@skeletonlabs/skeleton';
	import Geolocation from 'svelte-geolocation';

	export let coords: [number, number];
	let getPosition: boolean = false;
	let isLocationActivated: boolean = false;
	let buttonDisabled: boolean = false;
	let standorttext: string = 'Standort wird geladen';
	const toastStore: ToastStore = getToastStore();
	const buttonLoadingText: string = 'Standort wird geladen';
	const buttonActivationText: string = 'Standort teilen';
	const buttonActivatedText: string = 'Standort nicht teilen';
	//HighAccuracy für Standortermittlung
	let options: {
		enableHighAccuracy: boolean;
		timeout: number;
		maximumAge: number;
	} = {
		/**
		 * @type {boolean}
		 * @default false
		 */
		enableHighAccuracy: true,

		/**
		 * @type {number}
		 * @default Infinity
		 */
		timeout: 5000, // milliseconds

		/**
		 * @type {number}
		 * @default 0
		 */
		maximumAge: 60 * 60 * 1000 // milliseconds
	};

	let buttonGeolocationText: string = buttonActivationText;

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

	const getLocation: () => Promise<void> = async () => {
		standorttext = 'Standort wird geladen';
		let locationPlace: LocationPlace;

		try {
			const result: LocationPlace = await fetchLocation(`${coords[0]}`, `${coords[1]}`);
			locationPlace = result;
			standorttext = `${locationPlace.city}, ${locationPlace.country}`;
		} catch (error) {
			// If there is an Error -> location isn't shown
		}
	};

	function loadLocation(): string {
		getLocation();
		return '';
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
		} else {
			// Wenn nicht, aktivieren Sie den Standort
			getPosition = true; // Geolocation starten
			updateButtonState('loading');
		}
	}
</script>

<div class="flex flex-col items-center justify-center w-full max-w-[31.25rem]">
	<Geolocation
		{getPosition}
		{options}
		bind:coords
		let:loading
		let:success
		let:error
		let:notSupported
	>
		{#if notSupported}
			{showToast('Dein Browser unterstützt die Geolocation-API nicht.', 'variant-filled-error')}
			{updateButtonState('deactivated')}
		{:else}
			{#if loading}
				{showToast('Koordinaten werden ermittelt', 'variant-filled-success')}
			{/if}
			{#if success}
				{updateButtonState('activated')}
				{loadLocation()}

				<div
					class="card !bg-surface-300 dark:!bg-surface-700 border border-primary-500 rounded-xl p-4 mt-2 w-full max-w-[31.25rem] divide-y divide-surface-500"
				>
					<div class="mb-1">
						<p class="mb-1 text-xl font-semibold text-center w-full">{'Koodinaten'}</p>
						<div class="w-full justify-center items-center flex flex-row mt-1">
							<a
								class="chip variant-soft-secondary hover:variant-filled-secondary dark:variant-soft-primary darkhover:variant-filled-primary flex flex-row justify-center items-center text-base md:text-lg rounded-xl px-5 py-1 mb-1"
								href={`https://www.google.com/maps/search/?api=1&query=${coords[1]}%2C${coords[0]}`}
							>
								<img src={Pin} alt="Icon für Location" class="w-6 md:w-6 pr-1" />
								<span>{`(${coords[1]},${coords[0]})`}</span>
							</a>
						</div>
					</div>
					<div>
						<p class="mb-1 text-xl font-semibold text-center w-full">Standort</p>
						<div class="w-full justify-center items-center flex flex-row mt-1">
							<a
								class="chip variant-soft-secondary hover:variant-filled-secondary dark:variant-soft-primary darkhover:variant-filled-primary flex flex-row justify-center items-center text-base md:text-lg rounded-xl px-5 py-1 mb-1"
								href={`https://www.google.com/maps/search/?api=1&query=${coords[1]}%2C${coords[0]}`}
							>
								<img src={Pin} alt="Icon für Location" class="w-6 md:w-6 pr-1" />
								<span>{standorttext}</span>
							</a>
						</div>
					</div>
				</div>
			{/if}
			{#if error}
				{showToast(
					`Fehler bei der Ermittlung deiner Koordinaten: ${error.message}`,
					'variant-filled-error'
				)}
				{updateButtonState('deactivated')}
			{/if}
		{/if}
	</Geolocation>

	<button
		class={` w-full max-w-[31.25rem] ${
			isLocationActivated ? 'mt-4 btn variant-filled-surface' : 'btn variant-ghost-surface'
		}`}
		disabled={buttonDisabled}
		on:click={handleButtonClick}
	>
		{buttonGeolocationText}
	</button>
</div>
