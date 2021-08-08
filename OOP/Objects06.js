// File: Objects06.js

// Objekttypen vergleichen mit instanceof

// Objekt vom Typ Dog
function Dog() {
    this.way = "bellt"
    this.say = function (line) {
        console.log(`Der ${this.constructor.name} ${this.way} ${line}`)
    }
}

var dog1 = new Dog("bellt")
dog1.say("Mini Wuff")

// Object vom Typ Object
var dog2 = {
    "way" : "bellt",
    "say" : function (line) {
        console.log(`Der ${this.constructor.name} ${this.way} ${line}`)
    }
}

dog2.say("Big Wuff")

// Rückgabe ist true/false
console.log(dog1 instanceof Dog)
console.log(dog2 instanceof Dog)

// Rückgabe ist true/true
console.log(dog1 instanceof Object)
console.log(dog2 instanceof Object)
