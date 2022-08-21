// Testet, ob ein Element in einem Array enthalten ist

var z = [11,22,33,44,55,66]

// Gibt das erste Element zurück, das das Prädikat erfüllt
var r = z.find(e => e == 22)

console.log(r)

// Findet nichts, so dass r am Ende undefiniert ist
r = z.find(e => e == 10)

console.log(r == undefined)
