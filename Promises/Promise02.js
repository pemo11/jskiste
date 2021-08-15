// file: Promise02.js

// Wichtig: In VS Code wird die Ausgabe teilweise "verschluckt"

// Promise als Rückgabewert einer Function
const getZahlen = () => {
    return new Promise((resolve, reject) => {
        var zahlen = new Array(10);
        for (i=0;i<zahlen.length;i++) {
            zahlen[i] = Math.floor(Math.random()*10) + 1
        }
        resolve(zahlen)
    })
}

// So ist es richtig...
getZahlen()
.then(result => {
    result.forEach(z => {
        console.log(z);
    });
})

// So leider nicht...
var zahlen = getZahlen().then(result => {return result});

// Die Rückgabe ist immer ein promise pending
console.log("Zahlen1=", zahlen)

async function getZahlenAsync() {
    return getZahlen()
}

// So geht es mit await und async
const getZahlen2 = async () => {
    var zahlen2 =  await getZahlenAsync()
    // Wird gar nicht ausgegeben?
    console.log("Zahlen2=", zahlen)
}

getZahlen2()