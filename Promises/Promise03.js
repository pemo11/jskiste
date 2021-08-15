// file: Promise03.js

// Promise als Rückgabewert einer Function
function getZahlen() {
    return new Promise((resolve, reject) => {
        var zahlen = new Array(10);
        for (i=0;i<zahlen.length;i++) {
            zahlen[i] = Math.floor(Math.random()*10) + 1
        }
        resolve(zahlen)
    })
}

function getSumme(arr) {
   return new Promise((resolve, reject) => {
        var summe =arr.reduce((accu, cur) => {
            return accu + cur
        });
        resolve(summe)
    })
}

getZahlen()
.then(result1 => {
    getSumme(result1)
    .then(result2 => {
        console.log(`Summe=${result2}`)
    })
    result1.forEach(z => {
        console.log(z);
    });
})


