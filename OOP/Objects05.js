// File: Objects05.js

// Die Rolle von prototype - dieses Mal wird auch die Function per prototype festgelegt
// Damit this funktioniert, darf die => Schreibweise nicht verwendet werden!

function Dog() {
    // Absichtlich leer...
}

Dog.prototype.way = "bellt"
Dog.prototype.say = function (line) {
    // constructor.name liefert den Namen der Objekttyps
    console.log(`Der ${this.constructor.name} ${this.way} ${line}`)
}

var dog1 = new Dog("bellt")
dog1.say("Mini Wuff")

var dog2 = new Dog()
dog2.say("Big Wuff")
