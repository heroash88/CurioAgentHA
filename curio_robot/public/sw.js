// Comprehensive Service Worker for Curio PWA
const CACHE_NAME = 'curio-v2';
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/curio_icon.png',
    '/curio_mascot.png'
];

// Install event - precache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache and precaching core assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - Cache-First for assets, Stale-While-Revalidate for JS/CSS
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip caching for external image generators to ensure they load reliably
    if (url.hostname.includes('pollinations.ai') || url.hostname.includes('loremflickr.com')) {
        return;
    }

    // Determine strategy based on file type
    const isStaticAsset = url.pathname.match(/\.(png|jpg|jpeg|gif|svg|mp3|wav|ogg|glb|gltf|json|ico)$/);
    const isCode = url.pathname.match(/\.(js|css)$/);

    if (isStaticAsset) {
        // Cache First for media and models (heavy assets)
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    } else if (isCode || url.pathname === '/') {
        // Stale-While-Revalidate for code and index
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
                return cachedResponse || fetchPromise;
            })
        );
    } else {
        // Generic dynamic caching
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});
