// file: Promise01.js

p1 = new Promise((resolve, reject) => {
    var zahlen = new Array(10);
    for (i=0;i<zahlen.length;i++) {
        zahlen[i] = Math.floor(Math.random()*10) + 1
    }
    resolve(zahlen)
})

p1.then(result => {
    result.forEach(z => {
        console.log(z);
    });
})

