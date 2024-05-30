<script lang="ts">
	import { PaperAirplane } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { subscribe, sendMessage, storeMessage } from '$stores';
	import { getCurrentUser } from '$utils';
	export let username: string;

	let currentMessage: string;

	function onSendMessage(): void {
		if (currentMessage && currentMessage.length > 0) {
			storeMessage({
				content: currentMessage,
				username: username,
				creationDate: new Date().toISOString()
			});
			sendMessage(currentMessage);
		}
	}
</script>

<section class="border-t border-surface-500/30 p-4">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
		<button class="input-group-shim">+</button>
		<textarea
			bind:value={currentMessage}
			class="bg-transparent border-0 ring-0"
			name="prompt"
			id="prompt"
			placeholder="Write a message..."
			rows="1"
		></textarea>
		<button
			class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'}
			on:click={onSendMessage}
		>
			<Icon src={PaperAirplane} class="h-8 md:h-10 font-bold hover:stroke-gray-400" />
		</button>
	</div>
</section>
