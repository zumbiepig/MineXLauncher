const CACHE_VERSION = 'v1.4'
const CACHE_NAME = `minexlauncher-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';
const ASSETS_TO_CACHE = [OFFLINE_URL, '/resources/images/icons/favicon.png', '/resources/styles/themes/default.css', '/resources/scripts/google-tag.js'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
				console.error('Failed to install service worker: ', error);
			});
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
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
			caches.match(event.request).then((response) => {
				return response || fetch(event.request);
			})
		);
	}
});
