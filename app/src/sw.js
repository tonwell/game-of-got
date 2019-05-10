// eslint-disable-next-line no-undef
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// eslint-disable-next-line no-undef
if (workbox) {
  workbox.precaching.precacheAndRoute([]);
  
  workbox.routing.registerRoute(
      /\.(?:js|css|html)$/,
      new workbox.strategies.StaleWhileRevalidate({
          cacheName: "static-resources",
      })
  );
  workbox.routing.registerRoute(
    /\.(?:jpg|png|jpeg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: "images",
    })
  );
  workbox.routing.registerRoute(
    'https://www.anapioficeandfire.com/api/characters?page=2&pageSize=20',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "API",
    })
  );
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}