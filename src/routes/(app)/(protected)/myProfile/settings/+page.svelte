<script lang="ts">
	import ArrowRightIcon from '$images/icons/arrow-right-icon.svelte';
	import { EditIcon, LogoutIcon, PasswordIcon, PhotoIcon } from '$images';
	import { goto } from '$app/navigation';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { currentUsername, hasNotifications, isLoggedIn, notifications } from '$stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronLeft } from '@steeze-ui/heroicons';
	const toastStore = getToastStore();
	const t: ToastSettings = {
		message: 'Abmeldung erfolgreich',
		background: 'variant-filled-success'
	};
	const handleLogout = async () => {
		const response = await fetch('/api/users/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();

		if (data.success) {
			isLoggedIn.set(false);
			currentUsername.set(null);
			goto('/login');
			notifications.set([]);
			hasNotifications.set(false);
		}

		toastStore.trigger(t);
	};
</script>

<main class="p-4 h-full w-full grid grid-cols-1 place-content-center justify-items-center">
	<nav class="list-nav w-full md:w-3/4">
		<div class="flex flex-row h-16 mb-1">
			<button on:click={() => goto('/myProfile')} class="focus:outline-none">
				<Icon src={ChevronLeft} class="h-10 font-bold hover:stroke-gray-400" />
			</button>
			<h1 class="h1 mr-16 w-full flex justify-center items-center">Einstellungen</h1>
		</div>
		<ul>
			<hr class="!border-t-2" />
			<li>
				<a href="/myProfile/settings/editProfileInformation" class="flex justify-between">
					<span class="flex self-center">
						<span class="badge self-center"><EditIcon /></span>
						<span class="flex-auto self-center">Profilinformationen bearbeiten</span>
					</span>
					<span class="badge self-center"><ArrowRightIcon /></span>
				</a>
			</li>
			<hr class="!border-t-2" />
			<li>
				<a href="/myProfile/settings/editProfilePhoto" class="flex justify-between">
					<span class="flex self-center">
						<span class="badge self-center"><PhotoIcon /></span>
						<span class="flex-auto self-center">Profilbild bearbeiten</span>
					</span>
					<span class="badge self-center"><ArrowRightIcon /></span>
				</a>
			</li>
			<hr class="!border-t-2" />
			<li>
				<a href="/myProfile/settings/changePassword" class="flex justify-between">
					<span class="flex self-center">
						<span class="badge self-center"><PasswordIcon /></span>
						<span class="flex-auto self-center">Passwort ändern</span>
					</span>
					<span class="badge self-center"><ArrowRightIcon /></span>
				</a>
			</li>
			<hr class="!border-t-2" />
			<li>
				<button on:click={handleLogout} class="flex justify-between w-full">
					<span class="flex self-center">
						<span class="badge self-center"><LogoutIcon /></span>
						<span class="flex-auto self-center">Abmelden</span>
					</span>
					<span class="badge self-center"><ArrowRightIcon /></span>
				</button>
			</li>
			<hr class="!border-t-2" />
		</ul>
	</nav>
</main>
