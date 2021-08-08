// file: Object16.js
// class-Befehl statt Konstructor-Function
// Gibt es seit ECMA 2015 als "Syntatic Sugar"

class Person {

    constructor (firstName, lastName, birthdate, telefon) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.birthdate = birthdate,
        this.telefon = telefon
    }

    toString() {
        return `Name= ${this.firstName + " " + this.lastName} Geburtstag= ${this.birthdate} Telefon= ${this.telefon}`
    }
}

let EAvHan = new Person("Ernst August", "von Hannover", "26.02.1954", "0511-3488123")

// toString() wird nicht automatisch ausgeführt wie bei .Net
// console.log(EAvHan.toString())
console.log(EAvHan)

// Es geht noch weiter u.a. mit static, extends und mix-ins (Abstrakte Subklassen)
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Classes