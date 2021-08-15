// file: ixDbHelper3.js


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
    
    // Datenbank muss neu angelegt/aktualisiert werden (abhängig von der Versionsnummer)
    openRequest.onupgradeneeded = async () =>  {
        console.log("*** onupgradeneeded ***");
        var objectStoreName = "countries";
    
        // Object store anlegen
        let laenderDb = openRequest.result;
        if (!laenderDb.objectStoreNames.contains(objectStoreName)) {
            laenderDb.createObjectStore(objectStoreName, {keyPath: "country"})
            console.log(`*** Objectstore ${objectStoreName} wurde angelegt. ***`)
        }

        var countriesData = await getCountries()
        
        let transaction = laenderDb.transaction(objectStoreName, "readwrite");
        let countries = transaction.objectStore(objectStoreName);
        
        countriesData.forEach(country => {
            let putRequest = countries.put(country);
            putRequest.onsuccess = () => {

            }

            putRequest.onerror = () => {
                console.log("!!! Fehler bei put() !!!", putRequest.error);
            }
            console.log(`*** ${countriesData.length} Countries wurden hinzugefÜgt ***`)
        });
        return countriesData;
    }
}

async function getData(dbName) {

    var indexedDB = window.indexedDB;
    var openRequest = indexedDB.open(dbName, 1);

    // Datenbank wurde geöffnet
    // genial, dass der Event-Handler auch async sein kann
    openRequest.onsuccess = async () => {
        console.log("*** onsuccess ***");
        let objectStoreName = "countries";
        let laenderDb = openRequest.result;
        let transaction = laenderDb.transaction(objectStoreName, "readonly");
        let countries = transaction.objectStore(objectStoreName);
        let countriesData = [];

        // Abrufen aller Inhalte
        let countriesRequest = countries.getAll();

        countriesRequest.onsuccess = async () => {
            console.log("*** countriesRequest->success ***");
            if (countriesRequest.result !== undefined) {
                countriesRequest.result.forEach(country => {
                    countriesData.push(country);
                })
            } else {
                console.log("!!! Keine Daten (sehr seltsam) !!!")
            }
            console.log(`*** ${countriesData.length} Countries wurden aus der IndexedDb geladen ***`)
            return countriesData;
        };

        countriesRequest.onerror = () => {
            console.log("!!! Fehler beim Abrufen der Countries !!!", countriesRequest.error);
        };
        
    }

    openRequest.onerror = () => {
        console.log("!!! Fehler beim Öffnen der Datenbank !!!", openRequest.error);
    }
    
}

