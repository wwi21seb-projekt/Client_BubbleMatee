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
	import type { PostWithRepost } from '$domains';

	export let post: PostWithRepost;

	const modalStore = getModalStore();

	let isLiked: boolean = false;
	let numberOfLikes: number = 42; // Beispielanzahl der Likes

	//funktion to toggle the like of the post
	function toggleLike(): void {
		// Error-Message if the user is not logged in
		if (!$isLoggedIn) {
			goto('/login?redirect=1');
		} else {
			isLiked = !isLiked;
			if (isLiked) {
				numberOfLikes++;
			} else {
				numberOfLikes--;
			}
		}
	}

	//function to open the comment section
	function handleCommentClick(): void {
		// Error-Message if the user is not logged in
		if (!$isLoggedIn) {
			goto('/login?redirect=1');
		} else {
			//temporär zum testen
			const comments = [
				'barsjdgasdjgkjasbarsjdgasdjgkjasbarsjdgasdjgkjasdlkfjaslkdjfkldsajflkasdjflkjasdkfjsalkdjflksadjfksjdlkfjsalkdjflksadjflkajdflkjsadlkfjs adlkjflkdsaj barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj',
				'barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj',
				'barsjdgasdjgkjasbarsjdgasdjgkjasbarsjdgasdjgkjasdlkfjaslkdjfkldsajflkasdjflkjasdkfjsalkdjflksadjfksjdlkfjsalkdjflksadjflkajdflkjsadlkfjs adlkjflkdsaj barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj',
				'barsjdgasdjgkjasbarsjdgasdjgkjasbarsjdgasdjgkjasdlkfjaslkdjfkldsajflkasdjflkjasdkfjsalkdjflksadjfksjdlkfjsalkdjflksadjflkajdflkjsadlkfjs adlkjflkdsaj barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj'
			];
			const modalComponent: ModalComponent = {
				ref: Comments,
				props: { comments: comments }
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

<div class="flex flex-row items-center space-x-4">
	<!--Like-button-->
	<div class="flex flex-col items-center">
		<button on:click={toggleLike} class="focus:outline-none">
			<!--Red Heart if the post is liked-->
			<Icon
				src={Heart}
				class={'h-8 md:h-10 font-bold' +
					(isLiked
						? ' fill-red-500 stroke-none hover:fill-red-700'
						: ' fill-none stroke-black dark:stroke-white hover:stroke-gray-400 dark:hover:stroke-gray-400')}
			/>
		</button>
		<small class="text-xs md:text-sm">{numberOfLikes}</small>
	</div>
	<!--Comment-button-->

	<div class="flex flex-col items-center">
		<button on:click={handleCommentClick} class="focus:outline-none">
			<Icon src={ChatBubbleLeft} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
		</button>
		<small class="text-xs md:text-sm">10. Mio</small>
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
