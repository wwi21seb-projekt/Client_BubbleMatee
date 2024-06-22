<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Author } from '$domains';
	import { Person } from '$images';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { ChevronLeft } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let chatPartner: Author;
</script>

<div
	class="flex items-center bg-surface-50 dark:bg-surface-900 w-full border-b border-surface-500/30"
>
	<button
		class="lg:hidden h-12 btn"
		on:click={() => {
			goto('/home/chats');
		}}
	>
		<Icon src={ChevronLeft} />
	</button>
	<button
		class="flex items-center hover:bg-surface-100 dark:hover:bg-surface-800"
		on:click={() => {
			goto(`/home/user/${chatPartner.username}`);
		}}
	>
		<Avatar
			class="m-2"
			src={chatPartner.picture && chatPartner.picture.url ? chatPartner.picture.url : Person}
			height="auto"
		/>
		<h3 class="flex-1 text-start font-bold ml-2 text-xl md:text-2xl">{chatPartner.username}</h3>
	</button>
</div>
