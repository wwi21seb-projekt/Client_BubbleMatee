<script lang="ts">
	import { ProfileView } from '$components';
	import type { UserDataWithPosts } from '$domains';

	export let data: UserDataWithPosts;
</script>

<ProfileView userData={data.userData} loadedPostData={data.postData} />
