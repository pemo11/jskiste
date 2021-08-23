// file: ixDbHelper1.js

async function getJsonData(url) {
    try {

        var reqHeaders = new Headers();
        reqHeaders.append("Content-Type","text/plain; charset=UTF-8");

        const options = {
            method: "GET",
            mode: "no-cors",
            headers:reqHeaders
         };

        
        let res = await fetch(url, options);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Holt die Wiki-Länder-Daten als Objekte
async function getLaenderData() {
    let urlLaender = "https://www.activetraining.de/WikiLaender.json";
    try {
        let res = await getJsonData(urlLaender);
        return JSON.parse(res)
    } catch (error) {
        console.log(error);
    }
}

async function initLaenderDb() {

    if (!("indexedDB" in window)) {
        console.log("!!! Browser unterstützt kein IndexedDb (Skandal!) !!!");
        return;
    }

    var inxDB = window.indexedDB;

    // Datenbank mit ObjectStore anlegen
    const objectStoreName = "countries";
    let db = inxDB.open("laenderDb", 1, (laenderDb) => {
        if (!laenderDb.objectStoreNames.contains("countries")) {
            laenderDb.createObjectStore(objectStoreName, {keyPath: "country"})
            console.log(`*** Objectstore ${objectStoreName} wurde angelegt. ***`)
        }
    });

    db.then(async(db) => {
        // Alles löuft nur im Rahmen einer Transaktion?
        var tx = db.transaction("store", "readonly");
        var laenderStore = tx.objectStore("countries");
    
        // Alle Json-Daten holen
        var laender = await getLaenderData();
        console.log(`*** ${laeder.length} Länder eingelesen ***`)
    
        // Daten in Datenbank übertragen
        laender.forEach(land => {
            laenderStore.put(land)
        });
        return tx.complete; 
    }).then(()=> {
        console.log("*** Die Datenbank wurde komplett aktualisiert ***");
    })
    

};

function getLaenderFromDb() {
    return [{
        country:"Nanowa",
        capitol:"Omalo",
        population:1000,
        hdi:0.9999
    }]
}



/*
db.then(db => {
    // Alles löuft nur im Rahmen einer Transaktion?
    var tx = db.transaction("store", "readonly");
    var laenderStore = tx.objectStore("countries");

    // Alle Json-Daten holen
    var laender = await getLaenderData();

    // Daten in Datenbank übertragen
    laender.forEach(land => {
        laenderStore.put(land)
    });
    return tx.complete; 
}).then(()=> {
    console.log("*** Datenbank wurde aktualisiert ***");
})

*/