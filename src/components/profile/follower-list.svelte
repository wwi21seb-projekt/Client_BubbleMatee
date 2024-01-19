<!--Modal component for the comment section-->
<script lang="ts">
	//TODO: Datenanbindung wenn der Endpunkt definiert ist
	import { CommentsHeader, UserTab } from '$components';
	import type { Author } from '$domains';
	const Testuser: Author[] = [
		{ nickname: 'lemeamk§', profilePictureUrl: '', username: '1' },
		{ nickname: 'lemeamk§2', profilePictureUrl: '', username: '12' }
	];
	export let title: string;
</script>

<!--Contains a header the main comment part, a list with all comments and a footer with a textarea to write comments-->
<div
	class="h-[calc(100vh-32px)] bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full lg:h-[calc(75vh)] lg:ml-14 lg:w-[75vw] lg:p-4 lg:card lg overflow-hidden flex flex-col"
>
	<header>
		<CommentsHeader {title} />
	</header>
	<hr class="opacity-50 mt-2 mb-2" />
	<div class="overflow-y-auto overflow-x-hidden h-full pr-1 w-full">
		<UserTab users={Testuser} />
	</div>
</div>
