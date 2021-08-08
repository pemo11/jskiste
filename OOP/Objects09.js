// File: Objects09.js

// Duck typing

// Kann nur darüber festgestellt werden, ob beide Objekte eine fly-Methode besitzen
// https://stackoverflow.com/questions/12762550/example-of-javascript-duck-typing


// Anlegen eines Bird-Konstruktors
function Bird() {
    this.fly = function(height) {
        return `I am ${this.name} the ${this.type} and I fly ${height} feet high`
    }
}

// Anlegen eines Eagle-Konstruktors
Eagle.prototype.type= "Eagle";

function Eagle(name) {
    this.name = name
    // Aufruf des Bird-Konstruktors als Mixin - eine Klasse stellt einer anderen Klasse Methoden zur Verfügung, ohne dass die Klasse die Eltern-Klasse sein muss
    Bird.call(this)
}

// Anlegen eines Duck-Konstruktors
Duck.prototype.type = "Duck";

function Duck(name) {
    this.name = name
    Bird.call(this)
}

function isBird(object) {
    if (typeof object !== "object") return false;
    if (typeof object.fly !== "function") return false;
    return true;
}

// Ein Eagle-Objekt anlegen, das eine fly-Methode von der Bird-Klasse erbt
var eagle1 = new Eagle("Eddie")
console.log(eagle1.fly(1000))

// Ein Duck-Objekt anlegen, das eine fly-Methode von der Bird-Klasse erbt
var duck1 = new Duck("Donald")
console.log(duck1.fly(10))

// Ducktyping bedeutet, dass zwei Objekte "gleich" sind, wenn beide diesselbe Methode besitzen
// if it talks like a duck and swims like a duck and quacks like a duck it is a duck

// Liefert ein true
console.log(isBird(eagle1))
console.log(isBird(duck1))
