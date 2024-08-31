import { gt, coerce } from 'semver';

let selectedVersion: string | undefined;
const launcherVersion = '1.5';

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
			document.body.style.display = 'none';
			// @ts-expect-error
			window.top.location.href = version;
		} else if (selectedVersion) {
			document.body.style.display = 'none';
			// @ts-expect-error
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

const navigate = {
	home: {
		game: function () {
			document.body.style.display = 'none';
			const navUrl = '/home/game/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		clients: function () {
			document.body.style.display = 'none';
			const navUrl = '/home/clients/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		archive: function () {
			document.body.style.display = 'none';
			const navUrl = '/home/archive/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		downloads: function () {
			document.body.style.display = 'none';
			const navUrl = '/home/downloads/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
	},
	mods: {
		mods: function () {
			document.body.style.display = 'none';
			const navUrl = '/mods/mods/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
		resourcepacks: function () {
			document.body.style.display = 'none';
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
				// @ts-expect-error
				return decodeURIComponent(cookiePair[1]);
			}
		}
		return null;
	},
	delete: function (key: string) {
		document.cookie = `${encodeURIComponent(key)}=; Max-Age=0; Path=/`;
	},
};

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
		set: function (key: string, value: string | number | object | [] | boolean | null) {
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
				json[key] = undefined;
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
		set: function (key: string, value: string | number | object | [] | boolean | null) {
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
				json[key] = undefined;
				sessionStorage.setItem('minexlauncher', JSON.stringify(json));
			}
		},
	},
};

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
		} catch {
			return true;
		}
	},
	landscape: function () {
		return window.innerWidth > window.innerHeight;
	},
};

const serviceworker = {
	register: function (url: string) {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register(url).then(() => {
					navigator.serviceWorker.addEventListener('message', (event) => {
						if (event.origin === window.location.origin) {
							if (event.data.title === 'sw-install-complete') {
								alert('MineXLauncher is now ready for offline use!');
							}
						}
					});
				});
			});
		}
	},
};

if (window.location.pathname === '/') {
	const lastPage = storage.session.get('lastPage');
	const isMobile = detect.mobile();
	const iframe = document.createElement('iframe');
	iframe.id = 'main_frame';

	if (storage.local.get('lastVersion') === null) {
		iframe.src = '/welcome/';
	} else if (lastPage !== null) {
		iframe.src = lastPage;
	} else if (isMobile) {
		iframe.src = '/mobile/';
	} else {
		iframe.src = '/home/game/';
	}

	document.addEventListener('DOMContentLoaded', () => {
		document.body.appendChild(iframe);
	});

	window.addEventListener('beforeinstallprompt', (event) => {
		if (iframe.contentWindow) {
			// @ts-expect-error
			iframe.contentWindow.installPwaEvent = event;
		}
	});

	/* if (storage.local.get('offlineCache') === true) {
		serviceworker.register('/sw-full.js');
	} else {
		serviceworker.register('/sw.js');
	} */
	serviceworker.register('/sw.js');
} else {
	if (storage.local.get('showAds') !== false) {
		const googleAdsScript = document.createElement('script');
		googleAdsScript.async = true;
		googleAdsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1132419379737567';
		googleAdsScript.crossOrigin = 'anonymous';
		document.head.appendChild(googleAdsScript);

		document.addEventListener('DOMContentLoaded', () => {
			const googleAdsPush = document.createElement('script');
			googleAdsPush.text = '(adsbygoogle = window.adsbygoogle || []).push({});';
			document.body.appendChild(googleAdsPush);

			const adsContainers = Array.from(document.getElementsByClassName('ads-container')) as HTMLElement[];
			for (const adsContainer of adsContainers) {
				adsContainer.style.display = 'flex';
			}
		});
	}

	document.addEventListener('DOMContentLoaded', () => {
		const profileName = document.getElementById('profile-name');
		if (profileName) {
			profileName.textContent = storage.local.get('username');
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		const lastVersion = storage.local.get('lastVersion');
		// @ts-expect-error
		if (lastVersion !== null && gt(coerce(launcherVersion, { includePrerelease: true }), coerce(lastVersion, { includePrerelease: true }))) {
			const releaseNotes = ['You can now install the launcher as a PWA web app'].map((item) => `  - ${item}`).join('\n');
			alert(`MineXLauncher has been updated to v${launcherVersion}!\n\nChanges in v${launcherVersion}:\n${releaseNotes}`);
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

if (window.location.pathname === '/settings/') {
	document.addEventListener('DOMContentLoaded', () => {
		const profileName = document.getElementById('profile-name');
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
		// const offlineCheckbox = document.getElementById('offline-checkbox') as HTMLInputElement;
		const adsCheckbox = document.getElementById('ads-checkbox') as HTMLInputElement;

		usernameInput.placeholder = storage.local.get('username') ?? '';
		themeSelect.value = storage.local.get('theme') ?? '';
		// offlineCheckbox.checked = storage.local.get('offlineCache') ?? false;
		adsCheckbox.checked = storage.local.get('showAds') !== false;

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
			storage.local.set('showAds', adsCheckbox.checked);
			window.location.reload();
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

if (window.location.hostname === null) {
	// Stop the minifier from removing these functions
	console.debug([navigate, cookie, query, versionSelector, game]);
}
