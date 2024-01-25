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

	let errorMessage: string;
	onMount(() => {
		errorMessage = error ? getErrorMessage(error.error.code) : '';
	});
</script>

{#if user}
	<ProfileHeader bind:user />
	<ProfilePosts bind:user></ProfilePosts>
{:else if error}
	<ErrorAlert message={errorMessage} />
{/if}
