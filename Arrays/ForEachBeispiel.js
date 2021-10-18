// Beispiel für die forEach-Methode

var z = [11,22,33,44,55,66]

// Alle Zahlen ausgeben

z.forEach((el) => {
    console.log(`z=${el}`)
})

z.forEach(el => {
    console.log(`z=${el}`)
})

z.forEach((el, i) => {
    console.log(`Zahl Nr. ${i+1}=${el}`)
})

// So viel freestyle geht dann doch nicht, die kLammern müssen sein
/*
z.forEach(el, i => {
    console.log(`Zahl Nr. ${i+1}=${el}`)
})
*/

// Dafür geht das...

const outnumber = (el, i) => {
    console.log(`f: Zahl Nr. ${i+1}=${el}`)
}

z.forEach(outnumber)