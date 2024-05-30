<script lang="ts">
	import { ProfileView } from '$components';
	import type {
		ErrorObject,
		ErrorResponse,
		PostData,
		UserDataWithPosts,
		UserInfoResponse
	} from '$domains';

	export let data: UserDataWithPosts;
	let userData: UserInfoResponse | ErrorResponse = data.userData;
	let loadedPostData: ErrorObject | PostData = data.postData;
</script>

<ProfileView {userData} {loadedPostData} />
