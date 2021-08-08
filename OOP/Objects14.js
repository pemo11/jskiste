// file: Object14.js

// Über Objekte iterieren

let person = {
    firstName: "Ernst August",
    lastName: "von Hannover",
    passportName: "Ernst August Albert Paul Otto Rupprecht Oskar Berthold Friedrich-Ferdinand Christian-Ludwig Prinz von Hannover Herzog zu Braunschweig und Lüneburg Königlicher Prinz von Großbritannien und Irland",
    birthdate: "26.02.1954",
    telefon: "0511-3488123"
}

// Auflisten über for..in
console.log("*** Über for..in ***")
for(let key in person)
{
    // Abfrage ist optional, da es keine Parents gibt (?)
    if (person.hasOwnProperty(key))
    {
        console.log(`${key}:${person[key]}`)
    }
}

// Auflisten über Object.keys()
console.log("*** Nur die keys ***")
Object.keys(person).forEach(key => console.log(key))

console.log("*** Keys und Values***")
Object.keys(person).forEach(key => console.log(`${key}=>${person[key]}`))

// Auflisten über Object.values()
console.log("*** Values***")
Object.values(person).forEach(value => console.log(value))

// Auflisten über Object.entries()
// Was bedeuten die Zahlen, da sie über keys() nicht aufgelistet werden?
console.log("*** Entries ***")
Object.entries(person).forEach((key, value) => console.log(`${key}:${value}`))

// Auflisten über Object.getOwnPropertyNames()
console.log("*** getOwnPropertyNames ***")
Object.getOwnPropertyNames(person).forEach(key => console.log(`${key}:${person[key]}`))
