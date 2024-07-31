const CACHE_NAME = 'my-app-cache-v1';
const OFFLINE_URL = '/offline.html';
const OFFLINE_GIF = '/resources/images/gifs/offline.gif';

const ASSETS_TO_CACHE = [
    '/',
    OFFLINE_URL,
    OFFLINE_GIF 
];

self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets');
            return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
                console.error('Failed to cache some assets: ', error);
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache: ', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Fetch event for: ', event.request.url);
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                console.log('Network request failed, serving offline page.');
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
