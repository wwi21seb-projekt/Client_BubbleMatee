<script lang="ts">
	import { ErrorAlert } from '$components';
	import type { ChatMessage } from '$domains';
	import { Person } from '$images';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let username: string;
	export let chatMessages: Array<ChatMessage>;
</script>

<section class="p-4 overflow-y-auto space-y-4">
	{#if chatMessages}
		{#each chatMessages as chat}
			{#if chat.username === username}
				<!-- Needs to be changed after proper API integration -->
				<div class="grid grid-cols-[1fr_auto] gap-2">
					<div class="card p-4 rounded-tr-none space-y-2 bg-primary-700 dark:bg-primary-700">
						<header class="flex justify-between items-center">
							<p class="font-bold">{chat.username}</p>
							<small class="opacity-50">{chat.creationDate}</small>
						</header>
						<p>{chat.content}</p>
					</div>
					<Avatar src={Person} height="auto" />
				</div>
			{:else}
				<div class="grid grid-cols-[auto_1fr] gap-2">
					<Avatar src={Person} height="auto" />
					<div class="card p-4 variant-soft rounded-tl-none space-y-2">
						<header class="flex justify-between items-center">
							<p class="font-bold">{chat.username}</p>
							<small class="opacity-50">{chat.creationDate}</small>
						</header>
						<p>{chat.content}</p>
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</section>
