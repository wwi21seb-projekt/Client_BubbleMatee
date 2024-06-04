<script lang="ts">
	import { goto } from "$app/navigation";
	import { Person } from "$images";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { ChevronLeft } from "@steeze-ui/heroicons";
	import { Icon } from "@steeze-ui/svelte-icon";

    export let chatPartner: string;
</script>

<div class="flex items-center bg-surface-300 dark:bg-surface-700">
    <button class="lg:hidden h-12 btn" on:click={() => {goto('/home/chats')}}>
        <Icon src={ChevronLeft} />
    </button>
    <Avatar class="m-2 h-8 w-8" src={Person} />
    <span class="flex-1 text-start">
        {chatPartner}
    </span>
</div>