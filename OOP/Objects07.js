// File: Objects07.js

// Ausnahme Erstellen von Objekten durch Object Literal Notation

let str1 = "Ein einfacher String"

let str2 = new String("Auch ein String...")

// Liefert ein false
console.log(str1 instanceof String)
// Liefert ein false
console.log(typeof str1 === "String")

// Liefert ein true
console.log(str2 instanceof String)
// Liefert ein false, da typeof object liefert
console.log(typeof str2 === "String")

