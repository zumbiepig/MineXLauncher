interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
	prompt(): Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let selectedVersion: string | undefined;
const launcherVersion = '1.5';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let installPwaEvent: BeforeInstallPromptEvent;

const theme = {
	load: function (themeToLoad?: string) {
		const themeElement = document.getElementById('theme') as HTMLLinkElement;
		if (themeElement) {
			if (themeToLoad) {
				themeElement.href = `/resources/styles/themes/${themeToLoad}.css`;
			} else {
				const savedTheme = storage.local.get('theme');
				if (savedTheme !== null) {
					themeElement.href = `/resources/styles/themes/${savedTheme}.css`;
				}
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
			const navUrl = '/home/game/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		clients: function () {
			const navUrl = '/home/clients/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		archive: function () {
			const navUrl = '/home/archive/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		downloads: function () {
			const navUrl = '/home/downloads/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
	},
	mods: {
		client: function () {
			const navUrl = '/mods/client/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		mods: function () {
			const navUrl = '/mods/mods/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		resourcepacks: function () {
			const navUrl = '/mods/resourcepacks/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
	},
	mobile: function () {
		const navUrl = '/mobile/';
		storage.session.set('lastPage', navUrl);
		window.location.href = navUrl;
	},
	updates: function () {
		const navUrl = '/updates/';
		storage.session.set('lastPage', navUrl);
		window.location.href = navUrl;
	},
	servers: function () {
		const navUrl = '/servers/';
		storage.session.set('lastPage', navUrl);
		window.location.href = navUrl;
	},
	settings: function () {
		const navUrl = '/settings/';
		storage.session.set('lastPage', navUrl);
		window.location.href = navUrl;
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
	landscape: function () {
		return window.innerWidth > window.innerHeight;
	},
};

if (window.location.pathname === '/') {
	window.addEventListener('beforeinstallprompt', (event) => {
		installPwaEvent = event as BeforeInstallPromptEvent;
	});
} else {
	document.addEventListener('DOMContentLoaded', () => {
		// @ts-expect-error 123
		delete window.installPwaEvent;

		const profileName = document.getElementById('profile-name');
		if (profileName) {
			profileName.textContent = storage.local.get('username');
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		const lastVersion = storage.local.get('lastVersion');
		if (lastVersion !== null && lastVersion < launcherVersion) {
			alert(`MineXLauncher has been updated to v${launcherVersion}!

Changes in v${launcherVersion}:
  - You can now install MineXLauncher as a PWA web app`);
			storage.local.set('lastVersion', launcherVersion);
		}
	});
}

if (detect.mobile()) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = '/resources/styles/mobile.css';
	document.head.appendChild(link);
}
theme.load();