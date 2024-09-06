// @ts-nocheck
const CACHE_VERSION = '1.6';
const OFFLINE_URL = '/offline/';
const CACHE_ASSETS = [
	OFFLINE_URL,
	'/resources/images/icons/favicon.webp',
	'/resources/scripts/google-tag.js',
	'/resources/scripts/main.js',
	'/resources/styles/index.css',
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
	'/resources/images/icons/nav/game.webp',
	'/resources/images/covers/minecraft.webp',
	'/resources/images/icons/clients/all.webp',
	// i am deducing that the max file size is 10mb
	// we need to do something else
	//'/game/offline/main/EaglercraftL_1.9.html',
	//'/game/offline/main/EaglercraftX_1.8.html',
	//'/game/offline/main/Eaglercraft_1.5.html',
	'/game/offline/main/Eaglercraft_1.2.5.html',
	//'/game/offline/main/Eaglercraft_b1.7.3.html',
	'/game/offline/main/Eaglercraft_b1.3.html',
	'/game/offline/main/Eaglercraft_a1.2.6.html',
	'/game/offline/main/Eaglercraft_Indev.html',
];

const cacheName = `minexlauncher-v${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then(async (cache) => {
			const totalAssets = CACHE_ASSETS.length;
			let cachedAssets = 0;

			for (const asset of CACHE_ASSETS) {
				await cache.add(asset);
				++cachedAssets;
				const progress = `${cachedAssets.toString()}/${totalAssets.toString()}`;

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
