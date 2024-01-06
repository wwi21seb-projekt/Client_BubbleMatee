<!--Post-Footer containing buttons for liking an commenting-->

<script lang="ts">
	//TODO: Datenanbindung der Komponente -> wenn der Endpunkt definiert wurde
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Heart, ChatBubbleLeft } from '@steeze-ui/heroicons';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	import { Comments } from '$components';
	import { isLoggedIn } from '$stores';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let isLiked: boolean = false;
	let numberOfLikes: number = 42; // Beispielanzahl der Likes

	//funktion to toggle the like of the post
	function toggleLike(): void {
		// Error-Message if the user is not logged in
		if (!$isLoggedIn) {
			const t: ToastSettings = {
				message: 'Melde dich an, um diese Funktion zu nutzen',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
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
			const t: ToastSettings = {
				message: 'Melde dich an, um diese Funktion zu nutzen',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		} else {
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
				backdropClasses:
					'lg:!bg-gradient-to-br lg:from-transparent lg:to-transparent !bg-gradient-to-br from-tertiary-900 to-secondary-900'
			};
			modalStore.trigger(modal);
		}
	}
</script>

<div class="flex flex-row items-center space-x-4">
	<div class="flex flex-col items-center">
		<button on:click={toggleLike} class="focus:outline-none">
			<!--Red Heart if the post is liked-->
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
<div class="w-[100vw] h-[100vh] absolute hidden"></div>
