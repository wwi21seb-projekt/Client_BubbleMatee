<!--Modal component for the comment section-->
<script lang="ts">
	import { ModalHeader, UserTab } from '$components';
	import { globalConfig } from '$utils';
	import type {
		ErrorResponse,
		SubscriptionListResponse,
		Error,
		SubscriptionList,
		Follower
	} from '$domains';
	import { onMount } from 'svelte';

	export let username: string;
	export let isFollowerlist: boolean;

	const title: string = isFollowerlist ? 'Abonnentenliste' : 'Abonniertenliste';
	const type: string = isFollowerlist ? 'followers' : 'following';

	let users: Array<Follower> = [];
	let lastPage: boolean = false;
	let isError: boolean = false;
	let error: Error;

	onMount(async () => {
		loadMore();
	});

	async function loadMore() {
		const response = await fetch(
			`/api/subscriptions/${username}?type=${type}&offset=${users.length}&limit=${globalConfig.limit}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const body: ErrorResponse | SubscriptionListResponse = await response.json();
		if (body.error) {
			//handle Error
			error = (body as ErrorResponse).data.error;
			isError = true;
		} else {
			const subscriptionData: SubscriptionList = (body as SubscriptionListResponse).data;
			//map the feed-data to a Post-Array with new Posts
			users = users.concat(subscriptionData.records);
			lastPage = users.length >= subscriptionData.pagination.records;
			isError = false;
		}
	}
</script>

<!--Contains a header the main comment part, a list with all comments and a footer with a textarea to write comments-->
<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full lg:h-[calc(75vh)] lg:ml-14 lg:w-[75vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<header>
		<ModalHeader {title} />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<div class="overflow-y-auto overflow-x-hidden h-full pr-1 w-full">
		<UserTab {users} {loadMore} {error} {isError} {lastPage} isFollowerlist={true} />
	</div>
</div>
