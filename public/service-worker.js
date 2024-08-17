const CACHE_NAME = 'minexlauncher';
const OFFLINE_URL = '/offline.html';
const ASSETS_TO_CACHE = [
	OFFLINE_URL,
	'/resources/images/icons/favicon.webp',
	'/resources/scripts/google-tag.js',
	'/resources/scripts/main.js',
	'/resources/styles/mobile.css',
	'/resources/styles/themes/default.css',
	'/resources/styles/themes/light.css',
	'/resources/styles/themes/hyperdark.css',
	'/resources/styles/themes/overworld.css',
	'/resources/styles/themes/nether.css',
	'/resources/styles/themes/the-end.css',
	'/resources/styles/themes/cherry-blossom.css',
	'/resources/styles/themes/retro.css',
	'/resources/styles/themes/starfall.css',
	'/resources/styles/themes/campfire.css',
	'/resources/images/backgrounds/themes/overworld.webp',
	'/resources/images/backgrounds/themes/nether.webp',
	'/resources/images/backgrounds/themes/the-end.webp',
	'/resources/images/backgrounds/themes/cherry-blossom.webp',
	'/resources/images/backgrounds/themes/retro.webp',
	'/resources/images/backgrounds/themes/starfall.webp',
	'/resources/images/backgrounds/themes/campfire.webp',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.delete(CACHE_NAME),
		caches.open(CACHE_NAME).then(async (cache) => {
			return await cache.addAll(ASSETS_TO_CACHE);
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.mode === 'navigate') {
		event.respondWith(
			fetch(event.request).catch(() => {
				return caches.match(OFFLINE_URL);
			})
		);
	} else {
		event.respondWith(
			fetch(event.request).catch(() => {
				return caches.match(event.request);
			})
		);
	}
});
