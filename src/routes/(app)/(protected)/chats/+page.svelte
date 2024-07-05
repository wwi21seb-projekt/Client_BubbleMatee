<script lang="ts">
	import ContactList from '$components/chats/contact-list.svelte';
	import type { ChatsResponse, ErrorResponse } from '$domains';

	export let data: ChatsResponse | ErrorResponse;
</script>

<ContactList {data} />
