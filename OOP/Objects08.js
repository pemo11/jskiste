// File: Objects08.js

// Vererbung und Polymorphismus

// Das Beispiel funktioniert, aber leider verstehe ich es nur bedingt
// Es ist aber ein faszinierendes Beispiel für die OOP-Fähigkeiten von JavaScript
// https://stackoverflow.com/questions/12762550/example-of-javascript-duck-typing


// Anlegen eines Bird-Konstruktors durch eine Konstruktor-Function
function Bird() {
    this.fly = function(height) {
        return `I am ${this.name} the ${this.type} and I fly ${height} feet high`
    }
}

// Anlegen eines Eagle-Konstruktors durch eine Konstruktor-Function
Eagle.prototype.type= "Eagle";


function Eagle(name) {
    this.name = name
    // Aufruf des Bird-Konstruktors als Mixin - eine Klasse stellt einer anderen Klasse Methoden zur Verfügung, ohne dass die Klasse die Eltern-Klasse sein muss
    // die call-Methode ist über Function.prototype fest eingebaut und ruft die Function über ihren Namen auf und damit den Konstruktor
    Bird.call(this)
}

// Anlegen eines Duck-Konstruktors
Duck.prototype.type = "Duck";

function Duck(name) {
    this.name = name
    Bird.call(this)
}

// Ein Eagle-Objekt anlegen, das eine fly-Methode von der Bird-Klasse erbt
var eagle1 = new Eagle("Eddie")
console.log(eagle1.fly(1000))

// Ein Duck-Objekt anlegen, das eine fly-Methode von der Bird-Klasse erbt
var duck1 = new Duck("Donald")
console.log(duck1.fly(10))

// Liefert ein false
console.log(duck1 instanceof Bird)
console.log(eagle1 instanceof Bird)

// Liefert ein true
console.log(duck1 instanceof Duck)
console.log(eagle1 instanceof Eagle)