/*
Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const cacheName = 'v2-assets'
const precacheResources = ['/', '/index.html', '/styles/style.css', '/js/functions.js', '/assets/imgs/F1_RM_AWS_Technology_Lockup1_Hzn_White_Standard_CMYK 1.png', 'assets/imgs/section-bg.png', 'assets/videos/intro.mp4'];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
     console.log('Service worker install event!');
     event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

workbox.routing.registerRoute(
     ({request}) => {
          const {destination} = request;
          return destination === 'video';
     },
     new workbox.strategies.CacheFirst({
          cacheName: cacheName,
          plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
               statuses: [0, 200]
          }),
          new workbox.rangeRequests.RangeRequestsPlugin(),
          ],
     }),
);

self.addEventListener('activate', (event) => {
     console.log('Service worker activate event!');
     //remove unwanted caches
     event.waitUntil(
          caches.keys().then(cacheNames =>{
               return Promise.all(
                    cacheNames.map(cache => {
                         if(cache !== cacheName){
                              console.log('Service Worker: Clearing Old Cache');
                              return caches.delete(cache);
                         }
                    })
               )
          })
     );
});
// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
     console.log('Fetch intercepted for:', event.request.url);
     event.respondWith(
          caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
               return cachedResponse;
          }
          return fetch(event.request);
          }),
     );
});