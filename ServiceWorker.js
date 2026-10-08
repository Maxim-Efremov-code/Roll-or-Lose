const cacheName = "Maksim Games-Roll or Lose-1.1.0";
const contentToCache = [
    "Build/83d9cd619e8b34bfd383a7681578b001.loader.js",
    "Build/ae0a56a7db938492edbcba0936e0fd92.framework.js.unityweb",
    "Build/48b811e0d7ec279fb5b6330b3b3b9db9.data.unityweb",
    "Build/a3d345c835c8c4d4814e4669a08a3a70.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
