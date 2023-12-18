<!--Modal component for the comment section-->
<script lang="ts">
	import { CommentsHeader, CommentElement, CommentsFooter } from '$components';
	export let comments: string[];
</script>

<div
	class="card bg-gradient-to-br from-tertiary-900 to-secondary-900 w-full sm:w-3/4 md:w-full lg:w-3/4 h-[90vh] p-2 rounded-xl overflow-hidden flex flex-col"
>
	<header class="sticky top-0">
		<CommentsHeader />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<div class="overflow-auto h-full">
		{#each comments as comment, index}
			<CommentElement {comment} id={`comment-${index}`} />
			<hr class="opacity-50 mt-2 mb-2" />
		{/each}
	</div>
	<footer>
		<CommentsFooter />
	</footer>
</div>
