// File: Objects10.js

// Weitere Varianten für die Objekterstellung

function swim(name) {
    console.log(`${name} is swimming...`)
}

function fly(name) {
    console.log(`${name} is flying...`)
}

function dance(name) {
    console.log(`${name} is dancing...`)
}

// Leeres Objekt erstellen und Members einzeln festlegen
var duck1 = new Object();
duck1.name = "Duffy"
duck1.abilities = [swim, fly];

duck1.abilities.forEach(element => {
    element(duck1.name)
});

// Erstellen mit fertigem Objekt
var duck2 = new Object({
    name:"Daisy",
    abilities:[swim, dance]
})

duck2.abilities.forEach(element => {
    element(duck2.name)
});

// Erstellen mit Create()
duck3 = Object.create(duck2)
duck3.name = "Clara"
duck3.abilities.forEach(element => {
    element(duck3.name)
});

