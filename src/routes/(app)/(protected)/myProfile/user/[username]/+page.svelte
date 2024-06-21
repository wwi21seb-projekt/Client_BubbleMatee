<script lang="ts">
	import { ProfileView } from '$components';
	import type { UserDataWithPosts } from '$domains';
	import { onMount } from 'svelte';

	export let data: UserDataWithPosts;

	let main: HTMLElement;

	onMount(() => {
		// initial scroll into view
		main.scrollIntoView();
	});

	$: {
		if (data && main) {
			// check if data has changed
			main.scrollIntoView();
		}
	}
</script>

<main bind:this={main}>
	<ProfileView userData={data.userData} loadedPostData={data.postData} />
</main>
