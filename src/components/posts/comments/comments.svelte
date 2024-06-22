<!--Modal component for the comment section-->
<script lang="ts">
	//TODO: Datenanbindung wenn der Endpunkt definiert ist
	import {
		ModalHeader,
		CommentElement,
		CommentsFooter,
		LoadMoreComponent,
		NothingFoundComponent,
		ErrorAlert
	} from '$components';
	import type { CommentData } from '$domains';
	export let loadMoreComments: () => Promise<CommentData>;
	export let commentData: CommentData;
	export let commentPost: (content: string) => Promise<CommentData>;
	async function load() {
		commentData = await loadMoreComments();
	}

	async function commentPostAndUpdate(content: string) {
		commentData = await commentPost(content);
	}
</script>

<!--Contains a header the main comment part, a list with all comments and a footer with a textarea to write comments-->
<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full lg:h-[calc(75vh)] lg:ml-14 lg:w-[75vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<header>
		<ModalHeader title="Kommentare" />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<div class="overflow-y-auto overflow-x-hidden h-full pr-1 w-full">
		{#if commentData.isError}
			<ErrorAlert message={commentData.errorText}></ErrorAlert>
		{:else if commentData.comments.length > 0}
			{#each commentData.comments as comment}
				<CommentElement {comment} id={`comment-${comment.commentId}`} />
			{/each}
			{#if commentData.overallRecords > commentData.comments.length}
				<div class="ml-12 md:ml-14 mr-2 mt-2">
					<LoadMoreComponent loadMore={load} />
				</div>
			{/if}
		{:else}
			<div class="flex justify-center mx-4">
				<NothingFoundComponent
					message={'Keine Kommentare zu diesem Post gefunden'}
					submessage={'Sei der erste, der diesen Post kommentiert!'}
				/>
			</div>
		{/if}
	</div>
	<footer>
		<CommentsFooter commentPost={commentPostAndUpdate} />
	</footer>
</div>
