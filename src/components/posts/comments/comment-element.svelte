<!--Comment-Element for the comment-Modal-Window. Shows one comment with the user and the text-->
<script lang="ts">
	import type { Comment } from '$domains';
	export let id: string;
	export let comment: Comment;
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Person } from '$images';
	import { calculatePassedTime } from '$utils';

	let shortComment: string = comment.content.substring(0, 64);
	let moreClicked = false;
	let dateString: string = calculatePassedTime(comment.creationDate);
	//function to toggle wether the comment is shown fully or not (only for long comments)
	function changeMoreClicked() {
		moreClicked = !moreClicked;
	}
</script>

<!--Grid with two columns. The left Column contains the profile picture and the right the comment-->
<div class="grid grid-cols-[auto_1fr] gap-2 m-2">
	<!--Left column-->
	<Avatar src={comment.author.profilePictureUrl ? comment.author.profilePictureUrl : Person} width="w-8 md:w-10 min-w-0" />
	<!--right column-->
	<div
		class="card p-2 variant-soft-tertiary dark:variant-soft-surface rounded-tl-none space-y-2 min-w-0"
	>
		<!--Header containing the username and nickname and the time that has passed since the post-->
		<header class="flex justify-between items-center pr-1">
			<p class="text-xl md:text-2xl font-bold">{comment.author.username}</p>
			<small class="text-sm md:text-base">{"vor " + dateString}</small>
		</header>
		<div>
			<!--The actual comment. If the text is longer than 128 characters it is shortend and the user can switch between the long and the short version-->
			<p class="text-xl md:text-2xl break-words w-full" id={id + '-short-comment'}>
				{moreClicked ? comment.content : shortComment}
			</p>
			{#if comment.content.length > shortComment.length}
				<button
					class="text-xl md:text-2xl text-gray-400 hover:text-gray-500 focus:text-gray-500"
					on:click={changeMoreClicked}>{moreClicked ? 'Weniger' : 'Mehr'}</button
				>
			{/if}
		</div>
	</div>
</div>
