<script lang="ts">
	import { ProfileHeader } from '$components';
	import { ErrorAlert } from '$components';
	import type { ErrorObject, ErrorResponse, UserInfo, UserInfoResponse } from '$domains';
	import { ProfilePosts } from '$components';
	import { getErrorMessage } from '$utils';
	import { onMount } from 'svelte';

	export let data: UserInfoResponse | ErrorResponse;

	$: user = data.error ? null : (data.data as UserInfo);
	$: error = data.error ? (data.data as ErrorObject) : null;

	let errorMessage: string = '';
	onMount(() => {
		errorMessage = error ? getErrorMessage(error.error.code, true) : '';
	});
</script>

{#if user}
	<ProfileHeader bind:user />
	<ProfilePosts bind:user></ProfilePosts>
{:else if error}
	<main class="p-4 h-full grid grid-cols-1 place-content-center justify-items-center">
		<ErrorAlert message={errorMessage} />
	</main>
{/if}
