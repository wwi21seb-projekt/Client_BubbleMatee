<script lang="ts">
	import { ProfileHeader } from '$components';
	import type { UserInfo } from '$domains';

	export let user: UserInfo;
	export let name: string;
</script>

<ProfileHeader {user} {name} />
<hr class="border-t-2 m-4" />
