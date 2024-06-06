<!-- Main post-component containing the posted image and text-->
<script lang="ts">
	import type { Picture } from "$domains";

	//TODO Add image
	export let picture: Picture | undefined;
	export let text: string ;
</script>

<!-- Scroll for mobile - component is hidden on desktop (md:hidden)-->
<div class="grid grid-rows-1 gap-4 items-center !bg-transparent md:hidden w-full my-2">
	<div class="snap-x snap-mandatory scroll-auto scroll-1px flex gap-2 overflow-x-auto">
		<!--Show an image, if the post has one-->
		{#if picture && picture.url != ''}
			<div class="shrink-0 w-[100%] snap-start rounded">
				<img src={picture.url} class="w-full h-auto rounded" alt="Post" />
			</div>
		{/if}
		<!--Seperator if the post has an image and text-->

		{#if picture && picture.url != '' && text !== ''}
			<span class="divider-vertical h-full" />
		{/if}
		<!--Show text, if the post has text-->

		{#if text !== ''}
			<div class="shrink-0 snap-start px-4 py-2 flex items-center rounded w-full">
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
	{#if picture && picture.url != ''}
		<div class="w-1/2 flex items-center">
			<img src={picture.url} class="w-full h-auto rounded" alt="Post" />
		</div>
	{/if}
	<!--Seperator if the post has an image and text-->
	{#if picture && picture.url != '' && text !== ''}
		<span class="divider-vertical h-100 mr-2 ml-2" />
	{/if}
	<!--Show text, if the post has text-->
	{#if text !== ''}
		<div class="w-1/2 flex items-center justify-center px-4 py-2">
			<article class="text-2xl w-full">
				<p class="break-words w-full text-center">{text}</p>
			</article>
		</div>
	{/if}
</div>
