<!--Component  to show the location-->
<script lang="ts">
	import type { LocationPlace, Location } from '$domains';
	import { fetchLocation } from '$utils';
	import { Pin } from '$images';
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
		class="chip max-w-full variant-soft-secondary hover:variant-filled-secondary dark:variant-soft-primary dark:hover:variant-filled-primary flex flex-row justify-center items-center text-base md:text-lg rounded-xl px-5 py-1 mb-1"
		href={`https://www.google.com/maps/search/?api=1&query=${location.latitude}%2C${location.longitude}`}
	>
		<img src={Pin} alt="Icon für Location" class="w-6 md:w-6 pr-1 flex-shrink-0" />
		{#if !locationPlace || locationPlace.country === ''}
			<span class="max-w-full break-words whitespace-normal"
				>{`(${location.latitude.toString().substring(0, 5)}, ${location.longitude.toString().substring(0, 5)})`}</span
			>
		{:else}
			<span class="max-w-full break-words whitespace-normal"
				>{`${locationPlace.city}, ${locationPlace.country}`}</span
			>
		{/if}
	</a>
</div>
