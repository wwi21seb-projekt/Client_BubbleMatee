<!--Modal component for the comment section-->
<script lang="ts">
	//TODO: Datenanbindung wenn der Endpunkt definiert ist
	import { CommentsHeader, CommentElement, CommentsFooter } from '$components';
	export let comments: Array<string>;
	export let parent;
	console.log(parent);
</script>

<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br from-tertiary-900 to-secondary-900 w-full lg:h-[calc(75vh)] lg:ml-14 lg:w-[75vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<header>
		<CommentsHeader />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<div class="overflow-y-auto overflow-x-hidden h-full">
		{#each comments as comment, index}
			<CommentElement {comment} id={`comment-${index}`} />
			<hr class="opacity-50 mt-2 mb-2" />
		{/each}
		{#each comments as comment, index}
			<CommentElement {comment} id={`comment-${index}`} />
			<hr class="opacity-50 mt-2 mb-2" />
		{/each}
	</div>
	<footer>
		<CommentsFooter />
	</footer>
</div>
