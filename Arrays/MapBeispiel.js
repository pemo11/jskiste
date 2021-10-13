// Beispiel für die praktische map-Function bei Arrays

var z = [11,22,33,44,55,66,77,88,99]

var gerade = z.map(z => z % 2 == 0)

// Gibt für jede gerade Zahl ein true, für jede ungerade ein false zurück
console.log(gerade)