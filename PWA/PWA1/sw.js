// file: sw.js - Der Script Worker

const CACHE_NAME = "PWA1";

var cacheFiles = [
    "/",                        // index.html
    "/images/PWA1Logo.png",
    "/images/PWA1Logo_192.png",
    "/images/PWA1Logo_512.png",
    "/css/styles.css",
    "/pwa.webmanifest",
    "/scripts/helper.js"
]

// ==================== Install ====================
self.addEventListener("install", event => {
    console.log("*** ServiceWorker - Install-Event ***");
    event.waitUntil(
        caches.open("PWA1")
        .then(cache => {
            console.log("*** Cache PWA1 wurde geöffnet ***");
            return cache.addAll(cacheFiles);
        })
    )
})

// ==================== Activate ====================
self.addEventListener("activate", event => {
    console.log("*** ServiceWorker - Activate-Event ***");

})

// ==================== Fetch ====================
self.addEventListener("fetch", event => {
    console.log("*** ServiceWorker - Fetch-Event ***");
    console.log(`*** Angefordert wird ${event.request.url} ***`);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    )
})

