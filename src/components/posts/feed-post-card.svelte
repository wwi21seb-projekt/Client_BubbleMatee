<!--Component for a single post-->
<script lang="ts">
	import { FeedPostFooter, FeedPostMain, FeedPostHeader } from '$components';
	import type { LocationPlace, Post } from '$domains';
	import { fetchLocation } from '$utils';
	export let post: Post;
	export let deletePost: (postId: string) => void;
	let locationPlace: LocationPlace;
	const getLocation = async () => {
  		try {
			const result = await fetchLocation(post.location.longitude, post.location.latitude);
			locationPlace = result;
  		} catch (error) {
		// If there is an Error -> dont show location
   	 	console.error('Fehler beim Abrufen des Orts:', error);
		}
	};

	//load location only if the post has one
	console.log(post.location.longitude)
	if(post.location.longitude !== "")
	{ 
		console.log("GET")
		getLocation();
	}

	//function to delete this post -> calls a passed function
	function deleteThisPost(): void {
		deletePost(post.postId);
	}
</script>

<!--Component contains the header (Username/ Profile Picture etc/ the main post psrt (image/ text) and the footer (Likes and comments))-->
<div class="m-4">
	<div
		class="card bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 w-full p-4 rounded-xl"
	>
		<header>
			<FeedPostHeader date={post.creationDate} author={post.author} deletePost={deleteThisPost} />
			 {#if locationPlace}
				{#if locationPlace.country === ""}
				<span>{`Lon:${locationPlace.longitude}`}</span>
				<span>{`Lat:${locationPlace.latitude}`}</span>
				{:else}
				<span>{`Land:${locationPlace.country}`}</span>
				<span>{`Stadt:${locationPlace.city}`}</span>
				{/if}
			 {/if}
		</header>
		<FeedPostMain text={post.content} />
		<footer>
			<FeedPostFooter />
		</footer>
	</div>
</div>
