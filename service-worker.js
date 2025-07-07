const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = [
  "/",
  "./index.html",
  "./game1.html",
  "./game2.html",
  "https://static.wikia.nocookie.net/disney/images/2/25/Profile_-_Vanellope_Von_schweetz.jpeg/revision/latest?cb=20190312023329",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
