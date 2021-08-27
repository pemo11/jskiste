
// ixDbLoginHelper1.js

// Es geht alles (jippie), aber nur, da ich auf SO einen Post gefunden, in dem erklärt wurde wie die IndexedDB-API in einen Promise umgewandelt wird
// Es geht also im Moment alles ohne await und async
// Was noch fehlt ist eine Abfrage beim Anlegen eines Benutzers, ob dieser bereits existiert

const dbName = "userdb"
const ostName = "users"
var userDb = null;

function initDb() {

    var indexedDB = window.indexedDB;
    var openRequest = indexedDB.open(dbName, 1);
    
    // Datenbank muss neu angelegt/aktualisiert werden (abhängig von der Versionsnummer)
    openRequest.onupgradeneeded = () => {
        console.log("*** initDb - onupgradeneeded ***");
    
        // Object store anlegen
        userDb = openRequest.result;
        if (!userDb.objectStoreNames.contains(ostName)) {
            userDb.createObjectStore(ostName, { autoIncrement : true })
            console.log(`*** Objectstore ${ostName} wurde angelegt. ***`)
        }
    }
    
    // Datenbank wurde geöffnet
    // genial, dass der Event-Handler auch async sein kann
    openRequest.onsuccess = () => {
        console.log("*** initDb - onsuccess ***");
        userDb = openRequest.result;

        // Alles löuft nur im Rahmen einer Transaktion?
        var tx = userDb.transaction(ostName, "readwrite");
        var userStore = tx.objectStore(ostName);
        
        // Einen User in der Datenbank anlegen - der key wird automatisch generiert
        userStore.put({name:"admin",pin:1234})

        return tx.complete; 
        console.log("*** Die Datenbank wurde komplett aktualisiert ***");
       
    }

    openRequest.onerror = () => {
        console.log("!!! Fehler beim Öffnen der Datenbank !!!", openRequest.error);
    }
    
}


// Gibt User-Objekt für username oder null zurück
// async function getUser(username, pin) {
function getUser(username, pin) {
    console.log("*** getUser ***");
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);
        openRequest.onsuccess = (event) => {
            userDb = openRequest.result;
            var tx = userDb.transaction(ostName, "readonly")
            var ost = tx.objectStore(ostName)
            var userFound = null;
            var request = ost.getAll()
            request.onsuccess = (event) => {
                console.log(`*** getUser -onsuccess - ${request.result.length} ***`)
                // Jetzt suchen
                for(user of request.result) {
                    if (user.name == username && user.pin == pin) {
                        userFound = user
                        // Der key kann nur bei einem Cursor abgefragt werden?
                        console.log(`*** user=${userFound.name} pin=${userFound.pin} found ***`)
                        break
                    }
                }
                resolve(userFound)
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

// Legt einen neuen User in der Datenbank an
function newUser(username) {
    console.log("*** newUser ***");
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);

        openRequest.onsuccess = (event) => {
            console.log("*** newUser - onsuccess ***");
            userDb = openRequest.result;

            // Alles löuft nur im Rahmen einer Transaktion?
            var tx = userDb.transaction(ostName, "readwrite");
            var userStore = tx.objectStore(ostName);
            
            // User anlegen - der Key wird automatisch generiert
            // Pin per random generieren - Zahl zwischen 1000 und 9999
            var newPin = Math.floor(Math.random() * 9000) + 1000
            var request = userStore.put({name:username,pin:newPin})
            request.onsuccess = () => {
                console.log(`*** put mit Success ***`)
                resolve(newPin)
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

// Gibt alle user aus der Datenbank zurück
function getAllUsers() {
    console.log("*** getAllUsers ***");
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);

        openRequest.onsuccess = () => {
            console.log("*** getAllUsers - onsuccess ***");
            userDb = openRequest.result;

            // Alles löuft nur im Rahmen einer Transaktion
            var tx = userDb.transaction(ostName, "readonly");
            var userStore = tx.objectStore(ostName);
            
            // Alle User holen
            var request = userStore.getAll()
            request.onsuccess = () => {
                console.log(`*** get mit Success ***`)
                resolve(request.result)
            }

            request.onerror = () => {
                console.error("!!! Fehler beim Aufruf von get !!!", error)
                reject(err)
            }
        }

        openRequest.onerror = () => {
            console.error("!!! Fehler beim Aufruf von open !!!", err)
            reject(err)
        }
        
    })

}

