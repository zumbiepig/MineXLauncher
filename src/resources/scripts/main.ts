const theme = {
	append(appendTheme: string | null) {
		if (appendTheme !== null) {
			append.stylesheet(`/resources/styles/themes/${appendTheme}.css`);
		}
	},
	load() {
		if (window.location.pathname.startsWith('/mobile/')) {
			theme.append('mobile');
		}
		const savedTheme = cookie.get('minexlauncher.theme');
		theme.append(savedTheme);
	},
	set(newTheme: string) {
		cookie.set('minexlauncher.theme', newTheme, 365);
		theme.append(newTheme);
	},
};

const append = {
	script(pathTo: string) {
		const script = document.createElement('script');
		script.src = pathTo;
		document.head.appendChild(script);
	},
	stylesheet(pathTo: string) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = pathTo;
		document.head.appendChild(link);
	},
};

const versionSelector = {
	open() {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.add('open');
			customSelect.classList.add('open');
		}
	},
	close() {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.remove('open');
			customSelect.classList.remove('open');
		}
	},
	toggle() {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.toggle('open');
			customSelect.classList.toggle('open');
		}
	},
};

const game = {
	play(version?: string) {
		if (version) {
			embed.remove();
			// @ts-expect-error 123
			window.top.location.href = version;
		} else if (selectedVersion) {
			embed.remove();
			// @ts-expect-error 123
			window.top.location.href = selectedVersion;
		} else {
			alert('Please select a version to play.');
			return;
		}
	},
	select(path: string, name?: string) {
		selectedVersion = path;
		const selector = document.querySelector('.custom-select');
		if (selector?.textContent) {
			if (name) {
				selector.textContent = `Selected: ${name}`;
			} else {
				selector.textContent = `Selected: ${path}`;
			}
		}
		versionSelector.close();
	},
	archive(client: string) {
		const clients: Record<string, string> = {
			'1.8': '18-client-version',
			'1.5': '15-client-version',
			'b1.3': 'b13-client-version',
		};
		const dropdown = clients[client] ? (document.getElementById(clients[client]) as HTMLSelectElement) : null;
		if (dropdown?.value) {
			selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft${client === '1.8' ? 'X_1.8' : `_${client}`}/client/${dropdown.value}/index.html`;
			game.play();
		}
	},
};

const embed = {
	create(path?: string) {
		const iframe = document.createElement('iframe');
		iframe.id = 'iframe-container';
		iframe.style.position = 'fixed';
		iframe.style.top = '0';
		iframe.style.left = '0';
		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframe.style.border = 'none';
		if (path) {
			iframe.src = path;
		} else if (cookie.get('minexlauncher.setup_complete') !== 'true') {
			iframe.src = '/welcome.html';
		} else if (detect.mobile()) {
			iframe.src = '/mobile/';
		} else {
			iframe.src = '/home/game/';
		}
		document.body.appendChild(iframe);
	},
	remove() {
		const iframe = window.top?.document.getElementById('iframe-container');
		iframe?.remove();
	},
};

const navigate = {
	home: {
		game() {
			window.location.href = '/home/game/';
		},
		clients() {
			window.location.href = '/home/clients/';
		},
		archive() {
			window.location.href = '/home/archive/';
		},
		downloads() {
			window.location.href = '/home/downloads/';
		},
	},
	mods: {
		client() {
			window.location.href = '/mods/client/';
		},
		mods() {
			window.location.href = '/mods/mods/';
		},
		resourcepacks() {
			window.location.href = '/mods/resourcepacks/';
		},
	},
	mobile() {
		window.location.href = '/mobile/';
	},
	updates() {
		window.location.href = '/updates/';
	},
	servers() {
		window.location.href = '/servers/';
	},
	settings() {
		window.location.href = '/settings/';
	},
};

const cookie = {
	get(key: string): string | null {
		for (const cookie of document.cookie.replaceAll('; ', ';').split(';')) {
			const cookiePair = cookie.split('=');
			if (encodeURIComponent(key) === cookiePair[0]) {
				return decodeURIComponent(cookiePair[1]);
			}
		}
		return null;
	},
	set(key: string, value: string, days: number) {
		let maxAge;
		if (days) {
			maxAge = days * 60 * 60 * 24;
		} else {
			maxAge = 31536000;
		}
		document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; secure`;
	},
	delete(key: string) {
		document.cookie = `${encodeURIComponent(key)}=; max-age=0; path=/`;
	},
};

const query = {
	get(name: string) {
		const urlParams = new URLSearchParams(window.top?.location.search);
		return urlParams.get(name);
	},
};

const detect = {
	mobile(): boolean {
		try {
			document.exitPointerLock();
			return /Mobi/i.test(window.navigator.userAgent);
		} catch (e) {
			return true;
		}
	},
};

if (window.location.hostname === '0.0.0.0') {
	navigate;
	query;
}

let selectedVersion: string | undefined;

theme.load();

document.addEventListener('DOMContentLoaded', function () {
	const usernameForm = document.getElementById('username-form') as HTMLFormElement;
	const usernameInput = document.getElementById('username-input') as HTMLInputElement;
	const profileName = document.getElementById('profile-name');
	const savedUsername = cookie.get('minexlauncher.username');

	const themeForm = document.getElementById('theme-form') as HTMLFormElement;
	const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;

	const setupForm = document.getElementById('setup-form') as HTMLFormElement;

	if (profileName && savedUsername) {
		profileName.textContent = savedUsername;
	}

	if (window.location.pathname === '/settings/') {
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
	} else if (window.location.pathname === '/welcome.html') {
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
				cookie.set('minexlauncher.setup_complete', 'true', 365);
				// @ts-expect-error 1234567890
				window.top.location.href = '/';
			}
		});
	}
});
