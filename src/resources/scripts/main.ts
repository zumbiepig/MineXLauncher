import { gt, coerce } from 'semver';
import { inflate, deflate } from 'pako';

let selectedVersion: string;

const theme = {
	load: function (themeToLoad?: string) {
		const themeElement = document.getElementById('theme') as HTMLLinkElement;
		if (themeElement) {
			if (themeToLoad) {
				themeElement.href = `/resources/styles/themes/${themeToLoad}.css`;
			} else {
				const savedTheme = storage.local.get('theme');
				if (savedTheme) {
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

/*const cookie = {
	set: function (key: string, value: string | number | object | [] | boolean | null | undefined, days: number) {
		let maxAge;
		if (days) {
			maxAge = days * 60 * 60 * 24;
		} else {
			maxAge = 31536000;
		}
		document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`;
	},
	get: function (key: string) {
		for (const cookie of document.cookie.split('; ')) {
			const cookiePair = cookie.split('=');
			if (encodeURIComponent(key) === cookiePair[0]) {
				return decodeURIComponent(cookiePair[1]);
			}
		}
		return undefined;
	},
	delete: function (key: string) {
		document.cookie = `${encodeURIComponent(key)}=; Max-Age=0; Path=/`;
	},
};*/

const storage = {
	local: {
		get: function (key: string) {
			const item = localStorage.getItem('minexlauncher');
			if (item !== null) {
				const json = JSON.parse(item);
				if (json[key] !== undefined) {
					return json[key];
				}
				return undefined;
			}
			return undefined;
		},
		set: function (key: string, value: string | number | object | boolean | null | undefined) {
			let item = localStorage.getItem('minexlauncher');
			if (item === null) {
				item = '{}';
			}
			const json = JSON.parse(item);
			json[key] = value;
			localStorage.setItem('minexlauncher', JSON.stringify(json));
		},
	},
	session: {
		get: function (key: string) {
			const item = sessionStorage.getItem('minexlauncher');
			if (item !== null) {
				const json = JSON.parse(item);
				if (json[key] !== undefined) {
					return json[key];
				}
				return undefined;
			}
			return undefined;
		},
		set: function (key: string, value: string | number | object | boolean | null | undefined) {
			let item = sessionStorage.getItem('minexlauncher');
			if (item === null) {
				item = '{}';
			}
			const json = JSON.parse(item);
			json[key] = value;
			sessionStorage.setItem('minexlauncher', JSON.stringify(json));
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

const mods = {
	check: function (mod: string): boolean {
		const mods: string[] = storage.local.get('mods') ?? [];
		return mods.includes(mod);
	},
	add: function (mod: string): void {
		const mods: string[] = storage.local.get('mods') ?? [];
		if (!mods.includes(mod)) {
			mods.push(mod);
			mods.sort();
			storage.local.set('mods', mods);
		}
	},
	remove: function (mod: string): void {
		const mods: string[] = storage.local.get('mods') ?? [];
		const modIndex = mods.indexOf(mod);
		if (modIndex !== -1) {
			mods.splice(modIndex, 1);
			storage.local.set('mods', mods);
		}
	},
	toggle: function (modId: string): void {
		const mod = `/resources/mods/downloads/${modId}.js`;
		const mods: string[] = storage.local.get('mods') ?? [];
		const modIndex = mods.indexOf(mod);
		if (modIndex === -1) {
			mods.push(mod);
			mods.sort();
			storage.local.set('mods', mods);
			const modInstallElem = document.getElementById(`mod-install-${modId}`);
			if (modInstallElem) {
				modInstallElem.textContent = 'Uninstall';
				modInstallElem.classList.add('installed');
			}
		} else {
			mods.splice(modIndex, 1);
			storage.local.set('mods', mods);
			const modInstallElem = document.getElementById(`mod-install-${modId}`);
			if (modInstallElem) {
				modInstallElem.textContent = 'Install';
				modInstallElem.classList.remove('installed');
			}
		}
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

const base64Gzip = {
	decode: function (base64: string) {
		// Decode Base64 to binary string
		const binaryString = atob(base64);

		// Convert binary string to Uint8Array
		const len = binaryString.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}

		// Use pako to decompress the Uint8Array
		const decompressed = inflate(bytes, { to: 'string' });

		return decompressed;
	},
	encode: function (inputString: string) {
		// Convert the input string to a Uint8Array
		const encoder = new TextEncoder();
		const inputBytes = encoder.encode(inputString);

		// Use pako to compress the Uint8Array
		const compressedBytes = deflate(inputBytes);

		// Convert the compressed Uint8Array to a binary string
		let binaryString = '';
		for (const byte of compressedBytes) {
			binaryString += String.fromCharCode(byte);
		}

		// Encode the binary string to Base64
		const base64String = btoa(binaryString);

		return base64String;
	},
};

theme.load();

if (detect.mobile()) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = '/resources/styles/mobile.css';
	document.head.appendChild(link);
}

if (window.location.pathname === '/') {
	const lastPage = storage.session.get('lastPage');
	const isMobile = detect.mobile();
	const iframe = document.createElement('iframe');
	iframe.src = !storage.local.get('lastVersion') ? '/welcome/' : lastPage ? lastPage : isMobile ? '/mobile/' : '/home/game/';

	document.addEventListener('DOMContentLoaded', () => document.body.appendChild(iframe));

	window.addEventListener('beforeinstallprompt', (event) => {
		// @ts-expect-error
		if (iframe.contentWindow) iframe.contentWindow.installPwaEvent = event;
	});

	/* if (storage.local.get('offlineCache')) {
		serviceworker.register('/sw-full.js');
	} else {
		serviceworker.register('/sw.js');
	} */
	serviceworker.register('/sw.js');
} else {
	document.addEventListener('DOMContentLoaded', async () => {
		const profileName = document.getElementById('profile-name');
		const titleBarText = document.getElementById('title-bar-text');

		const lastVersion = storage.local.get('lastVersion');
		const updateData = (await (await fetch('/resources/data.json')).json()).updates;
		const currentVersion = updateData[0].version;
		const changelog = updateData[0].changelog.map((change: string) => `  - ${change}`).join('\n');

		if (profileName) profileName.textContent = storage.local.get('username');
		if (titleBarText) titleBarText.textContent += ` ${currentVersion}`;

		// @ts-expect-error
		if (lastVersion && gt(coerce(currentVersion, { includePrerelease: true }), coerce(lastVersion, { includePrerelease: true }))) {
			alert(`MineXLauncher has been updated to v${currentVersion}!\n\nChanges in v${currentVersion}:\n${changelog}`);
			storage.local.set('lastVersion', currentVersion);
		}
	});

	/* if (storage.local.get('showAds')) {
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
			adsContainers.forEach((adsContainer) => {
				adsContainer.style.display = 'flex';
			});
		});
	} */
}

if (window.location.pathname === '/settings/') {
	document.addEventListener('DOMContentLoaded', async () => {
		const profileName = document.getElementById('profile-name');
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
		// const offlineCheckbox = document.getElementById('offline-checkbox') as HTMLInputElement;
		// const adsCheckbox = document.getElementById('ads-checkbox') as HTMLInputElement;
		const themeData: { id: string; name: string }[] = (await (await fetch('/resources/data.json')).json()).themes;

		themeData.forEach((theme: { id: string; name: string }) => {
			const option = document.createElement('option');
			option.value = theme.id;
			option.textContent = theme.name;
			themeSelect?.appendChild(option);
		});

		usernameInput.placeholder = storage.local.get('username') ?? '';
		themeSelect.value = storage.local.get('theme') ?? '';
		// offlineCheckbox.checked = storage.local.get('offlineCache') ?? false;
		// adsCheckbox.checked = storage.local.get('showAds');

		usernameInput.addEventListener('input', () => {
			let username = usernameInput.value.replace(/[^A-Za-z0-9]/g, '_').substring(0, 16);
			usernameInput.value = username;
			while (username.length < 3) username += '_';

			storage.local.set('username', username);
			if (profileName) profileName.textContent = username;
		});

		themeSelect.addEventListener('change', () => theme.set(themeSelect.value));

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

		/* adsCheckbox.addEventListener('change', () => {
			storage.local.set('showAds', adsCheckbox.checked);
			const adsContainers = Array.from(document.getElementsByClassName('ads-container')) as HTMLElement[];
			adsContainers.forEach((adsContainer) => (adsContainer.style.display = 'none'));
		}); */
	});
} else if (window.location.pathname === '/welcome/') {
	document.addEventListener('DOMContentLoaded', async () => {
		const setupForm = document.getElementById('setup-form') as HTMLFormElement;
		const usernameInput = document.getElementById('username-input') as HTMLInputElement;
		const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
		// const offlineCheckbox = document.getElementById('offline-checkbox') as HTMLInputElement;
		const themeData: { id: string; name: string }[] = (await (await fetch('/resources/data.json')).json()).themes;

		themeData.forEach((theme: { id: string; name: string }) => {
			const option = document.createElement('option');
			option.value = theme.id;
			option.textContent = theme.name;
			themeSelect?.appendChild(option);
		});

		usernameInput.addEventListener('input', () => {
			const username = usernameInput.value.replace(/[^A-Za-z0-9]/g, '_').substring(0, 16);
			usernameInput.value = username;
		});

		themeSelect.addEventListener('change', () => theme.load(themeSelect.value));

		setupForm.addEventListener('submit', async (event) => {
			event.preventDefault();

			let username = usernameInput.value.replace(/[^A-Za-z0-9]/g, '_').substring(0, 16);
			usernameInput.value = username;

			if (!username) {
				alert('Please type a username.');
				return;
			} else {
				while (username.length < 3) username += '_';

				storage.local.set('username', username);
				storage.local.set('theme', themeSelect.value);
				// storage.local.set('offlineCache', offlineCheckbox.checked);
				storage.local.set('showAds', true);
				storage.local.set('mods', []);
				storage.local.set('lastVersion', (await (await fetch('/resources/data.json')).json()).updates[0].version);

				/* if (offlineCheckbox.checked) {
					serviceworker.register('/sw-full.js');
					alert(
						'Offline cache is now downloading.\nThe download size is about 1GB, so it may take a while.\n\nPlease do not leave this page while the download is in progress.\nYou will be notified when the download is complete.'
					);
					// @ts-expect-error
					try installPwaEvent.prompt();
					catch (error) console.error('Failed to prompt PWA install:', error)
				} else serviceworker.register('/sw.js'); */

				// @ts-expect-error
				window.top.location.href = '/';
			}
		});
	});
} else if (window.location.pathname === '/mods/mods/' || window.location.pathname === '/mods/resourcepacks/') {
	document.addEventListener('DOMContentLoaded', async () => {
		const addonType: 'mods' | 'resourcepacks' = window.location.pathname === '/mods/mods/' ? 'mods' : 'resourcepacks';
		const addonData: { id: string; name: string; description: string; author: string; authorLink: string; source: string }[] = (await (await fetch('/resources/data.json')).json()).addons;
		const modList = document.querySelector('.mod-list');
		// @ts-expect-error
		addonData[addonType].forEach((addon) => {
			const modItem = document.createElement('div');
			modItem.classList.add('mod-item');
			modItem.innerHTML = `<div class="mod-icon"><img loading="lazy" src="/resources/mods/icons/${addon.id}.webp" /></div><div class="mod-details"><strong class="mod-name">${
				addon.name
			}</strong><p class="mod-author">By <a href="${addon.authorLink} target="_blank">${addon.author}</a></p><p class="mod-description">${addon.description}</p></div><div class="mod-links">${
				addonType === 'mods'
					? `<a class="mod-install" id="mod-install-${addon.id}" onclick="mods.toggle('${addon.id}')">Install</a>`
					: `<a href="/resources/mods/downloads/${addon.id}.zip" class="mod-download" download>Download</a>`
			}</div>`;
			modList?.appendChild(modItem);
		});

		if (addonType === 'mods') {
			const installedMods = storage.local.get('mods') ?? [];
			const modElements = Array.from(document.getElementsByClassName('mod-install')) as HTMLAnchorElement[];
			modElements.forEach((modElement) => {
				const modId = /^mod-install-(.*)$/.exec(modElement.id)?.[1];
				if (installedMods.includes(`/resources/mods/downloads/${modId}.js`)) {
					modElement.textContent = 'Uninstall';
					modElement.classList.add('installed');
				}
			});
		}
	});
} else if (window.location.pathname === '/updates/') {
	document.addEventListener('DOMContentLoaded', async () => {
		const updatesContainer = document.getElementById('updates-container');
		const updateData: { version: string; changelog: string[] }[] = (await (await fetch('/resources/data.json')).json()).updates;
		updateData.forEach((update) => {
			const versionHeader = document.createElement('strong');
			versionHeader.textContent = `MineXLauncher ${update.version}`;
			updatesContainer?.appendChild(versionHeader);

			const changelog = document.createElement('ul');
			update.changelog.forEach((change) => {
				const changelogItem = document.createElement('li');
				changelogItem.textContent = change;
				changelog.appendChild(changelogItem);
			});

			updatesContainer?.appendChild(changelog);
		});
	});
}

if (window.location.hostname === null) {
	// Stop the minifier from removing these functions
	console.debug([navigate, query, versionSelector, game, mods, base64Gzip]);
}
