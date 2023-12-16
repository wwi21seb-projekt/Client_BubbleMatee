<script lang=ts>
    import { Icon } from '@steeze-ui/svelte-icon';
    import {Heart, ChatBubbleLeft
	} from '@steeze-ui/heroicons'; 
    import {  getModalStore } from '@skeletonlabs/skeleton';
    import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import Comments from '../comments.svelte';
    const modalStore = getModalStore();
                        
  let isLiked = false;
  let numberOfLikes = 42; // Beispielanzahl der Likes

  const toggleLike = () => {
    isLiked = !isLiked;
    if (isLiked) {
      numberOfLikes++;
    } else {
      numberOfLikes--;
    }
  }
  const handleCommentClick = () => {
    const modalComponent: ModalComponent = { ref: Comments };
    const modal: ModalSettings = {
        type: 'component',
        component: modalComponent,
};
modalStore.trigger(modal);
  }
</script>

<div class="flex flex-row items-center space-x-4">
    <div class="flex flex-col items-center">
        <button on:click={toggleLike} class="focus:outline-none">
          <Icon
            src={Heart}
            class={"h-8 font-bold" + (isLiked ? " fill-red-500 stroke-none" : " fill-none stroke-white")}
          />
        </button>
        <small class="text-xs">{numberOfLikes}</small>
      </div>
      <div class="flex flex-col items-center">
        <button on:click={handleCommentClick} class="focus:outline-none">
          <Icon src={ChatBubbleLeft} class="h-8 font-bold" />
        </button>
        <small class="text-xs">10. Mio</small>
      </div>
  </div>
  