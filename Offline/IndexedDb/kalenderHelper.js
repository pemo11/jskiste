// kalenderHelper.js

const dbName = "kalenderDb"
const ostName = "geburtstage"
var kalenderDb = null;

const initDb = () => {
    var indexedDB = window.indexedDB;
    var openRequest = indexedDB.open(dbName, 1);
    
    // Datenbank muss neu angelegt/aktualisiert werden (abhängig von der Versionsnummer)
    openRequest.onupgradeneeded = () => {
        console.log("*** initDb - onupgradeneeded ***");
    
        // Object store anlegen
        userDb = openRequest.result;
        if (!userDb.objectStoreNames.contains(ostName)) {
            userDb.createObjectStore(ostName, { key: "Name", autoIncrement : true })
            console.log(`*** Objectstore ${ostName} wurde angelegt. ***`)
        }
        
        // Ein paar Einträge in der Datenbank anlegen - Datum im Format jjjj-mm-tt
        openRequest.onsuccess = () => {
            userDb = openRequest.result;
            var tx = userDb.transaction(ostName, "readwrite");
            var userStore = tx.objectStore(ostName);

            userStore.put({name:"Pemo",date:"1984-04-01"})
            userStore.put({name:"Susi",date:"1995-07-11"})

            console.log(`*** Objekte wurden im Objectstore ${ostName} angelegt. ***`)

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

// Holt alle Termine als Objekte mit einer name- und eine date-Eigenschaft
const holeTermine = (Monat) => {
    console.log("*** holeTermine ***");
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);
        openRequest.onsuccess = (event) => {
            userDb = openRequest.result;
            var tx = userDb.transaction(ostName, "readonly")
            var ost = tx.objectStore(ostName)
            var terminFound = null;
            var request = ost.getAll()
            request.onsuccess = (event) => {
                var termine = []
                console.log(`*** holeTermine - onsuccess - ${request.result.length} Termine ***`)
                // Jetzt nach Terminen mit dem Monat suchen
                for(termin of request.result) {
                    // Aus der Zeichenfolge ein Date-Objekt machen
                    var terminDate = new Date(termin.date)
                    // Die Monate vergleichen
                    if (terminDate.getMonth() == Monat) {
                        termine.push(termin)
                        // Quiz: Warum darf ich an date kein .toDateString() anhängen?
                        console.log(`*** termin=${terminDate.toLocaleDateString()} für ${termin.name} ***`)
                    }
                }
                resolve(termine)
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

// Holt alle Termine mit ihrem key, da ein Cursor verwerndet wird
const holeTermineKey = (Monat) => {
    console.log("*** holeTermineKey ***");
    return new Promise((resolve, reject) => {
        let openRequest = indexedDB.open(dbName, 1);
        openRequest.onsuccess = (event) => {
            userDb = openRequest.result;
            let tx = userDb.transaction(ostName, "readonly")
            let ost = tx.objectStore(ostName)
            let termine = []
            let request =  ost.openCursor()
            request.onsuccess = (event) => {
                console.log(`*** holeTermineKey - onsuccess ***`)
                let cursor = event.target.result
                // Gibt es einen (weiteren) Cursor?
                if (cursor) {
                    console.log(`*** Current Cursor key=${cursor.key} *** `)
                    // Aus der Zeichenfolge ein Date-Objekt machen
                    let terminDate = new Date(cursor.value.date)
                    // Die Monate vergleichen
                    if (terminDate.getMonth() == Monat) {
                        termine.push({key:cursor.key,name:cursor.value.name,date:cursor.value.date})
                        console.log(`*** key=${cursor.key} termin=${terminDate.toLocaleDateString()} für ${cursor.value.name} ***`)
                    }
                    // Der Cursor muss bewegt werden - es wird immer der komplette Cursor durchlaufen
                    cursor.continue()
                }
                else {
                    resolve(termine)
                }
            }
            request.onerror = (err) => {
                console.error("!!! holeTermineKey - Fehler beim Aufruf von get !!!", err)
                reject(err)
            }
        }
        openRequest.onerror = (err) => {
            console.error("!!! holeTermineKey - Fehler beim Aufruf von open !!!", err)
            reject(err)
        }
    
    })

}

// Anlegen eines neuen Termins
const neuerTermin = (Name, GebDatum) => {
    console.log("*** neuerTermin ***");
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);

        openRequest.onsuccess = (event) => {
            console.log("*** neuerTermin - onsuccess ***");
            userDb = openRequest.result;

            // Alles löuft nur im Rahmen einer Transaktion?
            var tx = userDb.transaction(ostName, "readwrite");
            var userStore = tx.objectStore(ostName);
            
            // Termin anlegen - der Key wird automatisch generiert
            var request = userStore.put({name:Name,date:GebDatum})
            request.onsuccess = () => {
                console.log(`*** put mit Success ***`)
                resolve("OK")
            }

            request.onerror = (err) => {
                console.error("!!! Fehler beim Aufruf von put !!!", err)
                reject(err)
            }
        
        }

        openRequest.onerror = (err) => {
            console.error("!!! Fehler beim Aufruf von open !!!", err)
            reject(err)
        }   

    })
}

// Löschen eines Termins
const loescheTermin = (key) => {
    console.log("*** loescheTermin ***");
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);

        openRequest.onsuccess = (event) => {
            console.log("*** loescheTermin - onsuccess ***");
            userDb = openRequest.result;

            // Alles löuft nur im Rahmen einer Transaktion
            var tx = userDb.transaction(ostName, "readwrite");
            var userStore = tx.objectStore(ostName);
            
            // Termin löschen
            var request = userStore.delete(key)
            tx.oncomplete = () => {
                console.log(`*** loescheTermin - delete mit Success ***`)
                resolve("OK")
            }

            request.onerror = (err) => {
                console.error("!!! loescheTermin - Fehler beim Aufruf von delete !!!", err)
                reject(err)
            }
        
        }

        openRequest.onerror = (err) => {
            console.error("!!! Fehler beim Aufruf von open !!!", err)
            reject(err)
        }   

    })
}