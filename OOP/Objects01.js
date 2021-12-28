// File: Objects01.js

// Leeres Objekt mit einer Function - etwas umständlich
var dog = {}

dog.saySomething = (line) => {
    console.log(`Der Hund bellt ${line}`)
}

dog.saySomething("Wuff...")