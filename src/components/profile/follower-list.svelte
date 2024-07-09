<!--Modal component for the comment section-->
<script lang="ts">
	import { ModalHeader, UserTab } from '$components';
	import { getErrorMessage, globalConfig } from '$utils';
	import type {
		ErrorResponse,
		SubscriptionListResponse,
		Error,
		SubscriptionList,
		Follower
	} from '$domains';
	import { onMount } from 'svelte';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { currentUsername } from '$stores';
	import { loading } from '$stores';

	const modalStore = getModalStore();
	const toastStore = getToastStore();
	export let username: string;
	export let isFollowerlist: boolean;

	const title: string = isFollowerlist ? 'Abonnentenliste' : 'Abonniertenliste';
	const type: string = isFollowerlist ? 'followers' : 'following';

	let users: Array<Follower> = [];
	let lastPage: boolean = false;
	let isError: boolean = false;
	let error: Error;
	const leave = () => {
		modalStore.close();
	};
	onMount(async () => {
		loadMore();
	});
	let nothingFoundMessage: string;
	let nothingFoundSubMessage: string;
	let isOwnUser: boolean =
		$page.params.username === $currentUsername || $page.url.pathname === '/myProfile';
	nothingFoundMessage = isFollowerlist ? 'Keine Abonenten gefunden' : 'Keine Abonierten gefunden';
	if (isFollowerlist) {
		nothingFoundSubMessage = isOwnUser
			? 'Du hast noch keine Abonenten!'
			: `${username} hat noch keine Abonenten!`;
	} else {
		nothingFoundSubMessage = isOwnUser
			? 'Suche nach deinen Freunden, um diese zu abonieren!'
			: `Sei der erste, der ${username} folgt!`;
	}

	async function loadMore() {
		$loading = true;
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
			error = (body as ErrorResponse).data.error;
			if (error.code == 'ERR-014') {
				leave();
			}
			isError = true;
			const t = {
				message: getErrorMessage(error.code, false),
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
			leave();
		} else {
			const subscriptionData: SubscriptionList = (body as SubscriptionListResponse).data;
			//map the feed-data to a Post-Array with new Posts
			users = users.concat(subscriptionData.records);
			lastPage = users.length >= subscriptionData.pagination.records;
			isError = false;
		}
		$loading = false;
	}
</script>

<!--Contains a header the main comment part, a list with all comments and a footer with a textarea to write comments-->
<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full lg:h-[calc(75vh)] lg:ml-14 lg:w-[75vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<header>
		<ModalHeader {title} {leave} />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<div class="overflow-y-auto overflow-x-hidden h-full pr-1 w-full">
		<UserTab
			{users}
			{loadMore}
			{error}
			{isError}
			{lastPage}
			isFollowerlist={true}
			{nothingFoundMessage}
			{nothingFoundSubMessage}
		/>
	</div>
</div>
