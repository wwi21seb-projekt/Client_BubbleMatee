<script lang="ts">
	import type { PersonData } from '$domains';
    export let source : PersonData[]; 
</script>

<dl class="w-full ml-2">
      <span class="flex flex-col w-full">
        {#each source as item}
          <dt class="font-bold mt-2">{item.description}</dt>
          <dd class="mb-1">{item.value}</dd>
          <hr class="!border-t-2" />
        {/each}
      </span>
  </dl>
  
  