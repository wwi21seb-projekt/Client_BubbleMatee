<!--Post-Footer containing buttons for liking an commenting-->

<script lang="ts">
	//TODO: Datenanbindung der Komponente -> wenn der Endpunkt definiert wurde
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Heart, ChatBubbleLeft, ArrowPathRoundedSquare } from '@steeze-ui/heroicons';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { Comments, RepostComponent } from '$components';
	import { isLoggedIn } from '$stores';
	import { goto } from '$app/navigation';
	import type { PostWithRepost, CommentData } from '$domains';
	export let post: PostWithRepost;
	const modalStore = getModalStore();
	export let likePost: () => void;
	export let unlikePost: () => void;
	export let loadMoreComments: () => Promise<CommentData>;
	export let commentPost: (content: string) => Promise<CommentData>;
	export let commentData: CommentData;

	//funktion to toggle the like of the post
	function toggleLike(): void {
		// Error-Message if the user is not logged in
		if (!$isLoggedIn) {
			goto('/login?redirect=1');
		} else {
			if (post.liked) {
				unlikePost();
			} else {
				likePost();
			}
		}
	}

	//function to open the comment section
	async function handleCommentClick() {
		// Error-Message if the user is not logged in
		if (!$isLoggedIn) {
			goto('/login?redirect=1');
		} else {
			if (commentData.comments.length < 1) {
				commentData = await loadMoreComments();
			}
			const modalComponent: ModalComponent = {
				ref: Comments,
				props: {
					commentData: commentData,
					loadMoreComments: loadMoreComments,
					commentPost: commentPost
				}
			};
			const modal: ModalSettings = {
				type: 'component',
				component: modalComponent,
				backdropClasses:
					'bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 lg:dark:from-transparent lg:darkto-transparent lg:from-transparent lg:to-transparent'
			};
			modalStore.trigger(modal);
		}
	}

	//function to open the comment section
	function handleRepostClick(): void {
		// Error-Message if the user is not logged in
		if (!$isLoggedIn) {
			goto('/login?redirect=1');
		} else {
			const modalComponent: ModalComponent = {
				ref: RepostComponent,
				props: { post: post }
			};
			const modal: ModalSettings = {
				type: 'component',
				component: modalComponent,
				backdropClasses:
					'bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 lg:dark:from-transparent lg:darkto-transparent lg:from-transparent lg:to-transparent'
			};
			modalStore.trigger(modal);
		}
	}
</script>

<footer>
	<div class="flex flex-row items-center space-x-4">
		<!--Like-button-->
		<div class="flex flex-col items-center">
			<button on:click={toggleLike} class="focus:outline-none">
				<!--Red Heart if the post is liked-->
				<Icon
					src={Heart}
					class={'h-8 md:h-10 font-bold' +
						(post.liked
							? ' fill-red-500 stroke-none hover:fill-red-700'
							: ' fill-none stroke-black dark:stroke-white hover:stroke-gray-400 dark:hover:stroke-gray-400')}
				/>
			</button>
			<small class="text-xs md:text-sm">{post.likes}</small>
		</div>
		<!--Comment-button-->

		<div class="flex flex-col items-center">
			<button on:click={handleCommentClick} class="focus:outline-none">
				<Icon src={ChatBubbleLeft} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
			</button>
			<small class="text-xs md:text-sm">{post.comments}</small>
		</div>
		{#if !post.repost}
			<div class="flex flex-col items-center">
				<button on:click={handleRepostClick} class="focus:outline-none">
					<Icon src={ArrowPathRoundedSquare} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
				</button>
				<small class="text-xs md:text-sm">Repost</small>
			</div>
		{/if}
	</div>
</footer>
