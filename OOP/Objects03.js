// File: Objects03.js

// Objekt mit Konstruktor

// Dog ist eine Konstruktor-Function (es gibt keinen R�ckgabewert)
// Eine Konstruktor-Function ist die JavaScript-Version einer Klasse
// Der Name beginnt �blicherweise mit einem Gro�buchstaben
function Dog(objectType) {
    this.objectType = objectType
    this.way = "bellt"
    this.say = (line) => {
    console.log(`Der ${this.objectType} ${this.way} ${line}`)
    }
}

var bigDog = new Dog("Hund")

bigDog.say("Wuff Wuff Wuff...")

