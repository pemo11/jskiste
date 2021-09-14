// Highscore-Verwaltung für das Kopfrechnen-Spiel

const dbName = "rechendb"
const ostName = "scores"
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
        
        // Einen Highscore in der Datenbank anlegen - der key wird automatisch generiert
        let date = new Date()
        userStore.put({timestamp:date.toString(), player:"pemo", score:100})

        return tx.complete; 
        console.log("*** Die Datenbank wurde komplett aktualisiert ***");
       
    }

    openRequest.onerror = () => {
        console.log("!!! Fehler beim Öffnen der Datenbank !!!", openRequest.error);
    }
    
}


// async function getUser(username, pin) {
function getScores() {
    console.log("*** getScores ***");
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);
        openRequest.onsuccess = (event) => {
            userDb = openRequest.result;
            var tx = userDb.transaction(ostName, "readonly")
            var ost = tx.objectStore(ostName)
            var request = ost.getAll()
            request.onsuccess = (event) => {
                console.log(`*** getScores - onsuccess - ${request.result.length} ***`)
                resolve(request.result)
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

// Legt einen Hightscore in der Datenbank an
function newScore(player, score) {
    console.log("*** newScire ***");
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);

        openRequest.onsuccess = (event) => {
            console.log("*** newScore - onsuccess ***");
            userDb = openRequest.result;

            // Alles löuft nur im Rahmen einer Transaktion
            var tx = userDb.transaction(ostName, "readwrite");
            var scoreStore = tx.objectStore(ostName);
            
            let date = new Date()
            var request = scoreStore.put({timestamp:date.toString(), player:player, score:score})
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


