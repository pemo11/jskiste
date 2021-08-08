// file: Object15.js

// Über Objekte iterieren
// Wie Object14.js nur dieses Mal mit Konstruktor-Function

function Person (firstName, lastName, birthdate, telefon) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.birthdate = birthdate,
    this.telefon = telefon
}

let EAvHan = new Person("Ernst August", "von Hannover", "26.02.1954", "0511-3488123")

// Alternativ mit benannten Argumenten
// let EAvHan =  new Person({firstName:"Ernst August", lastName:"von Hannover", birthdate:"26.02.1954", telefon:"0511-3488123")

// Auflisten über for..in
console.log("*** Über for..in ***")
for(let key in EAvHan)
{
    console.log(`${key}:${EAvHan[key]}`)
}

// Auflisten über Object.keys()
console.log("*** Nur die keys ***")
Object.keys(EAvHan).forEach(key => console.log(key))

console.log("*** Keys und Values***")
Object.keys(EAvHan).forEach(key => console.log(`${key}=>${EAvHan[key]}`))

// Auflisten über Object.entries()
console.log("*** Entries ***")
Object.entries(EAvHan).forEach((key, value) => console.log(`${key}:${value}`))

// Auflisten über Object.getOwnPropertyNames()
console.log("*** getOwnPropertyNames ***")
Object.getOwnPropertyNames(EAvHan).forEach(key => console.log(`${key}:${EAvHan[key]}`))
