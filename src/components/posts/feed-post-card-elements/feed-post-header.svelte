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
	let cantNavigate: boolean =
		$page.params.username === author.username ||
		($page.url.pathname === '/myProfile' && !isRepost) ||
		post.author.username === $currentUsername;
	const popupClick: PopupSettings = {
		event: 'click',
		target: `popupClick-${post.postId}`,
		placement: 'left'
	};

	const onNavigationClick: () => void = () => {
		const currentPath: string = $page.url.pathname.split('/')[1];
		goto(`/${currentPath}/user/${author.username}`);
	};
</script>

<header class="mb-2">
	<div class="flex items-center justify-between gap-2">
		<!--Element shows the profile picture, username, nickname and the time that has passed since the post-->
		<button
			class={`${cantNavigate ? 'max-w-[70%]' : 'hover:text-gray-400 max-w-[70%]'}`}
			on:click={onNavigationClick}
			disabled={cantNavigate}
		>
			<UserComponent {author} />
		</button>
		<!--Show time that has passed since the post-->
		<div class="flex flex-row text-right h-full items-center max-w-[30%]">
			<small class="text-sm md:text-base max-w-full break-words flex-shrink">
				{'vor ' + dateString}
			</small>
			<!--If the post belongs to the active user, a context-menu is shown-->
			<div class={`w-2 ${isOwnUser && !isRepost ? '' : 'hidden'}`}></div>
			<button
				class={`focus:outline-none flex-shrink-0 ${isOwnUser && !isRepost ? '' : 'hidden'}`}
				use:popup={popupClick}
			>
				<Icon
					src={EllipsisVertical}
					class="h-6 md:h-8 hover:stroke-gray-400 text-sm md:text-base"
				/>
			</button>
		</div>
	</div>
</header>

<!--Options-Popup -> All the options a user has to change or delete his own post (for the moment he con only delete it)-->
<div class="w-1/2 sm:w-1/3 md:w-1/4" data-popup="popupClick-{post.postId}">
	<PostMenu {deletePost} />
</div>
