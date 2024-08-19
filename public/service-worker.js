const cacheVersion = '1.5';
const cacheName = `minexlauncher-v${cacheVersion}`;

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then(async (cache) => {
			const response = await fetch('/cacheAssets.json');
			const cacheAssets = await response.json();
			return await cache.addAll(cacheAssets);
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
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.open(cacheName).then(async (cache) => {
			return (await cache.match(event.request)) || fetch(event.request);
		})
	);
});
