if (window.location.pathname === '/settings/') {
	document.addEventListener('DOMContentLoaded', function () {
		const profileName = document.getElementById('profile-name');
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;

		usernameInput.placeholder = cookie.get('minexlauncher.username') ?? '';
		themeSelect.value = cookie.get('minexlauncher.theme') ?? '';

		usernameInput.addEventListener('input', function () {
			const username = usernameInput.value.replace(/[^A-Za-z0-9]/g, '_').substring(0, 16);
			cookie.set('minexlauncher.username', username, 365);
			usernameInput.value = username;
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

		themeSelect.addEventListener('change', function () {
			theme.load(themeSelect.value);
		});

		setupForm.addEventListener('submit', function (event) {
			event.preventDefault();

			const username = usernameInput.value;
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
