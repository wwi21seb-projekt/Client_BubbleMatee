<script lang="ts">
	import { ProfileHeader } from '$components';
	import { ErrorAlert } from '$components';
	import type { Error, UserInfo } from '$domains';

	export let data;
	let user: UserInfo | null = data.error ? null : data.data;
	let error: Error | null = data.error ? data.data : null;
	console.log(user);
	console.log(error);
</script>

{#if user}
	<ProfileHeader {user} />
	<hr class="border-t-2 m-4" />
{:else if error}
	<ErrorAlert message={error.message} />
{/if}
