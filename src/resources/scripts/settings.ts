if (window.location.pathname === '/settings/') {
	document.addEventListener('DOMContentLoaded', () => {
		const profileName = document.getElementById('profile-name');
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
		// const offlineCheckbox = document.getElementById('offline-checkbox') as HTMLInputElement;
		const adsCheckbox = document.getElementById('ads-checkbox') as HTMLInputElement;

		usernameInput.placeholder = storage.local.get('username') ?? '';
		themeSelect.value = storage.local.get('theme') ?? 'default';
		// offlineCheckbox.checked = storage.local.get('offlineCache') ?? false;
		const showAds = storage.local.get('showAds');
		adsCheckbox.checked = showAds === null ? true : showAds;

		usernameInput.addEventListener('input', () => {
			let username = usernameInput.value.replace(/[^A-Za-z0-9]/g, '_').substring(0, 16);
			usernameInput.value = username;
			while (username.length < 3) {
				username += '_';
			}
			storage.local.set('username', username);
			if (profileName) {
				profileName.textContent = username;
			}
		});

		themeSelect.addEventListener('change', () => {
			theme.set(themeSelect.value);
		});

		/* offlineCheckbox.addEventListener('change', () => {
			storage.local.set('offlineCache', offlineCheckbox.checked);
			if (offlineCheckbox.checked) {
				serviceworker.register('/sw-full.js');
				alert(
					'Offline cache is now downloading.\nThe download size is about 1GB, so it may take a while.\n\nPlease do not leave this page while the download is in progress.\nYou will be notified when the download is complete.'
				);
			} else {
				serviceworker.register('/sw.js');
				alert('Offline cache has been deleted.');
			}
		}); */

		adsCheckbox.addEventListener('change', () => {
			if (adsCheckbox.checked === false) {
				if (
					prompt(
						'Ads are the only source of income for this project, and they help keep the servers running.\n\nIf you really want to disable ads, join the Discord server and get the password to disable ads.'
					) === 'zombie'
				) {
					storage.local.set('showAds', true);
					alert('Ads have been disabled. Reload the page to apply the changes.');
				} else {
					alert('Wrong password. Join the Discord server to get the password.');
					adsCheckbox.checked = true;
				}
			} else {
				storage.local.set('showAds', true);
				alert('Ads have been enabled. Thank you for supporting the project!');
			}
		});
	});
}

if (window.location.pathname === '/welcome/') {
	document.addEventListener('DOMContentLoaded', () => {
		const setupForm = document.getElementById('setup-form') as HTMLFormElement;
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
		// const offlineCheckbox = document.getElementById('offline-checkbox') as HTMLInputElement;

		usernameInput.addEventListener('input', () => {
			const username = usernameInput.value.replace(/[^A-Za-z0-9]/g, '_').substring(0, 16);
			usernameInput.value = username;
		});

		themeSelect.addEventListener('change', () => {
			theme.load(themeSelect.value);
		});

		setupForm.addEventListener('submit', (event) => {
			event.preventDefault();

			let username = usernameInput.value.replace(/[^A-Za-z0-9]/g, '_').substring(0, 16);
			usernameInput.value = username;

			if (!username) {
				alert('Please type a username.');
				return;
			} else {
				while (username.length < 3) {
					username += '_';
				}

				storage.local.set('username', username);
				storage.local.set('theme', themeSelect.value);
				// storage.local.set('offlineCache', offlineCheckbox.checked);
				storage.local.set('showAds', true);
				storage.local.set('lastVersion', launcherVersion);

				/* if (offlineCheckbox.checked) {
					serviceworker.register('/sw-full.js');
					alert(
						'Offline cache is now downloading.\nThe download size is about 1GB, so it may take a while.\n\nPlease do not leave this page while the download is in progress.\nYou will be notified when the download is complete.'
					);
					try {
						// @ts-expect-error
						installPwaEvent.prompt();
					} catch (error) {
						console.error('Failed to prompt PWA install:', error);
					}
				} else {
					serviceworker.register('/sw.js');
				} */

				// @ts-expect-error
				window.top.location.href = '/';
			}
		});
	});
}
