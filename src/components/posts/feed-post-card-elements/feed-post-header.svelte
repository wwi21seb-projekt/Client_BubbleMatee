<!--Header component for a post. Containing the userinformation and a date.-->
<script lang="ts">
	import type { Author, Post } from '$domains';
	import { calculatePassedTime } from '$utils';
	import { PostMenu, UserComponent } from '$components';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { EllipsisVertical } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { currentUsername } from '$stores';

	export let date: Date;
	export let author: Author;
	export let deletePost: () => void;
	export let post: Post;
	export let isRepost: boolean;

	//calculate the time that has passend since the post in weeks/ days/ hours or minutes
	let dateString: string = calculatePassedTime(date);
	//if the post belongs to the active user, he has the option to delete it
	let isOwnUser: boolean = author.username === $currentUsername;
	let canNavigate: boolean =
		$page.params.username === author.username || ($page.url.pathname === '/myProfile' && !isRepost);
	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick-' + post.postId,
		placement: 'left'
	};
</script>

<div class="flex items-center justify-between">
	<!--Element shows the profile picture, username, nickname and the time that has passed since the post-->
	<button
		class={`${canNavigate ? '' : 'hover:text-gray-400'}`}
		on:click={() => {
			const currentPath = $page.url.pathname.split('/')[1];
			goto(`/${currentPath}/user/${author.username}`);
		}}
		disabled={canNavigate}
	>
		<UserComponent {author} />
	</button>
	<!--Show time that has passed since the post-->
	<div class="flex flex-row text-right h-full">
		<small class="text-sm md:text-base flex items-center">
			{'vor ' + dateString}
		</small>
		<!--If the post belongs to the active user, a context-menu is shown-->
		<div class={`w-2 ${isOwnUser && !isRepost ? '' : 'hidden'}`}></div>
		<button
			class={`focus:outline-none ${isOwnUser && !isRepost ? '' : 'hidden'}`}
			use:popup={popupClick}
		>
			<Icon src={EllipsisVertical} class="h-6 md:h-8 hover:stroke-gray-400" />
		</button>
	</div>
</div>

<!--Options-Popup -> All the options a user has to change or delete his own post (for the moment he con only delete it)-->
<div class="w-1/2 sm:w-1/3 md:w-1/4" data-popup="popupClick-{post.postId}">
	<PostMenu {deletePost} />
</div>
