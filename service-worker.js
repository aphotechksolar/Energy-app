self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("aphotech-cache").then(cache => {
      return cache.addAll([
        "energy-assessment.html",
        "logo.png",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
