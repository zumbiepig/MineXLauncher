if (window.location.pathname === '/settings/') {
	document.addEventListener('DOMContentLoaded', function () {
		const profileName = document.getElementById('profile-name');
		const usernameForm = document.getElementById('username-form') as HTMLFormElement;
		const themeForm = document.getElementById('theme-form') as HTMLFormElement;
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;

		usernameForm.addEventListener('submit', function (event) {
			event.preventDefault();

			const username = usernameInput.value.trim();

			if (username) {
				cookie.set('minexlauncher.username', username, 365);
				if (profileName) {
					profileName.textContent = cookie.get('minexlauncher.username');
				}
			}
		});

		themeForm.addEventListener('submit', function (event) {
			event.preventDefault();

			const newTheme = themeSelect.value;

			cookie.set('minexlauncher.theme', newTheme, 365);
			theme.load();
		});
	});
}

if (window.location.pathname === '/welcome.html') {
	document.addEventListener('DOMContentLoaded', function () {
		const setupForm = document.getElementById('setup-form') as HTMLFormElement;
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;

		setupForm.addEventListener('submit', function (event) {
			event.preventDefault();

			const username = usernameInput.value.trim();
			const newTheme = themeSelect.value;

			if (!username) {
				alert('Please type a username.');
				return;
			} else {
				cookie.set('minexlauncher.username', username, 365);
				cookie.set('minexlauncher.theme', newTheme, 365);
				cookie.set('minexlauncher.last_version', launcherVersion, 365);
				// @ts-expect-error 123
				window.top.location.href = '/';
			}
		});
	});
}
