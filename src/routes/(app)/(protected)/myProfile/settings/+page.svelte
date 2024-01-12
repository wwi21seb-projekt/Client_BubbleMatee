<script lang="ts">
	import ArrowRightIcon from '$images/icons/arrow-right-icon.svelte';
	import { EditIcon, LogoutIcon, PasswordIcon } from '$images';
	import { goto } from '$app/navigation';
	import { currentUsername, isLoggedIn } from '$stores';

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
		}
	};
</script>

<main class="p-4 h-full w-full grid grid-cols-1 place-content-center justify-items-center">
	<nav class="list-nav w-full">
		<div class="flex justify-center pb-4">
			<h1 class="h1">Einstellungen</h1>
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
						<span class="flex-auto self-center">Ausloggen</span>
					</span>
					<span class="badge self-center"><ArrowRightIcon /></span>
				</button>
			</li>
			<hr class="!border-t-2" />
		</ul>
	</nav>
</main>
