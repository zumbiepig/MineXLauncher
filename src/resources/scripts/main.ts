let selectedVersion: string | undefined;
const launcherVersion = '1.4';

const theme = {
	load: function (themeToLoad?: string) {
		const themeElement = document.getElementById('theme') as HTMLLinkElement;
		if (themeElement) {
			if (themeToLoad) {
				themeElement.href = `/resources/styles/themes/${themeToLoad}.css`;
			} else {
				themeElement.href = `/resources/styles/themes/${storage.local.get('theme')}.css`;
			}
		}
	},
	set: function (newTheme: string) {
		storage.local.set('theme', newTheme);
		theme.load();
	},
};

const versionSelector = {
	open: function () {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.add('open');
			customSelect.classList.add('open');
		}
	},
	close: function () {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.remove('open');
			customSelect.classList.remove('open');
		}
	},
	toggle: function () {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.toggle('open');
			customSelect.classList.toggle('open');
		}
	},
};

const game = {
	play: function (version?: string) {
		if (version) {
			// @ts-expect-error 123
			window.top.location.href = version;
		} else if (selectedVersion) {
			// @ts-expect-error 123
			window.top.location.href = selectedVersion;
		} else {
			alert('Please select a version to play.');
			return;
		}
	},
	select: function (path: string, name?: string) {
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
	archive: function (client: string) {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const navigate = {
	home: {
		game: function () {
			window.location.href = '/home/game/';
		},
		clients: function () {
			window.location.href = '/home/clients/';
		},
		archive: function () {
			window.location.href = '/home/archive/';
		},
		downloads: function () {
			window.location.href = '/home/downloads/';
		},
	},
	mods: {
		client: function () {
			window.location.href = '/mods/client/';
		},
		mods: function () {
			window.location.href = '/mods/mods/';
		},
		resourcepacks: function () {
			window.location.href = '/mods/resourcepacks/';
		},
	},
	mobile: function () {
		window.location.href = '/mobile/';
	},
	updates: function () {
		window.location.href = '/updates/';
	},
	servers: function () {
		window.location.href = '/servers/';
	},
	settings: function () {
		window.location.href = '/settings/';
	},
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cookie = {
	set: function (key: string, value: string, days: number) {
		let maxAge;
		if (days) {
			maxAge = days * 60 * 60 * 24;
		} else {
			maxAge = 31536000;
		}
		document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`;
	},
	get: function (key: string): string | null {
		for (const cookie of document.cookie.split('; ')) {
			const cookiePair = cookie.split('=');
			if (encodeURIComponent(key) === cookiePair[0]) {
				// @ts-expect-error 123
				return decodeURIComponent(cookiePair[1]);
			}
		}
		return null;
	},
	delete: function (key: string) {
		document.cookie = `${encodeURIComponent(key)}=; Max-Age=0; Path=/`;
	},
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const storage = {
	local: {
		get: function (key: string) {
			const item = localStorage.getItem('minexlauncher');
			if (item !== null) {
				const json = JSON.parse(item);
				if (json[key] !== undefined) {
					return json[key];
				} else {
					return null;
				}
			} else {
				return null;
			}
		},
		set: function (key: string, value: string) {
			let item = localStorage.getItem('minexlauncher');
			if (item === null) {
				item = '{}';
			}
			const json = JSON.parse(item);
			json[key] = value;
			localStorage.setItem('minexlauncher', JSON.stringify(json));
		},
		delete: function (key: string) {
			const item = localStorage.getItem('minexlauncher');
			if (item !== null) {
				const json = JSON.parse(item);
				delete json[key];
				localStorage.setItem('minexlauncher', JSON.stringify(json));
			}
		},
	},
	session: {
		get: function (key: string) {
			const item = sessionStorage.getItem('minexlauncher');
			if (item !== null) {
				const json = JSON.parse(item);
				if (json[key] !== undefined) {
					return json[key];
				} else {
					return null;
				}
			} else {
				return null;
			}
		},
		set: function (key: string, value: string) {
			let item = sessionStorage.getItem('minexlauncher');
			if (item === null) {
				item = '{}';
			}
			const json = JSON.parse(item);
			json[key] = value;
			sessionStorage.setItem('minexlauncher', JSON.stringify(json));
		},
		delete: function (key: string) {
			const item = sessionStorage.getItem('minexlauncher');
			if (item !== null) {
				const json = JSON.parse(item);
				delete json[key];
				sessionStorage.setItem('minexlauncher', JSON.stringify(json));
			}
		},
	},
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const query = {
	get: function (name: string) {
		return new URLSearchParams(window.top?.location.search).get(name);
	},
};

const detect = {
	mobile: function (): boolean {
		try {
			document.exitPointerLock();
			return /Mobi/i.test(window.navigator.userAgent);
		} catch (e) {
			return true;
		}
	},
};

if (window.location.pathname === '/') {
	const iframe = document.createElement('iframe');

	if (storage.local.get('lastVersion') === null) {
		iframe.src = '/welcome.html';
		alert(`MineXLauncher has been updated to v1.4!

Changes in v1.4:
  - Added welcome and setup screen
  - Show changelog when MineXLauncher is updated
  - Added themes and backgrounds
  - Settings now update automatically without saving them
  - Username rules have been updated to match Minecraft
  - Added Starlike Client`);
	} else if (detect.mobile()) {
		iframe.src = '/mobile/';
	} else {
		iframe.src = '/home/game/';
	}
	document.addEventListener('DOMContentLoaded', function () {
		document.body.appendChild(iframe);
	});
} else {
	if (detect.mobile()) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '/resources/styles/mobile.css';
		document.head.appendChild(link);
	}
	theme.load();

	const lastVersion = storage.local.get('lastVersion');
	if (lastVersion !== null && lastVersion < launcherVersion) {
		alert(`MineXLauncher has been updated to v${launcherVersion}!

Changes in v${launcherVersion}:
  - Added welcome and setup screen
  - Show changelog when MineXLauncher is updated
  - Added themes and backgrounds
  - Settings now update automatically without saving them
  - Username rules have been updated to match Minecraft
  - Added Starlike Client`);
		storage.local.set('lastVersion', launcherVersion);
	}

	document.addEventListener('DOMContentLoaded', function () {
		const profileName = document.getElementById('profile-name');
		if (profileName) {
			profileName.textContent = storage.local.get('username');
		}
	});
}
