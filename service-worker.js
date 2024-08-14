const CACHE_NAME = 'cache-v1';

async function fetchCacheManifest() {
  const response = await fetch('/cache-manifest.json');
  return response.json();
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    fetchCacheManifest().then((files) => {
      return caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(files);
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
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request);
      })
  );
});
