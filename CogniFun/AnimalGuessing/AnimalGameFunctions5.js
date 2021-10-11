// AnimalGameFunctions5.js1

var tiere = [
    {name:"Affe", img:"Affe.png", info:"Lebt auf Bäumen und springt von Ast zu Ast"},
    {name:"Bär", img:"Baer.png", info:"Ist nicht nur putzig, sodern kann dem Menschen auch gefährlich werden"},
    {name:"Der Elefant", img:"Elefant.png", info:"Hat ein sehr gutes Gedächtnis"},
    {name:"Die Eule", img:"Eule.png", info:"Ist nur Nachts aktiv, meistens im Wald"},
    {name:"Der Fisch", img:"Fisch.png", info:"Lebt im Wasser"},
    {name:"Der Flamingo", img:"Flamingo.png", info:"Lange Beine und sehr schöne Farben"},
    {name:"Der Fuchs", img:"Fuchs.png", info:"Ist schlau und nicht ganz ungefährlich"},
    {name:"Die Giraffe", img:"Giraffe.png", info:"Hat einen sehr laaangen Hals"},
    {name:"Der Hai", img:"Hai.png", info:"Schwimmt im Wasser und macht den meisten Menschen Angst"},
    {name:"Der Hase", img:"Hase.png", info:"Hat oft sehr lange Ohren"},
    {name:"Der Hirsch", img:"Hirsch.png", info:"Ein stolzes Tier mit einem großen Geweih"},
    {name:"Der Igel", img:"Igel.png", info:"Klein, stachelig, lebt in den Gärten und hustet nachts"},
    {name:"Der Koala", img:"Koala.png", info:"Lebt in Bäumen sehr weit weg von uns"},
    {name:"Der Löwe", img:"Loewe.png", info:"Der König der Tiere"},
    {name:"Der Panda", img:"Panda.png", info:"Sehr selten und immer vom Aussterben bedroht"},
    {name:"Der Papagei", img:"Papagei.png", info:"Kann gut sprechen"},
    {name:"Das Pferd", img:"Pferd.png", info:"Eigentlich ein Nutztier, doch die meisten Menschen sitzen lieber darauf"},
    {name:"Der Pinguin", img:"Pinguin.png", info:"Ein putziges Tier, vor allem in der Gruppe. Lebt oft an Orten, an denen es sehr kalt ist"},
    {name:"Die Schildkröte", img:"Schildkroete.png", info:"Ein sehr langsames Tierchen, das sehr alt wird"},
    {name:"Der Seehund", img:"Seehund.png", info:"Lebt am Meer und an Stränden und besitzt einen Namen, der gar nicht zu ihn passt"},
    {name:"Der Tiger", img:"Tiger.png", info:"Der König des Dschungels"},
    {name:"Das Zebra", img:"Zebra.png", info:"Fällt vor allem durch seine Streifen auf und ist im Straßenverkehr auf der ganzen Welt überall auf der Straße"},
    {name:"Ein Yak", img:"Yak.png", info:"Ein etwas seltsames Tier mit einem dicken Fell"},
    {name:"Die Qualle", img:"Qualle.png", info:"Möchte man am Strand nicht begegnen"},
    {name:"Das Chamäleon", img:"Chamaeleon.png", info:"Kann eine Körpereigenschaft sehr schnell wechseln"},
    {name:"Die Gans", img:"Gans.png", info:"Weiß, langer Hals und begeehrt bei vielen Füchsen"},
]

var rateTiere = null
var indexTier1 = -1
var treffer = false
var anzahlVersuche = 0
var anzahlTreffer = 0
var startZeit = 0
var spielModus = false
var bereitsUmgedreht = null

// Gibt ein Feld mit allen Karten zurück (z.B. 2x8)
function holeRateFeld(anzahl, max) {
    let anzahlFelder = anzahl * 2
    var rateFeld = new Array(anzahlFelder)
    console.log(`*** Feld mit ${rateFeld.length} Plätzen angelegt ***`)
    for(i=0;i<anzahl;i++) {
        // 1. Platz Nr. ziehen
        do {
            z1 = Math.floor(Math.random() * anzahlFelder)
            // Abfrage auf undefined
        } while (rateFeld[z1] != undefined)
        // Karten Nr ziehen
        do {
            z2 = Math.floor(Math.random() * max)
            //  Wurde z2 bereits gezogen? (wieder Abfrage auf undefined)
        } while ( rateFeld.find(e => e == z2) != undefined)
        // z2 auf Platz z1 ablegen
        rateFeld[z1] = z2 
        // Platz für die 2. Karte ziehen
        do {
            z3 = Math.floor(Math.random() * anzahlFelder)
        //  Abfrage auf undefined
        } while (rateFeld[z3] != undefined)
        rateFeld[z3] = z2
        console.log(`*** Durchlauf Nr. ${i+1}: Karte ${z2} wird auf Platz ${z1} und ${z3} abgelegt ***`)
    }
    return rateFeld
}

// Relativ kompliziert, da der Ausgangswert Millisekunden sind
function getTimeString(msValue) {
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

// Ausgabe des aktuellen Spielstandes
function spielStatusAusgabe(statusMsg) {
    var elTab = document.querySelector("#tabSpielStatus")
    var msDiff = new Date() - startZeit
    elTab.rows[0].cells[1].innerText = getTimeString(msDiff)
    elTab.rows[1].cells[1].innerText = anzahlVersuche
    elTab.rows[2].cells[1].innerText = anzahlTreffer
    elTab.rows[3].cells[1].innerHTML = statusMsg
}

// Spielrunde starten
function starteRateRunde(anzahlTiere) {
    console.log(`*** Aufruf mit starteRateRunde mit anzahlTiere=${anzahlTiere} ***`)
    startZeit = new Date()
    anzahlTreffer = 0
    anzahlVersuche = 0
    anzahlKarten = anzahlTiere
    spielModus = true
    bereitsUmgedreht = []
    // Spielstatus ausgeben
    spielStatusAusgabe("Das Spiel hat begonnen")
    // Buttons deaktivieren/aktivieren
    var elStart = document.querySelector("#btnStart")
    var elEnde = document.querySelector("#btnEnde")
    elStart.setAttribute("disabled", "")
    elEnde.removeAttribute("disabled")
    let anzahlFelder = anzahlTiere * 2
    let rateFeld = holeRateFeld(anzahlTiere, tiere.length)
    rateTiere = []
    rateFeld.forEach(z => rateTiere.push(tiere[z]))
    let elTab = document.getElementById("tabAnimals")
    elTab.innerHTML = ""
    for(i=0;i<anzahlFelder;i++) {
        // Bei jedem nten Element neue Zeile anlegen
        if (i % Math.sqrt(anzahlFelder/2) == 0) {
            tr = document.createElement("tr")
            elTab.appendChild(tr)
        }
        td = document.createElement("td")
        divAnimal = document.createElement("div")
        divAnimal.setAttribute("data-index", i)
        divAnimal.addEventListener("click", (event) => {

            let index = event.currentTarget.getAttribute("data-index")
            console.log(`*** index=${index} indexTier1=${indexTier1} Tier=${rateTiere[index].name} ***`)

            // Wurde das Feld bereits umgedreht?
            if (bereitsUmgedreht.find(e => e == index) != undefined) {
                // Event-Handler vorzeitig verlassen
                // Wichtig: Merker-Index für das erste Tier zurücksetzen
                indexTier1 = -1
                event.preventDefault();
                console.log("*** 1 - Click-Event wird vorzeitig verlassen ***")
            }

            //  Wurde das bereits aufdeckte Feld erneut angeklickt
            if (index == indexTier1) {
                // Karte wieder verdecken
                event.currentTarget.querySelector("img").setAttribute("src", "Material/Tiere/RedQuestionMark.png")
                event.currentTarget.querySelector("div").innerText = ""
                // Wichtig: Merker-Index für das erste Tier zurücksetzen
                indexTier1 = -1
                // Event-Handler vorzeitig verlassen
                // event.preventDefault();
                // bei event.preventDefault() hat event.currentTarget... keine Wirkung, daher return!
                console.log("*** 2 - Click-Event wird vorzeitig verlassen ***")
                return
            }

            let target = event.currentTarget
            event.currentTarget.querySelector("img").setAttribute("src", "Material/Tiere/" + rateTiere[index].img)
            event.currentTarget.querySelector("div").innerText = rateTiere[index].name

            // index merken
            if (indexTier1 == -1) {
                // Nur beim ersten Klick zählen
                anzahlVersuche++
                indexTier1 = index
            } else {
                treffer = rateTiere[index].name == rateTiere[indexTier1].name ? true : false
                if (treffer) {
                    anzahlTreffer++
                    spielStatusAusgabe(`<span style='background:blue'>Das war ein Treffer</span>`)
                    // Index der umgedrehten Felder merken
                    bereitsUmgedreht.push(index)
                    bereitsUmgedreht.push(indexTier1)
                    // Ist das Spiel zu Ende?
                    if (anzahlTreffer === anzahlTiere) {
                        // Blockiert das Aufdecken des letzten Bildes?
                        // Allgemein ist ein alert nicht optimal
                        // setTimeout(alert(`Du hast gewonnen - mit ${anzahlVersuche} Versuchen!`), 1)
                        spielStatusAusgabe(`<span style='background:red'>Du hast gewonnen - mit ${anzahlVersuche} Versuchen!</span>`)
                        // Buttons deaktivieren/aktivieren
                        var elStart = document.querySelector("#btnStart")
                        var elEnde = document.querySelector("#btnEnde")
                        elEnde.setAttribute("disabled", "")
                        elStart.removeAttribute("disabled")
                        // Spielmodus setzen (spielt aktuell noch keine Rolle)
                        spielModus = false
                    }
                    // Wichtig: Merker-Index für das erste Tier zurücksetzen
                    indexTier1 = -1
                } else {
                    // Timer setzen, so dass beide Spielsteine wieder umgedreht werden
                    setTimeout(() => {
                        console.log(`*** setTimeout-Aufruf mit index=${index} indexTier1=${indexTier1} ***`)
                        elDiv = document.querySelector(`[data-index='${index}']`)
                        elDiv.querySelector("img").setAttribute("src", "Material/Tiere/RedQuestionMark.png")
                        elDiv.querySelector("div").innerText = ""
                        elDiv = document.querySelector(`[data-index='${indexTier1}']`)
                        elDiv.querySelector("img").setAttribute("src", "Material/Tiere/RedQuestionMark.png")
                        elDiv.querySelector("div").innerText = ""
                        indexTier1 = -1
                    }, 2500)
                    spielStatusAusgabe("Spiel läuft...")
                    }
                }
            })
        
            // Bei Bewegen des Mauszeigers über ein Tier soll eine Info eingeblendet werden
            divAnimal.addEventListener("mouseover", (event) => {
                let index = event.currentTarget.getAttribute("data-index")
                event.currentTarget.setAttribute("title", rateTiere[index].info)

            })
            img = document.createElement("img")
            img.setAttribute("src", "Material/Tiere/RedQuestionMark.png")
            divName = document.createElement("div")
            divName.setAttribute("class", "animalInfo")
            divAnimal.appendChild(img)
            divAnimal.appendChild(divName)
            td.appendChild(divAnimal)
            tr.appendChild(td)
        }

}

// Spielrunde vorzeitig beenden
function beendeRateRunde() {
    // Buttons deaktivieren/aktivieren
    var elStart = document.querySelector("#btnStart")
    var elEnde = document.querySelector("#btnEnde")
    elEnde.setAttribute("disabled", "")
    elStart.removeAttribute("disabled")
    // Alle Karten aufdecken
    for(i=0;i<anzahlKarten * 2; i++) {
        // Hole das div-Element mit einem bestimmten data-index-Attribut, z.B. 0
        let elDiv = document.querySelector(`[data-index='${i}'`)
        // Hole das img-Element, das auf das div-Element folgt
        let elImg = elDiv.querySelector("img")
        elImg.setAttribute("src", "Material/Tiere/" + rateTiere[i].img)
        // Hole das div-Element, das auf das div-Element folgt (geniale Schreibweise dank QuerySelector)
        let elDivName = elDiv.querySelector("div")
        elDivName.innerText = rateTiere[i].name
    }

    // Spiel "offiziell" beenden
    spielModus = false

}

