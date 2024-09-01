// @ts-nocheck
const cacheVersion = '1.6.0';
const cacheName = `minexlauncher-v${cacheVersion}`;
const offlineUrl = '/offline.html';
const cacheAssets = [
	offlineUrl,
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
		caches.open(cacheName).then(async (cache) => {
			const totalAssets = cacheAssets.length;
			let cachedAssets = 0;

			for (const asset of cacheAssets) {
				await cache.add(asset);
				const progress = `${++cachedAssets}/${totalAssets}`;

				console.log(`Cached: ${asset} (${progress})`);
			}
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== cacheName) {
						return caches.delete(key);
					} else {
						return null;
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
				return caches.match(offlineUrl);
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
