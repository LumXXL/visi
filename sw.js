var CACHE_NAME = 'visi-v10';
var URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/ChunkFive-Regular.otf',
    '/OpenDyslexic-Regular.otf',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// Install: cache core files
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Activate: clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(name) {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
