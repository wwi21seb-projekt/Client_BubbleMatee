<!--Footer of the comment section containing an input bar for comments-->
<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PaperAirplane, Trash } from '@steeze-ui/heroicons';
	let newComment = '';
	//post of a comment
	const postComment = () => {
		newComment = '';

		//TODO: implement
	};
	const deleteComment = () => {
		newComment = '';
	};
</script>

<div class="bg-transparent rounded-lg flex items-center border-2 px-2">
	<button
		on:click={deleteComment}
		class="bg-transparent border-none m-0 p-0 cursor-pointer outline-none"
	>
		<Icon src={Trash} class="w-6 md:w-8 font-bold hover:stroke-gray-400" />
	</button>
	<span class="divider-vertical h-100 mr-2 ml-2" />
	<div class="flex-1">
		<textarea
			bind:value={newComment}
			class="w-full border-none focus:outline-none bg-transparent flex items-center"
			placeholder="Kommentar"
			rows={newComment == '' ? 1 : 2}
		/>
	</div>
	<span class="divider-vertical h-100 mr-2 ml-2" />
	<button
		on:click={postComment}
		class="bg-transparent border-none m-0 p-0 cursor-pointer outline-none"
	>
		<Icon src={PaperAirplane} class="w-6 md:w-8 font-bold hover:stroke-gray-400" />
	</button>
</div>
