const CACHE_NAME = 'zad-al-quran-v2.0.4';

const PRECACHE_ASSETS = [
  '/Noor-/',
  '/Noor-/index.html',
  '/Noor-/manifest.json',
  '/Noor-/favicon.png',
  '/Noor-/icons/icon-192.png',
  '/Noor-/icons/icon-512.png',
  '/Noor-/icons/icon-maskable-192.png',
  '/Noor-/icons/icon-maskable-512.png'
];

// Install: Cache essential shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Some assets could not be precached:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean old caches and take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-while-revalidate / Cache-first for offline reliability
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignore cross-origin API calls or audio streaming
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle navigations (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/Noor-/index.html') || caches.match('/Noor-/');
      })
    );
    return;
  }

  // Handle static assets with Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
