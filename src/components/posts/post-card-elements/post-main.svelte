<!-- Main post-component containing the posted image and text-->
<script lang="ts">
	//TODO Add image
	//export let imageUrl: string;
	let imageUrl = '';
	export let text: string;
</script>

<!-- Scroll for mobile-->
<div class="card grid grid-rows-1 gap-4 items-center !bg-transparent md:hidden w-full">
	<div class="snap-x snap-mandatory scroll-auto scroll-1px flex gap-2 pb-2 overflow-x-auto">
		{#if imageUrl !== ''}
			<div class="shrink-0 w-[100%] snap-start rounded">
				<img src={imageUrl} class="w-full h-auto rounded" alt="Post" />
			</div>
		{/if}
		{#if imageUrl !== '' && text !== ''}
			<span class="divider-vertical h-full" />
		{/if}
		{#if text !== ''}
			<div class="shrink-0 w-[100%] snap-start p-4 flex items-center rounded w-full">
				<article class="text-xl w-full">
					<p class="break-words w-full">{text}</p>
				</article>
			</div>
		{/if}
	</div>
</div>

<!-- Side By Side for Desktop-->
<div class="hidden md:flex !bg-transparent items-center justify-center">
	{#if imageUrl !== ''}
		<div class="w-1/2 flex items-center">
			<img src={imageUrl} class="w-full h-auto rounded" alt="Post" />
		</div>
	{/if}
	{#if imageUrl !== '' && text !== ''}
		<span class="divider-vertical h-100 mr-2 ml-2" />
	{/if}
	{#if text !== ''}
		<div class="w-1/2 flex items-center">
			<article class="text-2xl w-full">
				<p class="break-words w-full">{text}</p>
			</article>
		</div>
	{/if}
</div>
