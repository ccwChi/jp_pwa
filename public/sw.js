const CACHE_NAME = 'nj-cache-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
  // self.registration.scope already includes whatever path (e.g. a GitHub
  // Pages /repo-name/ prefix) the service worker was registered under.
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.add(self.registration.scope)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Stale-while-revalidate: serve whatever's cached immediately (works offline
// once a page has been visited once), then refresh the cache from the
// network in the background so content stays current when online.
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
