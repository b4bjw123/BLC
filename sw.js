self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('blc-store').then((cache) => cache.addAll([
        '/',
        '/index.html',
        '/app.js',
        '/style.css',
        // '/icon-512.png',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });