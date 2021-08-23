// Testet, ob ein Element in einem Array enthalten ist

var z = [11,22,33,44,55,66]

var r = z.find(e => e == 22)

console.log(r)

r = z.find(e => e == 10)

console.log(r == undefined)
