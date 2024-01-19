<script lang="ts">
	import { ProfileHeader } from '$components';
	import { ErrorAlert } from '$components';
	import type { Error, ErrorResponse, UserInfo, UserInfoResponse } from '$domains';
	import { ProfilePosts } from '$components';

	export let data: UserInfoResponse | ErrorResponse;

	$: user = data.error ? null : (data.data as UserInfo); //type: UserInfo | null
	$: error = data.error ? (data.data as Error) : null; //type : Error | null
</script>

{#if user}
	<ProfileHeader bind:user />
	<ProfilePosts bind:user></ProfilePosts>
{:else if error}
	<ErrorAlert message={error.message} />
{/if}
