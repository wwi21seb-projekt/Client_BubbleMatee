<!--Header component for a post. Containing the userinformation and a date.-->
<script lang="ts">
	import type { Author } from '$domains';
	import { calculatePassedTime } from '$utils';
	import { UserComponent } from '$components';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { EllipsisVertical, Trash, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		popup,
		type ModalSettings,
		type PopupSettings,
		getModalStore
	} from '@skeletonlabs/skeleton';
	import { currentUsername } from '$stores';

	export let date: Date;
	export let author: Author;
	export let deletePost: () => void;
	const modalStore = getModalStore();

	//calculate the time that has passend since the post in weeks/ days/ hours or minutes
	let dateString: string = calculatePassedTime(date);
	//if the post belongs to the active user, he has the option to delete it
	let isOwnUser: boolean =
		$page.params.username === $currentUsername || $page.url.pathname === '/myProfile';

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'left'
	};

	// function to handle a delete request. the user has to condirm, that he is sure. Then the passed function is called.
	function handleDelete(): void {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Beitrag löschen?',
			body: 'Bist du sicher, dass du den Beitrag löschen möchtest?',
			buttonTextConfirm: 'Löschen',
			buttonTextCancel: 'Abbrechen',
			// If confirmed -> delete Post
			response: (r: boolean) => {
				if (r) {
					deletePost();
				}
			}
		};
		modalStore.trigger(modal);
	}
</script>

<div class="flex items-center justify-between">
	<!--Element shows the profile picture, username, nickname and the time that has passed since the post-->
	<button
		on:click={() => {
			const currenPath = $page.url.pathname.split('/')[1];
			goto(`/${currenPath}/user/${author.username}`);
		}}
	>
		<UserComponent {author} />
	</button>
	<!--Show time that has passed since the post-->
	<div class="flex flex-row text-right h-full">
		<small class="text-sm md:text-base flex items-center">
			{'vor ' + dateString}
		</small>
		<!--If the post belongs to the active user, a context-menu is shown-->
		<div class={`w-2 ${isOwnUser ? '' : 'hidden'}`}></div>
		<button class={`focus:outline-none ${isOwnUser ? '' : 'hidden'}`} use:popup={popupClick}>
			<Icon src={EllipsisVertical} class="h-6 md:h-8 hover:stroke-gray-400" />
		</button>
	</div>
</div>

<!--Options-Popup -> All the options a user has to change or delete his own post (for the moment he con only delete it)-->
<div class="w-1/2 sm:w-1/3 md:w-1/4" data-popup="popupClick">
	<div class="dark:bg-surface-900 bg-surface-200 p-2">
		<!--title -->
		<h3 class="m-2 font-bold text-2xl md:text-3xl w-full text-center">Optionen</h3>
		<hr class="!border-t-8 !border-double" />
		<!--delete Button -->
		<button
			class="grid grid-cols-3 gap-2 w-full z-10 my-2 text-error-500 hover:text-error-700 text-xl md:text-2xl font-semibold"
			on:click={handleDelete}
		>
			<div class="col-span-1 flex justify-center items-center">
				<Icon src={Trash} class="h-6 md:h-8 w-min" />
			</div>

			<span class="col-span-1 mx-2 flex justify-center items-center">Löschen</span>

			<div class="col-span-1 flex justify-center items-center">
				<Icon src={Trash} class="h-6 md:h-8 w-min" />
			</div>
		</button>
		<hr class="w-full border-t-2 m-1" />
		<!--cancel Button -->
		<button class="grid grid-cols-3 gap-2 w-full my-2 md:text-2xl hover:text-gray-500">
			<div class="col-span-1 flex justify-center items-center">
				<Icon src={XMark} class="h-6 md:h-8 w-min" />
			</div>

			<span class="col-span-1 mx-2 flex justify-center items-center">Abbrechen</span>

			<div class="col-span-1 flex justify-center items-center">
				<Icon src={XMark} class="h-6 md:h-8 w-min" />
			</div>
		</button>
	</div>
	<div class="arrow dark:bg-surface-900 bg-surface-200 p-2" />
</div>
