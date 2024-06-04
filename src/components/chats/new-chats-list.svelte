<script lang="ts">
	import type { Author } from '$domains';
	import { UserComponent, SearchBar } from '$components';
	import { globalConfig, loadSearchedUser } from '$utils';
	import { goto } from '$app/navigation';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	let searchTerm: string = '';
	let offset: number = 0;

	let isError: boolean;

	const handleSearch = async () => {
		const body = await loadSearchedUser(searchTerm, offset, globalConfig.limit);
		isError = body.error;
		if (!isError) {
			authors = body.data.records;
			offset += parseInt(globalConfig.limit);
		}
	};

	let authors: Array<Author>;
</script>

<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full lg:h-[calc(75vh)] lg:ml-14 lg:w-[75vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<div class="flex justify-center">
		<SearchBar bind:searchTerm {handleSearch} />
	</div>
	{#if !isError}
		{#if authors}
			<div class="overflow-y-auto">
				{#each authors as author}
					<div class="w-full p-2 md:px-12 px-10">
						<button
							class="w-full my-2hover:bg-gradient-to-br hover:dark:to-tertiary-500 hover:to-primary-400 card bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 rounded-xl"
							on:click={() => {
								goto(`/home/chats/newChat/${author.username}`);
								modalStore.close();
							}}
						>
							<UserComponent {author} />
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<p class="flex justify-center">Keine Nutzer gefunden</p>
		{/if}
	{:else}
		<p class="flex justify-center">Es ist ein Fehler aufgetreten</p>
	{/if}
</div>
