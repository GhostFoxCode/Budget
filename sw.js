// Service worker minimal : sert uniquement à rendre l'app installable.
// Aucun cache : tout passe par le réseau, donc jamais de version périmée.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
