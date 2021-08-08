// File: Objects04.js

// Die Rolle von prototype

function Dog() {
    this.say = (line) => {
    // constructor.name liefert den Namen der Objekttyps (ist das Standard JS?)
    console.log(`Der ${this.constructor.name} ${this.way} ${line}`)
    }
}

Dog.prototype.way = "bellt"

var dog1 = new Dog()
dog1.say("Mini Wuff")

var dog2 = new Dog()
dog2.say("Big Wuff")

// Alle Beispiele funktionieren, aber 100% sind mir die Zusammenhänge noch nicht klar
// Erst mit ECMAScript 6 gibt es den class-Befehl als "syntatic sugar für protype based inheritance"