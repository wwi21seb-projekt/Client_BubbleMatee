<script lang="ts">
	export let id: string;
	export let comment: string;
	import { Avatar } from '@skeletonlabs/skeleton';
	let shortComment: string = comment.substring(0, 200);

	//function to toggle wether the comment is shown fully or not (only for long comments)
	function toggleFullComment(): void {
		let shortCommentElement: HTMLElement = document.getElementById(id + '-short-comment')!;
		let fullCommentelement: HTMLElement | null = document.getElementById(id + '-full-comment')!;
		let button: HTMLElement | null = document.getElementById(id + '-comment-button')!;
		if (shortCommentElement.style.display === 'none') {
			shortCommentElement.style.display = 'block';
			fullCommentelement.style.display = 'none';
			button.innerText = 'Mehr';
		} else {
			shortCommentElement.style.display = 'none';
			fullCommentelement.style.display = 'block';
			button.innerText = 'Weniger';
		}
	}
</script>

<div class="grid grid-cols-[auto_1fr] gap-2">
	<Avatar src="src/images/about/jonas.png" width="w-8 md:w-10" />
	<div class="card p-2 variant-soft rounded-tl-none space-y-2">
		<header class="flex justify-between items-center">
			<p class="text-lg md:text-xl font-bold">Username</p>
			<small>12.12.2023 17:45 Uhr</small>
		</header>
		<div>
			<p class="text-lg md:text-xl" id={id + '-short-comment'}>{shortComment}</p>
			<p class="text-lg md:text-xl" id={id + '-full-comment'} style="display:none;">{comment}</p>
			{#if comment.length > shortComment.length}
				<button
					class="text-lg md:text-xl text-gray-400 hover:text-gray-500 focus:text-gray-500"
					id={id + '-comment-button'}
					on:click={toggleFullComment}>Mehr</button
				>
			{/if}
		</div>
	</div>
</div>
