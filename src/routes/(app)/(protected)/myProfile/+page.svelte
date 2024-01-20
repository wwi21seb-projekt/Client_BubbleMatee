<script lang="ts">
	import { ProfileView } from '$components';
	import type { ErrorResponse, UserInfoResponse } from '$domains';

	export let data: UserInfoResponse | ErrorResponse;
</script>

<ProfileView {data} />
