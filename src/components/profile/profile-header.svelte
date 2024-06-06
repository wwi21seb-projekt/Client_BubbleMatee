<script lang="ts">
	import type { UserInfo } from '$domains';
	import {
		Avatar,
		getModalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { FollowerList, ProfileHeaderBottom } from '$components';
	import { Person } from '$images';

	const modalStore = getModalStore();

	export let user: UserInfo;

	function handlePictureClick(): void {
		const modalComponent: ModalComponent = {
			ref: Avatar,
			props: {
				src: user.picture && user.picture.url != '' ? user.picture.url : Person,
				width: 'w-1/2 sm:w-1/3 md:w-1/6'
			}
		};

		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			backdropClasses: 'bg-transparent'
		};
		modalStore.trigger(modal);
	}

	function openFollowerlist(isFollowerlist: boolean): void {
		const modalComponent: ModalComponent = {
			ref: FollowerList,
			props: { isFollowerlist: isFollowerlist, username: user.username }
		};
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent,
			backdropClasses:
				'bg-gradient-to-br dark:from-tertiary-500 dark:to-secondary-500 from-primary-400 to-primary-600 lg:dark:from-transparent lg:darkto-transparent lg:from-transparent lg:to-transparent'
		};
		modalStore.trigger(modal);
	}
</script>

<div class="flex w-full justify-center items-center">
	<div class="w-full px-4 pt-2 sm:w-3/4 md:w-full lg:w-3/4 align-self">
		<div class="w-full">
			<div class="grid grid-cols-4 gap-0 font-semibold p-4">
				<div class="flex flex-col self-center justify-center w-full">
					<Avatar
						border="hover:border-2 hover:!border-surface-600"
						cursor="cursor-pointer"
						src={user.picture && user.picture.url != '' ? user.picture.url : Person}
						on:click={handlePictureClick}
					/>
				</div>
				<div class="flex flex-col self-center">
					<div class="place-self-center">{user.posts}</div>
					<div class="place-self-center text-[11px] sm:text-base">Posts</div>
				</div>
				<button on:click={() => openFollowerlist(true)}>
					<div class="flex flex-col self-center hover:text-gray-400">
						<div class="place-self-center">{user.follower}</div>
						<div class="place-self-center text-[11px] sm:text-base">Abonnenten</div>
					</div>
				</button>
				<button on:click={() => openFollowerlist(false)}>
					<div class="flex flex-col self-center hover:text-gray-400">
						<div class="place-self-center">{user.following}</div>
						<div class="place-self-center text-[11px] sm:text-base">Abonnierte</div>
					</div>
				</button>
			</div>
			<ProfileHeaderBottom {user} />
		</div>
		<!-- Separator Line -->
		<hr class="!border-t-2 !border-double mt-4 mx-4 mb-2" />
	</div>
</div>
