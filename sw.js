self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('blc-store').then((cache) => cache.addAll([
        '/BLC/',
        '/BLC/index.html',
        '/BLC/app.js',
        '/BLC/style.css'
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });