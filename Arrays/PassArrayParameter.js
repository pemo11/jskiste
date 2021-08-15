// file: PassArrayParameter.js

var zahlen = [];

// Erwartet ein Array als Parameter
function fillArray(arr) {
    for(i=0;i<10;i++) {
        arr.push(i);
    }
}

// Array mit Zahlen füllen
fillArray(zahlen);

// Array ausgeben
zahlen.forEach(element => {
    console.log(element);
})