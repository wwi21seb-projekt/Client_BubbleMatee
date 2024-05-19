<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowLeft } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		console.log('event', event);
		goto('/home');
	}
</script>

<span class="relative">
	<button on:click={handleClick} class="ml-2 absolute left-0 inset-y-0">
		<Icon
			src={ArrowLeft}
			class="h1 h-8 md:h-10 font-bold stroke-primary-900 dark:stroke-primary-500 z-100"
		/>
	</button>
	<h1
		class="h1 bg-gradient-to-br from-primary-900 to-primary-600 dark:from-primary-500 dark:to-primary-200 bg-clip-text text-transparent box-decoration-clone z-0"
	>
		NOTIFICATIONS
	</h1>
</span>
<!-- Separator Line -->
<hr class="!border-t-8 !border-double" />

<!-- <div class="relative">
	<div
		class="absolute inset-0
                    bg-gray-800 opacity-50
                    z-10"
	></div>

	<div
		class="absolute inset-0 flex
                    items-center justify-center
                    text-white z-20"
	>
		<div
			class="bg-gray-800 p-8
                        rounded-lg shadow-lg"
		>
			<h1 class="text-3xl font-bold mb-4">Welcome to Our Website</h1>
			<p class="text-lg">Thanks for visiting! This is the overlay content.</p>
		</div>
	</div>
</div> -->

<style>
	/* :root {
		--default-margin: 2rem;
		--icon-size: 2.188rem;
	} */

	.h1 {
		text-align: center;
		margin: var(--default-margin) auto;
		transition: transform 0.3s ease-in-out;
	}

	.h1:hover {
		transform: scale(1.1);
	}
</style>
