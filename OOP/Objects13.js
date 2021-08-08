// file: Object13.js

// Alle Methoden des String-Objekts �ber den Prototype auflisten

// getOwnPropertyNames() gibt ein Array mit allen Eigenschaftsnamen zur�ck
let methods = Object.getOwnPropertyNames(String.prototype).filter(item => typeof String.prototype[item] === "function")

console.log("*** Die Methods ***")
methods.forEach(method => {
    console.log(method)
})

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


console.log("*** Die Properties ***")
let Frankreich = new Land("Frankreich", "Paris", 2175601, 6742200)

// Liefern jeweils length,name,arguments,caller,prototype
// properties = Object.getOwnPropertyNames(Land)
// properties = Object.getOwnPropertyNames(Land.prototype.constructor)

// Liefert nichts
// properties = Object.getOwnPropertyNames(Frankreich.prototype)

// Liefert name,hauptstadt,einwohner,toString
properties = Object.getOwnPropertyNames(Frankreich)
// Ohne toString(), da es eine Function ist
// properties = Object.getOwnPropertyNames(Frankreich).filter(item => typeof String.prototype[item] !== "function")
properties.forEach(prop => {
    console.log(prop)
})


