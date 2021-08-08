// file: sw.js - Der Script Worker

const CACHE_NAME = "PWA2";

// "/",                        // index.html

var cacheFiles = [
    "/pwa/",
    "index.html",                        
    "images/PWA2Logo.png",
    "images/PWA2Logo_192.png",
    "images/PWA2Logo_512.png",
    "images/Abkhazia.png",
    "images/Afghanistan.png",
    "images/Albania.png",
    "images/Algeria.png",
    "images/Egypt.png",
    "favicon.ico",
    "css/styles.css",
    "pwa.json",
    "scripts/helper.js",
    "sw.js"
]

// ==================== Install ====================
self.addEventListener("install", event => {
    console.log("*** ServiceWorker - Install-Event ***");
    event.waitUntil(
        caches.open("PWA2")
        .then(cache => {
            console.log("*** Cache PWA2 wurde geöffnet ***");
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

