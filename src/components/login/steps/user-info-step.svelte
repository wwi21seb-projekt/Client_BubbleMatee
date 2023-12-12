<script lang="ts">
	import { EmailInput, NicknameInput, UsernameInput } from '$components';
	import { Step } from '@skeletonlabs/skeleton';

	export let email: string;
	export let username: string;
	export let nickname: string;
</script>

<Step buttonBack="invisible">
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Nutzerdaten
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<form class="m-4 grid justify-items-strech max-w-xs gap-4">
			<EmailInput bind:email />
			<UsernameInput bind:username />
			<NicknameInput bind:nickname />
		</form>
	</section>
</Step>
