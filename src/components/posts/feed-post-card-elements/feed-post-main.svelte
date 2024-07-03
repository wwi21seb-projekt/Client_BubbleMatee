<!-- Main post-component containing the posted image and text-->
<script lang="ts">
	import { FeedPostLocation } from '$components';
	import type { PostWithRepost } from '$domains';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	export let post: PostWithRepost;

	// Carousel element
	let elemCarousel: HTMLDivElement;
	let isStart: boolean = true;
	let isEnd: boolean = false;

	// Carousel navigation functions
	function carouselMove(direction: 'left' | 'right'): void {
		const step: number = elemCarousel.clientWidth;
		const maxScroll: number = elemCarousel.scrollWidth - step;
		let newX: number =
			direction === 'left'
				? Math.max(0, elemCarousel.scrollLeft - step)
				: Math.min(maxScroll, elemCarousel.scrollLeft + step);
		elemCarousel.scroll(newX, 0);
	}

	function carouselLeft(): void {
		carouselMove('left');
	}

	function carouselRight(): void {
		carouselMove('right');
	}
	function handleScroll() {
		const step: number = elemCarousel.clientWidth;
		const maxScroll: number = elemCarousel.scrollWidth - step;
		isStart = elemCarousel.scrollLeft == 0;
		isEnd = elemCarousel.scrollLeft > maxScroll - step + 1;
	}
</script>

<div class="w-full !bg-transparent p-2">
	<!-- Scroll for mobile - component is hidden on desktop (md:hidden)-->
	<div class="flex justify-between md:hidden">
		<!--Button to scroll, if the if the post has an image and text-->
		{#if post.picture && post.picture.url != '' && post.content !== ''}
			{#if !isStart}
				<button class="w-8" on:click={carouselLeft}>
					<Icon
						class="stroke-surface-500 dark:stroke-primary-500 stroke-bold"
						src={ChevronLeft}
					/></button
				>
			{:else}
				<div class="w-8"></div>
			{/if}
		{/if}
		<div class="grid grid-rows-1 gap-4 items-center !bg-transparent w-full my-2">
			<div
				on:scroll={handleScroll}
				bind:this={elemCarousel}
				class="snap-x snap-mandatory scroll-auto scroll-1px flex gap-2 overflow-x-auto pb-2"
			>
				<!--Show an image, if the post has one-->
				{#if post.picture && post.picture.url != ''}
					<div
						class="shrink-0 w-full snap-start rounded aspect-square h-48 sm:h-60 flex items-center justify-center overflow-hidden"
					>
						<img
							src={post.picture.url}
							class="w-auto h-auto max-h-full max-w-full rounded-md"
							alt="Post"
						/>
					</div>
				{/if}
				<!--Seperator if the post has an image and text-->

				{#if post.picture && post.picture.url != '' && post.content !== ''}
					<span class="divider-vertical h-full" />
				{/if}
				<!--Show text, if the post has text-->
				{#if post.content !== ''}
					<div class="shrink-0 snap-start px-4 py-2 flex items-center rounded w-full">
						<article class="text-xl w-full">
							<p class="break-words w-full text-center">{post.content}</p>
						</article>
					</div>
				{/if}
			</div>
		</div>
		{#if post.picture && post.picture.url != '' && post.content !== ''}
			<!--Button to scroll, if the if the post has an image and text-->

			{#if !isEnd}
				<button class="w-8" on:click={carouselRight}>
					<Icon
						class="stroke-surface-500 dark:stroke-primary-500 stroke-bold"
						src={ChevronRight}
					/></button
				>
			{:else}
				<div class="w-8"></div>
			{/if}
		{/if}
	</div>

	<!-- Side By Side for Desktop component is only visible on desktop (hidden md:flex)-->
	<div class="hidden md:flex !bg-transparent items-center justify-center p-2">
		<!--Show an image, if the post has one-->
		{#if post.picture && post.picture.url != ''}
			<div class="w-1/2 flex items-center justify-center overflow-hidden aspect-square h-72">
				<img
					src={post.picture.url}
					class="w-auto h-auto max-h-full max-w-full rounded-md"
					alt="Post"
				/>
			</div>
		{/if}
		<!--Seperator if the post has an image and text-->
		{#if post.picture && post.picture.url != '' && post.content !== ''}
			<span class="divider-vertical h-100 mr-2 ml-2" />
		{/if}
		<!--Show text, if the post has text-->
		{#if post.content !== ''}
			<div class="w-1/2 flex items-center justify-center px-4 py-2">
				<article class="text-2xl w-full">
					<p class="break-words w-full text-center">{post.content}</p>
				</article>
			</div>
		{/if}
	</div>
	{#if post.location}
		<FeedPostLocation location={post.location} />
	{/if}
</div>
