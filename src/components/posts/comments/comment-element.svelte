<!--Comment-Element for the comment-Modal-Window. Shows one comment with the user and the text-->
<script lang="ts">
	export let id: string;
	export let comment: string;
	import { Avatar } from '@skeletonlabs/skeleton';
	let shortComment: string = comment.substring(0, 128);
	let moreClicked = false;
	//function to toggle wether the comment is shown fully or not (only for long comments)
	function changeMoreClicked() {
		moreClicked = !moreClicked;
	}
</script>

<!--Grid with two columns. The left Column contains the profile picture and the right the comment-->
<div class="grid grid-cols-[auto_1fr] gap-2">
	<!--Left column-->
	<Avatar src="src/images/about/jonas.png" width="w-8 md:w-10 min-w-0" />
	<!--right column-->
	<div
		class="card p-2 variant-soft-tertiary dark:variant-soft-surface rounded-tl-none space-y-2 min-w-0"
	>
		<!--Header containing the username and nickname and the time that has passed since the post-->
		<header class="flex justify-between items-center pr-1">
			<p class="text-xl md:text-2xl font-bold">Username</p>
			<small class="text-sm md:text-base">12.12.2023 17:45 Uhr</small>
		</header>
		<div>
			<!--The actual comment. If the text is longer than 128 characters it is shortend and the user can switch between the long and the short version-->
			<p class="text-xl md:text-2xl break-words w-full" id={id + '-short-comment'}>
				{moreClicked ? comment : shortComment}
			</p>
			{#if comment.length > shortComment.length}
				<button
					class="text-xl md:text-2xl text-gray-400 hover:text-gray-500 focus:text-gray-500"
					on:click={changeMoreClicked}>{moreClicked ? 'Weniger' : 'Mehr'}</button
				>
			{/if}
		</div>
	</div>
</div>
