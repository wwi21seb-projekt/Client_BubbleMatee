<script lang="ts">
	import { ProfileView } from '$components';
	import type { UserDataWithPosts } from '$domains';

	export let data: UserDataWithPosts;
	$: userData = data.userData;
	$: loadedPostData = data.postData;
</script>

<ProfileView {userData} {loadedPostData} />
