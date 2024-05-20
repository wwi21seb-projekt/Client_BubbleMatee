<!--Modal component for the comment section-->
<script lang="ts">
	//TODO: Datenanbindung wenn der Endpunkt definiert ist
	import { ModalHeader, PostButton, Textarea } from '$components';
	import type { Post } from '$domains';
	import FeedPostCard from './feed-post-card.svelte';
	export let post: Post;
</script>

<!--Contains a header the main comment part, a list with all comments and a footer with a textarea to write comments-->
<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full lg:h-[calc(60vh)] lg:ml-14 lg:w-[50vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<header>
		<ModalHeader title="Post teilen" />
	</header>
	<div class="content">
		<Textarea maxChars={128} />
	</div>
	<hr class="mt-2 mb-2" />
	<div class="flex justify-center">
		<div class="container">
			<FeedPostCard deletePost={() => {}} {post} isRepost={true} />
		</div>
	</div>
	<footer>
		<div class="flex justify-center">
			<PostButton isRepost={true} {post} />
		</div>
	</footer>
</div>

<style>
	/* Styling for the main container */
	.container {
		width: 31.25rem;
	}
</style>
