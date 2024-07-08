<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserComponent } from '$components';
	import type { Author } from '$domains';
	import { ChevronLeft } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let chatPartner: Author;
</script>

<div
	class="flex items-center justify-items-start bg-surface-50 dark:bg-surface-900 w-full border-b border-surface-500/30"
>
	<button
		class="lg:hidden h-12 btn w-12 p-2"
		on:click={() => {
			goto('/chats');
		}}
	>
		<Icon src={ChevronLeft} />
	</button>
	<button
		class="flex items-center hover:bg-surface-100 dark:hover:bg-surface-800 w-[calc(100%-50px)]"
		on:click={() => {
			goto(`/home/user/${chatPartner.username}`);
		}}
	>
		<div class="p-2">
			<UserComponent author={chatPartner} />
		</div>
	</button>
</div>
