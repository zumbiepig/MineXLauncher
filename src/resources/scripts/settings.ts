if (window.location.pathname === '/settings/') {
	document.addEventListener('DOMContentLoaded', function () {
		const profileName = document.getElementById('profile-name');
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;

		usernameInput.placeholder = storage.local.get('username') ?? '';
		themeSelect.value = storage.local.get('theme') ?? '';

		usernameInput.addEventListener('input', function () {
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

		themeSelect.addEventListener('change', function () {
			theme.set(themeSelect.value);
		});
	});
}

if (window.location.pathname === '/welcome.html') {
	document.addEventListener('DOMContentLoaded', function () {
		const setupForm = document.getElementById('setup-form') as HTMLFormElement;
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;

		usernameInput.addEventListener('input', function () {
			const username = usernameInput.value.replace(/[^A-Za-z0-9]/g, '_').substring(0, 16);
			usernameInput.value = username;
		});

		themeSelect.addEventListener('change', function () {
			theme.load(themeSelect.value);
		});

		setupForm.addEventListener('submit', function (event) {
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
				storage.local.set('lastVersion', launcherVersion);
				// @ts-expect-error 123
				window.top.location.href = '/';
			}
		});
	});
}
