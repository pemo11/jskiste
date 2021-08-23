// file: ixDbHelper3.js

// Stand: 15/08/21 - funktioniert noch nicht

// ============================================================
// getData()
// Einstiegspunkt für das Abrufen der Daten
// ============================================================
async function getCountryData() {
    // return await getCountries()
    await initData("LaenderDb4")
    return await getData("LaenderDb4");
}

// ============================================================
// getCountries()
// Abrufen der Webdaten
// ============================================================
async function getCountries() {
    const url = "../Material/WikiLaender.json"
    var reqHeaders = new Headers()
    reqHeaders.append("Content-Type","text/plain; charset=UTF-8")

    const options = {
        headers:reqHeaders
    }

    const response = await fetch(url, options)
    const countries = await response.json()
    return countries
}


// ============================================================
// initData(dbName, HTMLElement)
// Initialisieren der Datenbank
// ============================================================
async function initData(dbName) {

    var indexedDB = window.indexedDB;
    var openRequest = indexedDB.open(dbName, 1);
    
    // Datenbank muss neu angelegt/aktualisiert werden (abhÃ¤ngig von der Versionsnummer)
    var countriesData = openRequest.onupgradeneeded = async () =>  {
        console.log("*** initData->onupgradeneeded ***");
        var objectStoreName = "countries";
    
        // Object store anlegen
        let laenderDb = openRequest.result;
        if (!laenderDb.objectStoreNames.contains(objectStoreName)) {
            laenderDb.createObjectStore(objectStoreName, {keyPath: "country"})
            console.log(`*** initData->onupgradeneeded->Objectstore ${objectStoreName} wurde angelegt. ***`)
        }

        var countriesData = await getCountries()
        
        let transaction = laenderDb.transaction(objectStoreName, "readwrite");
        let countries = transaction.objectStore(objectStoreName);
        
        countriesData.forEach(country => {
            let putRequest = countries.put(country);
            putRequest.onsuccess = () => {

            }

            putRequest.onerror = () => {
                console.log("!!! initData->onupgradeneeded->Fehler bei put() !!!", putRequest.error);
            }
            console.log(`*** initData->onupgradeneeded->${countriesData.length} Countries wurden hinzugefügt ***`)
        });
        return countriesData;
    }
    return countriesData;
}

async function getData(dbName) {

    var indexedDB = window.indexedDB;
    var openRequest = indexedDB.open(dbName, 1);

    // Datenbank wurde geöffnet
    // genial, dass der Event-Handler auch async sein kann
    openRequest.onsuccess = async () => {
        console.log("*** getData->onsuccess ***");
        let objectStoreName = "countries";
        let laenderDb = openRequest.result;
        let transaction = laenderDb.transaction(objectStoreName, "readonly");
        let countries = transaction.objectStore(objectStoreName);
        let countriesData = [];

        // Abrufen aller Inhalte
        let countriesRequest = countries.getAll();

        countriesRequest.onsuccess = async () => {
            console.log("*** getData->countriesRequest->onsuccess ***");
            if (countriesRequest.result !== undefined) {
                countriesRequest.result.forEach(country => {
                    countriesData.push(country);
                })
            } else {
                console.log("!!! getData->countriesRequest->Keine Daten (sehr seltsam) !!!")
            }
            console.log(`*** getData->countriesRequest->${countriesData.length} Countries wurden aus der IndexedDb geladen ***`)
            return countriesData;
        };

        countriesRequest.onerror = () => {
            console.log("!!! getData->Fehler beim Abrufen der Countries !!!", countriesRequest.error);
        };
        
    }

    openRequest.onerror = () => {
        console.log("!!! getData->openRequest->Fehler beim Öffnen der Datenbank !!!", openRequest.error);
    }
    
}

