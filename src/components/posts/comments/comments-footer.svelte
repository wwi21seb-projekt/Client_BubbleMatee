<!--Footer of the comment section containing an input bar for comments-->
<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PaperAirplane, Trash } from '@steeze-ui/heroicons';
	let newComment: string = '';
	//post of a comment
	const postComment = () => {
		newComment = '';

		//TODO: implement
	};
	const deleteComment = () => {
		newComment = '';
	};
</script>

<!--Footer containing a delete button, a text-area and a post button-->
<div class="bg-transparent rounded-lg flex items-center border-2 px-2">
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
