<!--Comment-Element for the comment-Modal-Window. Shows one comment with the user and the text-->
<script lang="ts">
	import type { Comment } from '$domains';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let id: string;
	export let comment: Comment;
	import { Avatar, getModalStore, type ModalStore } from '@skeletonlabs/skeleton';
	import Person from '$lib/assets/person.png';
	import { calculatePassedTime } from '$utils';

	let shortComment: string = comment.content.substring(0, 64);
	let moreClicked: boolean = false;
	let dateString: string = calculatePassedTime(comment.creationDate);
	const modalStore: ModalStore = getModalStore();

	//function to toggle wether the comment is shown fully or not (only for long comments)
	function changeMoreClicked() {
		moreClicked = !moreClicked;
	}

	function getWords(text: string) {
		const words: Array<string> = text.split(' ');
		return words;
	}
</script>

<!--Grid with two columns. The left Column contains the profile picture and the right the comment-->
<div class="grid grid-cols-[auto_1fr] gap-2 m-2">
	<!--Left column-->
	<Avatar
		src={comment.author.picture && comment.author.picture.url ? comment.author.picture.url : Person}
		width="w-8 md:w-10 min-w-0"
	/>
	<!--right column-->
	<div
		class="card p-2 variant-soft-tertiary dark:variant-soft-surface rounded-tl-none space-y-2 min-w-0 w-full"
	>
		<!--Header containing the username and nickname and the time that has passed since the post-->
		<header class="flex justify-between items-center pr-1 w-full gap-2">
			<button
				class={`${'hover:text-gray-400 text-left'}`}
				on:click={() => {
					const currentPath = $page.url.pathname.split('/')[1];
					goto(`/${currentPath}/user/${comment.author.username}`);
					modalStore.close();
				}}
			>
				<p class="text-xl md:text-2xl font-bold break-all">{comment.author.username}</p>
			</button>

			<small class="text-sm md:text-base text-right">{'vor ' + dateString}</small>
		</header>
		<div>
			<!--The actual comment. If the text is longer than 128 characters it is shortend and the user can switch between the long and the short version-->
			<p class="text-xl md:text-2xl break-words w-full" id={id + '-comment'}>
				{#each getWords(moreClicked ? comment.content : shortComment) as word}
					{#if word.includes('@')}
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<a
							class="hover:text-gray-400 cursor-pointer italic"
							on:click={() => {
								const currenPath = $page.url.pathname.split('/')[1];
								let lastIndex = word.lastIndexOf('@');
								goto(`/${currenPath}/user/${word.substring(lastIndex + 1)}`);
								modalStore.close();
							}}>{word}</a
						>
						{' '}
					{:else}
						{word + ' '}
					{/if}
				{/each}
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
