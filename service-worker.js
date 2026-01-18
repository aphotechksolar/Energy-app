const CACHE_NAME = "aphotech-solar-v1";

const FILES_TO_CACHE = [
  "/",
  "/energy-assessment.html",
  "/manifest.json",
  "/logo-192.png",
  "/logo-512.png",
  "/screenshot-mobile.png",
  "/screenshot-desktop.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
content://com.android.externalstorage.documents/tree/primary%3Aenergy-app::primary:energy-app/service-worker.js