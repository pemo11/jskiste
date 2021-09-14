// flaggenV1.js
// https://www.activetraining.de/Flaggen.json

const dbName = "flaggenDb"
const ostName = "flaggen"
var flaggenDb = null;

// Holt alle Flaggen-Dateien von einem Webserver und macht daraus Objekte
const getFlaggen = (url) => {
    console.log("*** getFlaggen-Aufruf ***")

    var fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type","text/plain; charset=UTF-8");

    const fetchOptions = {
        method: "GET",
        mode: "no-cors",
        headers: fetchHeaders
     };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
        // Erneuter parse()-Aufruf ist falsch
        // return JSON.parse(jsonData);
        return jsonData;
    })
    .catch(error => {
        console.log(`!!! Fehler im fetch-Aufruf: ${error} !!!`);
        return JSON.parse('[{"country":"TakaTuka-Land"}]');
    })
}

const initDb = () => {
    console.log("*** initDb *** ")
    var indexedDB = window.indexedDB;

    var openRequest = indexedDB.open(dbName, 1);
    
    // Datenbank muss neu angelegt/aktualisiert werden (abhängig von der Versionsnummer)
    openRequest.onupgradeneeded = () => {
        console.log("*** initDb - onupgradeneeded ***");
    
        // Object store anlegen
        userDb = openRequest.result;
        if (!userDb.objectStoreNames.contains(ostName)) {
            userDb.createObjectStore(ostName, { key: "country", autoIncrement : true })
            console.log(`*** Objectstore ${ostName} wurde angelegt. ***`)
        }

        // Die Datenbank mit Flaggendaten füllen
        openRequest.onsuccess = () => {
            userDb = openRequest.result;
            let tx = userDb.transaction(ostName, "readwrite");
            let flaggenStore = tx.objectStore(ostName);
            // const url = "https://www.activetraining.de/Flaggen.json"
            const url = "../../Material/WikiLaender.json";

            let flaggen = getFlaggen(url)

            for (flagge of flaggen) {
                flaggenStore.put(flagge)
            }

            console.log(`*** ${flaggen.length} Flaggen wurden im Objectstore ${ostName} angelegt. ***`)
        }
    }
    
    // Datenbank wurde geöffnet
    openRequest.onsuccess = () => {
        console.log("*** initDb - onsuccess ***");
        userDb = openRequest.result;

        // Alles löuft nur im Rahmen einer Transaktion
        var tx = userDb.transaction(ostName, "readwrite");
        var userStore = tx.objectStore(ostName);
        
        return tx.complete; 
        console.log("*** Die Datenbank wurde komplett aktualisiert ***");
       
    }

    openRequest.onerror = () => {
        console.log("!!! Fehler beim Öffnen der Datenbank !!!", openRequest.error);
    }

}

// Hole die nächste Flagge
const getFlagge = () => {
    console.log("*** getFlagge ***")
    return new Promise((resolve, reject) => {
        let openRequest = indexedDB.open(dbName, 1);
        openRequest.onsuccess = (event) => {
            userDb = openRequest.result;
            let tx = userDb.transaction(ostName, "readonly")
            let ost = tx.objectStore(ostName)
            let request = ost.openCursor()
            request.onsuccess = (event) => {
                console.log(`*** getFlagge - openCursor() - onsuccess ***`)
                var cursor = event.target.result
                if (cursor) {
                    cursor.continue()
                    resolve({country:cursor.value.country,flagUrl:cursor.value.flagUrl})
                } else {
                    // Was soll denn hier passieren?
                }
            }
            request.onerror = (err) => {
                console.error("!!! Fehler beim Aufruf von get !!!", err)
                reject(err)
            }
        }
        openRequest.onerror = (err) => {
            console.error("!!! Fehler beim Aufruf von open !!!", err)
            reject(err)
        }
    })

}