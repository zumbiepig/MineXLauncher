let selectedVersion: string | undefined;
const launcherVersion = '1.4';

const theme = {
	load(themeToLoad?: string) {
		if (themeToLoad) {
			const themeElement = document.getElementById('theme') as HTMLLinkElement;
			if (themeElement) {
				themeElement.href = `/resources/styles/themes/${themeToLoad}.css`;
			} else {
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = `/resources/styles/themes/${themeToLoad}.css`;
				link.id = 'theme';
				document.head.appendChild(link);
			}
		} else {
			const savedTheme = cookie.get('minexlauncher.theme');
			if (savedTheme !== null) {
				const themeElement = document.getElementById('theme') as HTMLLinkElement;
				if (themeElement) {
					themeElement.href = `/resources/styles/themes/${savedTheme}.css`;
				} else {
					const link = document.createElement('link');
					link.rel = 'stylesheet';
					link.href = `/resources/styles/themes/${savedTheme}.css`;
					link.id = 'theme';
					document.head.appendChild(link);
				}
			}
		}
	},
	set(newTheme: string) {
		cookie.set('minexlauncher.theme', newTheme, 365);
		theme.load();
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
				// @ts-expect-error 123
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

function onLoad() {
	if (detect.mobile()) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '/resources/styles/mobile.css';
		document.head.appendChild(link);
	}
	theme.load();

	const lastVersion = cookie.get('minexlauncher.last_version');
	/* remove this line in v1.5, its so ppl see the changelog */ if (lastVersion === null) cookie.set('minexlauncher.last_version', '1.3', 365);
	if (lastVersion !== null && lastVersion < launcherVersion) {
		alert(`MineXLauncher has been updated to v${launcherVersion}!

Changes in v${launcherVersion}:
  - Added welcome and setup screen
  - Show changelog when MineXLauncher is updated
  - Added themes and backgrounds
  - Settings now update automatically without saving them
  - Username rules have been updated to match Minecraft
  - Added Starlike Client`);
		cookie.set('minexlauncher.last_version', launcherVersion, 365);
	}
}

onLoad();

document.addEventListener('DOMContentLoaded', function () {
	const profileName = document.getElementById('profile-name');

	if (profileName) {
		profileName.textContent = cookie.get('minexlauncher.username');
	}
});
