self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('blc-store').then((cache) => cache.addAll([
        '/BLC_Dev/',
        '/BLC_Dev/index.html',
        '/BLC_Dev/app.js',
        '/BLC_Dev/style.css'
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });