<script lang="ts">
	import { ProfileView } from '$components';
	import type { UserDataWithPosts } from '$domains';
	import { onMount } from 'svelte';

	export let data: UserDataWithPosts;
	$: userData = data.userData;
	$: loadedPostData = data.postData;

	let main: HTMLElement;

	onMount(() => {
		main.scrollIntoView();
	});
</script>

<main bind:this={main}>
	<ProfileView {userData} {loadedPostData} />
</main>
