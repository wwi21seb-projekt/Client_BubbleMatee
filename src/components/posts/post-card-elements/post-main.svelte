<!-- Main post-component containing the posted image and text-->
<script lang="ts">
	//TODO Add image
	let imageUrl = '';
	export let text: string;
</script>

<!-- Scroll for mobile - component is hidden on desktop (md:hidden)-->
<div class="card grid grid-rows-1 gap-4 items-center !bg-transparent md:hidden w-full">
	<div class="snap-x snap-mandatory scroll-auto scroll-1px flex gap-2 pb-2 overflow-x-auto">
		<!--Show an image, if the post has one-->
		{#if imageUrl !== ''}
			<div class="shrink-0 w-[100%] snap-start rounded">
				<img src={imageUrl} class="w-full h-auto rounded" alt="Post" />
			</div>
		{/if}
		<!--Seperator if the post has an image and text-->

		{#if imageUrl !== '' && text !== ''}
			<span class="divider-vertical h-full" />
		{/if}
		<!--Show text, if the post has text-->

		{#if text !== ''}
			<div class="shrink-0 w-full snap-start p-4 flex items-center rounded w-full">
				<article class="text-xl w-full">
					<p class="break-words w-full text-center">{text}</p>
				</article>
			</div>
		{/if}
	</div>
</div>

<!-- Side By Side for Desktop component is only visible on desktop (hidden md:flex)-->
<div class="hidden md:flex !bg-transparent items-center justify-center">
	<!--Show an image, if the post has one-->
	{#if imageUrl !== ''}
		<div class="w-1/2 flex items-center">
			<img src={imageUrl} class="w-full h-auto rounded" alt="Post" />
		</div>
	{/if}
	<!--Seperator if the post has an image and text-->
	{#if imageUrl !== '' && text !== ''}
		<span class="divider-vertical h-100 mr-2 ml-2" />
	{/if}
	<!--Show text, if the post has text-->
	{#if text !== ''}
		<div class="w-1/2 flex items-center justify-center">
			<article class="text-2xl">
				<p class="break-words">{text}</p>
			</article>
		</div>
	{/if}
</div>
