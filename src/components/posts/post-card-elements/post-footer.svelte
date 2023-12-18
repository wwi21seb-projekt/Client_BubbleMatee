<!--Post-Footer containing buttons for liking an commenting-->

<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Heart, ChatBubbleLeft } from '@steeze-ui/heroicons';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { Comments } from '$components';
	const modalStore = getModalStore();

	let isLiked = false;
	let numberOfLikes = 42; // Beispielanzahl der Likes

	//funktion to toggle the like of the post
	const toggleLike = () => {
		isLiked = !isLiked;
		if (isLiked) {
			numberOfLikes++;
		} else {
			numberOfLikes--;
		}
	};

	//function to open the comment section
	const handleCommentClick = () => {
		//temporär zum testen
		const comments = [
			'barsjdgasdjgkjas barsjdgasdjgkjas barsjdgasdjgkjasdlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj',
			'barsjdgasdjgkjas dlkfjaslkdjfkldsajflkasdjflkjasdkfjsal kdjflks adjfksjdlkfjsalk djflksadjflka jdflkjsadlkfjs adlkjflkdsaj'
		];
		const modalComponent: ModalComponent = {
			ref: Comments,
			props: { comments: comments }
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			modalClasses: '!bg-red-500'
		};
		modalStore.trigger(modal);
	};
</script>

<div class="flex flex-row items-center space-x-4">
	<div class="flex flex-col items-center">
		<button on:click={toggleLike} class="focus:outline-none">
			<Icon
				src={Heart}
				class={'h-8 font-bold' +
					(isLiked
						? ' fill-red-500 stroke-none hover:fill-red-700'
						: ' fill-none stroke-white hover:stroke-gray-400')}
			/>
		</button>
		<small class="text-xs">{numberOfLikes}</small>
	</div>
	<div class="flex flex-col items-center">
		<button on:click={handleCommentClick} class="focus:outline-none">
			<Icon src={ChatBubbleLeft} class="h-8 font-bold hover:stroke-gray-400" />
		</button>
		<small class="text-xs">10. Mio</small>
	</div>
</div>
