<!--Modal component for the comment section-->
<script lang="ts">
	import { ModalHeader, PostButton, Textarea, FileInput } from '$components';
	import type { Post } from '$domains';
	import FeedPostCard from './feed-post-card.svelte';
	export let post: Post;
	import { postText } from '$stores';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	const leave = () => {
		modalStore.close();
	};

	$postText = '';
</script>

<!--Contains a header the main comment part, a list with all comments and a footer with a textarea to write comments-->
<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full lg:h-[calc(75vh)] lg:ml-14 lg:w-[75vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<header>
		<ModalHeader title="Post teilen" {leave} />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<div class="overflow-y-auto overflow-x-hidden h-full pr-1 w-full">
		<div class="w-full justify-center items-center flex">
			<div class="w-[31.25rem]">
				<FeedPostCard
					deletePost={null}
					{post}
					isRepost={true}
					likePost={null}
					postComment={null}
					loadMoreComments={null}
					unlikePost={null}
				/>
			</div>
		</div>
		<hr class="mt-2 mb-2" />
		<FileInput />
		<Textarea />
		<div class="flex justify-center w-full">
			<div class="flex justify-center w-full max-w-[31.25rem]">
				<PostButton isRepost={true} {post} />
			</div>
		</div>
	</div>
</div>
