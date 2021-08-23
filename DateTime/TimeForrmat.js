// TimeFormat.js
// Formatierte Ausgabe eines Zeitwertes

function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}

function getTimeFormat(msValue) {
    var hh = Math.floor(msValue / 1000 / 60 / 60)
    msValue -= hh * 1000 * 60 * 60
    var mm = Math.floor(msValue / 1000 / 60)
    msValue -= mm * 1000 * 60
    var ss = Math.floor(msValue / 1000)
    // Anpassen der Sekunden, z.B. 200s = 2m + 80s
    mm += Math.floor(ss / 60) * 60
    ss = ss % 60
    var timeFormat = `${hh.toString().padStart(2,0)}:${mm.toString().padStart(2,0)}:${ss.toString().padStart
        (2,0)}`
    return timeFormat
}

var d1 = new Date()

// add 4 Minutes
d2 = new Date(d1.getTime() + 4 * 60000)
dateDiff = d2 - d1
dateFormat = getTimeFormat(dateDiff)
console.log(`Diff formatiert: ${dateFormat}`)

// add 200 s => 3 min + 20 s
d2 = new Date(d1.getTime() + 200000)
dateDiff = d2 - d1
dateFormat = getTimeFormat(dateDiff)
console.log(`Diff formatiert: ${dateFormat}`)
