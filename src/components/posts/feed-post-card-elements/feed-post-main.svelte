<!-- Main post-component containing the posted image and text-->
<script lang="ts">
	import { FeedPostLocation } from '$components';
	import type { PostWithRepost } from '$domains';
	export let post: PostWithRepost;
</script>

<div class="card w-full !bg-transparent p-2">
	<!-- Scroll for mobile - component is hidden on desktop (md:hidden)-->
	<div class="grid grid-rows-1 gap-4 items-center !bg-transparent md:hidden w-full my-2">
		<div class="snap-x snap-mandatory scroll-auto scroll-1px flex gap-2 overflow-x-auto pb-2">
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
