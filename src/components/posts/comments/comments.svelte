<!--Modal component for the comment section-->
<script lang="ts">
	//TODO: Datenanbindung wenn der Endpunkt definiert ist
	import { CommentsHeader, CommentElement, CommentsFooter } from '$components';
	export let comments: Array<string>;
</script>

<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full lg:h-[calc(75vh)] lg:ml-14 lg:w-[75vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<header>
		<CommentsHeader />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<div class="overflow-y-auto overflow-x-hidden h-full pr-1 w-full">
		{#each comments as comment, index}
			<CommentElement {comment} id={`comment-${index}`} />
			<hr class="opacity-50 mt-2 mb-2" />
		{/each}
	</div>
	<footer>
		<CommentsFooter />
	</footer>
</div>
