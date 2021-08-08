// file: Objects12.js

// Die prototype-Functions des String-Objekts
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

let string = "Sommer, Strand und Sonnenstühle"

// split()-Function
let worte = string.split(" ")

worte.forEach(wort => {
    console.log(wort)
})

// indexOf()-Function
console.log(string.indexOf("Strand"))

// replace()-Function
console.log(string.replace("stühle", "liegen"))
