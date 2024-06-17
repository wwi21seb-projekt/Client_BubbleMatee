<script lang="ts">
	import { Feed } from '$components';
	import type { PostData } from '$domains';
	import { currentUsername } from '$stores';
	export let postData: PostData;
	export let username: string;
	export let loadMorePosts: () => Promise<void>;
	export let notifyDeletedPost: () => void;
	let isOwnUser = $currentUsername === username;
</script>

<Feed
	{postData}
	{loadMorePosts}
	{notifyDeletedPost}
	nothingFoundMessage={'Keine Posts gefunden'}
	nothingFoundSubMessage={isOwnUser
		? "Verfasse deinen ersten Post im 'Posten'-Tab!"
		: `${username} hat noch nichts gepostet`}
></Feed>
