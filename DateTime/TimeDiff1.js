// TimeDiff.js

function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}

var d1 = new Date()

// Wait a few seconds

sleep(3000)
.then(d => {
    d2 = new Date()
    dateDiff = d2 - d1
    console.log(`Diff in s: ${dateDiff}`)
})

