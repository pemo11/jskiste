// file: Object17.js
// Mixin - Klasse mit Methoden, die von anderen Klassen ohne Vererbung verwendet werden k�nnen
// Mixins sind praktisch, da es bei JavaScript nur eine Einfach-Vererbung gibt
// Mixin => Behavior f�r andere Klassen?

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
// Es kopiert damit die Werte aller aufz�hlbaren Eigenschaften von einem Quell- auf ein Zielobjekt
// Das Zielobjekt wird zur�ckgegeben
// in diesem Fall erh�lt die prototype-Property alle Properties des myMixin-Objekts
// Damit gibt es beim User-Objekt auch die Methoden-Members sayHello() und sayBye()
Object.assign(User.prototype, myMixin);

new User("Pemo").sayHello();

new User("Hajo").sayBye();

