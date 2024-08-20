if (window.location.pathname === '/settings/') {
	document.addEventListener('DOMContentLoaded', () => {
		const profileName = document.getElementById('profile-name');
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
		const offlineCheckbox = document.getElementById('offline-checkbox') as HTMLInputElement;

		usernameInput.placeholder = storage.local.get('username') ?? '';
		themeSelect.value = storage.local.get('theme') ?? '';
		offlineCheckbox.checked = storage.local.get('offlineCache') ?? false;

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

		offlineCheckbox.addEventListener('change', () => {
			storage.local.set('offlineCache', offlineCheckbox.checked);
			if (offlineCheckbox.checked) {
				serviceworker.register('/sw-full.js');
				alert('Offline cache is now downloading.\nThe download size is about 1GB, so it may take a while.');
			} else {
				serviceworker.register('/sw.js');
				alert('Offline cache has been deleted.');
			}
		});
	});
}

if (window.location.pathname === '/welcome/') {
	document.addEventListener('DOMContentLoaded', () => {
		const setupForm = document.getElementById('setup-form') as HTMLFormElement;
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
		const offlineCheckbox = document.getElementById('offline-checkbox') as HTMLInputElement;

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
				storage.local.set('offlineCache', offlineCheckbox.checked);
				storage.local.set('lastVersion', launcherVersion);

				if (offlineCheckbox.checked) {
					serviceworker.register('/sw-full.js');
					alert('Offline cache is now downloading.\nThe download size is about 1GB, so it may take a while.');
					try {
						// @ts-expect-error
						installPwaEvent.prompt();
					} catch (error) {
						console.error('Failed to prompt PWA install:', error);
					}
				} else {
					serviceworker.register('/sw.js');
				}

				// @ts-expect-error
				window.top.location.href = '/';
			}
		});
	});
}
