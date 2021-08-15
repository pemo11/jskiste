// ============================================================
// file: ixDbHelper2.js
// Es geht, allerdings noch nicht unmittelbar nach dem Löschen der IndexedDb-Datenbank, sondern
// erst nach dem erneuten Refresh werden alle Länder angezeigt
// ============================================================

// ============================================================
// initData(url, dbName, HTMLElement)
// Initialisieren der Datenbank
// ============================================================
function initData(url, dbName, elTab) {

    var indexedDB = window.indexedDB;
    var objectStoreName = "countries";
    var openRequest = indexedDB.open(dbName, 1);
    
    // Datenbank muss neu angelegt/aktualisiert werden (abhängig von der Versionsnummer)
    openRequest.onupgradeneeded = () => {
        console.log("*** onupgradeneeded ***");
    
        // Object store anlegen
        let laenderDb = openRequest.result;
        if (!laenderDb.objectStoreNames.contains(objectStoreName)) {
            laenderDb.createObjectStore(objectStoreName, {keyPath: "country"})
            console.log(`*** Objectstore ${objectStoreName} wurde angelegt. ***`)
        }

    }
    
    // Datenbank wurde geöffnet
    // genial, dass der Event-Handler auch async sein kann
    openRequest.onsuccess = async () => {
        console.log("*** onsuccess ***");
        let laenderDb = openRequest.result;
    
        insertCountryData(url, laenderDb,elTab);
       
        // Ausgabe der Länderdaten aus der IndexedDb
        // Dieser Aufruf funktioniert noch nicht, da er vor dem Abschluss von insertCountryData ausgeführt wird
        await getCountries(dbName, elTab);
    }

    openRequest.onerror = () => {
        console.log("!!! Fehler beim Öffnen der Datenbank !!!", openRequest.error);
    }
    
}

// ============================================================
// insertCountryData(url, laenderDb)
// Einfügen der Webdaten in die IndexedDb
// ============================================================
async function insertCountryData(url, laenderDb,elTab) {
    console.log("*** insertCountryData ***");
    var jsonText = await getLaenderInfo(url);
    var countriesData = JSON.parse(jsonText);
    var objectStoreName = "countries";
    
    let transaction = laenderDb.transaction("countries", "readwrite");
    let countries = transaction.objectStore(objectStoreName);
    
    countriesData.forEach(country => {
        let putRequest = countries.put(country);
        putRequest.onsuccess = () => {
            // console.log("*** put() war erfolgreich ***")
        }
        putRequest.onerror = () => {
            console.log("!!! Fehler bei put()", putRequest.error);
        }
        })
        console.log(`${countriesData.length} Länder wurden hinzugefügt ***`)
        // Ohne await wäre der Aufruf nur als Teil von insertCountryData möglich!
        // getCountries(dbName, elTab);
    }
    
// ============================================================
// getLaenderInfo(url)
// Abrufen der Webdaten
// ============================================================
async function getLaenderInfo(url) {
    console.log("*** getLaenderInfo ***");
    var fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type","text/json; charset=UTF-8");
    
    var request = new Request(url, {
        method:"GET",
        headers:fetchHeaders,
        mode:"no-cors"
    });
    
    // fetch(url)
    try {
        let fetchResponse = await fetch(request)
        return await fetchResponse.text();
    } catch(err) {
        console.log("Fehler bei Fetch:", err);
    }
}


// ============================================================
// getCountries(dbName, elTable)
// Abrufen der Daten  aus der IndexedDb
// async damit beim Aufruf ein await die weitere Verarbeitung blockiert ?
// ============================================================
async function getCountries(dbName, elTable) {
    console.log("*** getCountries ***");
    let indexedDB = window.indexedDB;
    let openRequest = indexedDB.open(dbName, 1);
    let objectStoreName = "countries";
    openRequest.onsuccess = () => {
        console.log("*** openRequest->success ***");
        let laenderDb = openRequest.result;
        let transaction = laenderDb.transaction(objectStoreName, "readonly");
        let countries = transaction.objectStore(objectStoreName);

        // Abrufen aller Inhalte
        let countriesRequest = countries.getAll();

        countriesRequest.onsuccess = () => {
            console.log("*** countriesRequest->success ***");
            if (countriesRequest.result !== undefined) {
                countriesRequest.result.forEach(country => {
                    var elTr = document.createElement("tr");
                    var elTd = document.createElement("td");
                    elTd.innerText = country.country;
                    elTr.appendChild(elTd)
                    elTd = document.createElement("td");
                    elTd.innerText = country.capitol;
                    elTr.appendChild(elTd)
                    elTd = document.createElement("td");
                    elTd.innerText = country.population;
                    elTr.appendChild(elTd)
                    elTd = document.createElement("td");
                    elTd.innerText = country.hdi;
                    elTr.appendChild(elTd)
                    var elImg = document.createElement("img");
                    elImg.setAttribute("src", country.flagUrl);
                    elImg.setAttribute("height",32);
                    elImg.setAttribute("width",48);
                    elTr.appendChild(elImg);
                    elTable.appendChild(elTr);
                })
            } else {
                console.log("!!! Keine Daten (sehr seltsam) !!!")
            }
        };

        countriesRequest.onerror = () => {
            console.log("!!! Fehler beim Abrufen der Countries !!!", countriesRequest.error);
        };
    };

    openRequest.onerror = () => {
        console.log("!!! Fehler beim Öffnen der Datenbank !!!", openRequest.error);
    }

}

