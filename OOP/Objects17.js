// file: Object17.js
// Mixin - Klasse mit Methoden, die von anderen Klassen ohne Vererbung verwendet werden können
// Mixins sind praktisch, da es bei JavaScript nur eine Einfach-Vererbung gibt
// Mixin => Behavior für andere Klassen?

let myMixin = {

    sayHello() {
        console.log(`Mixin says, hello ${this.name}`);
    },
    sayBye() {
        console.log(`Mixin says, bye,bye ${this.name}`);
    }

}

// Alternativ ginge auch ein class User

function User(name) {
    this.name = name;
}

// assign ruft getters beim Source- und die Setters beim Zielobjekt auf
// Es kopiert damit die Werte aller aufzählbaren Eigenschaften von einem Quell- auf ein Zielobjekt
// Das Zielobjekt wird zurückgegeben
// in diesem Fall erhält die prototype-Property alle Properties des myMixin-Objekts
// Damit gibt es beim User-Objekt auch die Methoden-Members sayHello() und sayBye()
Object.assign(User.prototype, myMixin);

new User("Pemo").sayHello();

new User("Hajo").sayBye();

