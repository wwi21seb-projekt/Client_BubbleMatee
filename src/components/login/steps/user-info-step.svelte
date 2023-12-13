<script lang="ts">
	import { EmailInput, NicknameInput, UsernameInput } from '$components';
	import { isValidEmail, isValidUsername } from '$utils';
	import { Step } from '@skeletonlabs/skeleton';

	export let email: string = '';
	export let username: string = '';
	export let nickname: string;

	$: steplocked = !isValidEmail(email) || !isValidUsername(username);
</script>

<Step buttonBack="invisible" locked={steplocked}>
	<svelte:fragment slot="header">
		<h1
			class="h1 text-xl text-center font-bold leading-tight tracking-tight md:text-2xl dark:text-white"
		>
			Nutzerdaten
		</h1>
		<hr class="w-16 h-1 bg-primary-500 rounded-full flex justify-center mt-2" />
	</svelte:fragment>
	<section>
		<form class="m-4 grid justify-items-strech max-w-xs gap-4 h-60 w-56 md:w-72">
			<EmailInput bind:email isSignUp={true} />
			<UsernameInput bind:username isSignUp={true} />
			<NicknameInput bind:nickname />
		</form>
	</section>
</Step>
