// file: Objects11.js

// Es gibt noch einiges zum Thema Prototypes, z.B. Protoype-Chains, da ein Prototype-Objekt (nat�rlich) wieder ein Prototype-Objekt besitzt usw.
// Beispiel ist noch nicht vollst�ndig

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes

function Land(name, hauptstadt, einwohnerzahlHauptstadt, einwohnerZahl) {
    this.name = name
    this.hauptstadt = {
        "name": hauptstadt,
        "einwohner": einwohnerzahlHauptstadt
    }
    this.einwohner = einwohnerZahl
    // �berschreiben von toString()
    this.toString = function() { return `Name=${this.name} Hauptstadt=${this.hauptstadt.name}/${this.hauptstadt.einwohner} Einwohner=${this.einwohner}`}
}

let Frankreich = new Land("Frankreich", "Paris", 2175601, 6742200)

let objValue = Frankreich.valueOf()
console.log(objValue)

// Liefert den Prototype der Konstruktor-Function (?)
let proto1 = Object.getPrototypeOf(Frankreich)

// liefert den Prototype einer Instanz der Konstructor-Function (also Klasse) ?
let proto2 = Land.prototype

console.log(Frankreich.toString())

console.log(`Object.getPrototypeOf = ${proto1}`)

console.log(`Land.prototype=${proto2} `)