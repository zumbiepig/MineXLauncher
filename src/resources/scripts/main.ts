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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		client: function () {
			document.body.style.display = 'none';
			const navUrl = '/mods/client/';
			storage.session.set('lastPage', navUrl);
			window.location.href = navUrl;
		},
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

	iframe.style.display = 'none';
	iframe.addEventListener('load', () => {
		iframe.style.display = '';
	});

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
		const adsense = document.createElement('script');
		adsense.async = true;
		adsense.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1132419379737567';
		adsense.crossOrigin = 'anonymous';
		document.head.appendChild(adsense);
	}

	document.addEventListener('DOMContentLoaded', () => {
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
  - You can now install the launcher as a PWA web app`);
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
