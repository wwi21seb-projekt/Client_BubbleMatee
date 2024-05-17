<!--Footer of the comment section containing an input bar for comments-->
<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PaperAirplane, Trash } from '@steeze-ui/heroicons';
	import { UserComponent } from '$components';
	import type { Author } from '$domains';
	import { loadSearchedUser } from '$utils';
	export let commentPost: (content: string) => void;

	let newComment: string = '';
	//post of a comment
	const postComment = () => {
		commentPost(newComment);
		newComment = '';

		//TODO: implement
	};
	const deleteComment = () => {
		newComment = '';
	};
	let authors = new Array<Author>();
	async function loadUsers(search: string) {
		const response = await loadSearchedUser(search, 0, '5');
		let userSearch = response.data.records.map((record: Author) => ({
			nickname: record.nickname,
			profilePictureUrl: record.profilePictureUrl,
			username: record.username
		}));
		authors = userSearch;
	}
	function handleInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		const value = target.value;
		if (value.includes('@')) {
			const lastAtIndex = value.lastIndexOf('@');
			const afterAt = value.substring(lastAtIndex);
			console.log(afterAt);
			if (!afterAt.includes(' ')) {
				loadUsers(afterAt);
			} else {
				authors = new Array<Author>();
			}
		}
	}
</script>

<!--Footer containing a delete button, a text-area and a post button-->
<div class="bg-transparent rounded-lg border-2 px-2">
	{#if newComment.includes('@') && !newComment.substring(newComment.lastIndexOf('@')).includes(' ')}
		<div class="w-full bg-transparent text-xl">
			{#each authors as author}
				<div class="w-full md:px-12 px-10">
					<button
						class="w-full my-2hover:bg-gradient-to-br hover:dark:to-tertiary-500 hover:to-primary-400 card bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 rounded-xl"
						on:click={() => {
							const lastAtIndex = newComment.lastIndexOf('@');
							newComment = newComment.substring(0, lastAtIndex + 1) + author.username + ' ';
							console.log(author);
						}}
					>
						<UserComponent {author} />
					</button>
				</div>
			{/each}
		</div>
	{/if}
	<div class="bg-transparent rounded-lg flex items-center">
		<!--Delete button - is only shown when the user types a comment-->
		<button
			on:click={deleteComment}
			class={`bg-transparent border-none m-0 p-0 cursor-pointer outline-none ${
				newComment == '' ? 'invisible' : 'visible'
			}`}
		>
			<Icon src={Trash} class="w-6 md:w-8 font-bold hover:stroke-gray-400" />
		</button>
		<span class="divider-vertical h-100 mr-2 ml-2" />
		<!--Text Area - is higher when the user types a comment-->

		<div class="flex-1">
			<textarea
				bind:value={newComment}
				on:input={handleInput}
				class="w-full border-none focus:outline-none bg-transparent flex items-center text-xl md:text-2xl"
				placeholder="Kommentar"
				rows={newComment == '' ? 1 : 2}
			/>
		</div>
		<span class="divider-vertical h-100 mr-2 ml-2" />
		<!--Post button - is gray, when the user has not yet typed a comment-->
		<button
			on:click={postComment}
			class="bg-transparent border-none m-0 p-0 cursor-pointer outline-none"
		>
			<Icon
				src={PaperAirplane}
				class={`w-6 md:w-8 font-bold ${
					newComment == ''
						? 'stroke-gray-400'
						: 'stroke-black dark:stroke-white dark:hover:stroke-gray-400 hover:stroke-gray-400'
				} `}
			/>
		</button>
	</div>
</div>
