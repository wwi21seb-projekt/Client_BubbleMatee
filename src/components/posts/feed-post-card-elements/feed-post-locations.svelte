<!--Component  to show the location-->
<script lang="ts">
	import type { LocationPlace, Location } from '$domains';
	import { fetchLocation } from '$utils';
	import Pin from '$lib/assets/pin.png';
	export let location: Location;

	let locationPlace: LocationPlace;
	const getLocation = async () => {
		try {
			const result = await fetchLocation(location.longitude, location.latitude);
			locationPlace = result;
		} catch (error) {
			// If there is an Error -> location isn't shown
		}
	};

	getLocation();
</script>

<div class="w-full justify-center items-center flex flex-row mt-2">
	<a
		class="chip variant-soft-secondary hover:variant-filled-secondary dark:variant-soft-primary darkhover:variant-filled-primary flex flex-row justify-center items-center text-base md:text-lg rounded-xl px-5 py-1 mb-1"
		href={`https://www.google.com/maps/search/?api=1&query=${location.latitude}%2C${location.longitude}`}
	>
		<img src={Pin} alt="Icon für Location" class="w-6 md:w-6 pr-1" />
		{#if !locationPlace || locationPlace.country === ''}
			<span>{`(${location.latitude},${location.longitude})`}</span>
		{:else}
			<span>{`${locationPlace.city}, ${locationPlace.country}`}</span>
		{/if}
	</a>
</div>
