const cacheName = "cache 1";
const appShellFiles = [
    // "/",
    "/icon-512.png",
    "/index.html",
    // "/SW_TEST/style.css"
]

const contentToCache = appShellFiles.concat([]);

self.addEventListener("install", (e) => {
    console.log("Service Worker Install");
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
      })());
})

self.addEventListener("fetch", (e) => {
    if (!(
        e.request.url.startsWith("http:") || e.request.url.startsWith("https:")
    )) {
        return;
    }
    
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
      })());
})