// file: sw-helper.js

// Es kommt auf die Groß-/Kleinschreibung an
// !!! Ohne Https muss der Host über localhost angesprochen werden, nicht über die IP-Adresse !!!
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("sw.js")
    .then(registration => {
        console.log(`*** Der Service Worker wurde für Scope=${registration.scope} registriert ***`);
    })
    .catch(err => {
        console.log("!!! Fehler bei der Service Worker-Registrierung " + err + "!!!");
    });
} else {
    console.info("!!! ServiceWorker werden leider nicht unterstützt (hääh?) !!!");
}
