// Umgang mit 2D Arrays

var schiffeFeld = new Array(10)

// Geht so leider nicht, da das Array nicht initialisiert ist
for(row in schiffeFeld) {
    console.log("*** Neue Row ***")
    row = new Array(10)
    for(col in row) {
        row[col] = 1
    }
}

console.log(schiffeFeld)

for(var i=0; i < 10;i++) {
    console.log("*** Neue Row ***")
    schiffeFeld[i] = new Array(10)
    for(var j=0;j<10;j++) {
        console.log(`*** Belege Feld ${i}:${j} ***`)
        schiffeFeld[i][j] = 1
    }
}

console.log(schiffeFeld)