// File: Objects02.js

// Die Rolle von this

function say(line) {
    console.log(`Der ${this.objectType} ${this.way} ${line}`)
}

var bigDog = {objectType: "Hund", way:"bellt", say:say}

bigDog.say("Wuff Wuff...")

