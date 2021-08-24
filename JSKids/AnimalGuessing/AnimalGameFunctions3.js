// AnimalGameFunctions3.js1

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

function starteRateRunde(anzahlTiere) {
    console.log(`*** Aufruf mit starteRateRunde mit anzahlTiere=${anzahlTiere} ***`)
    let anzahlFelder = anzahlTiere * 2
    let rateFeld = holeRateFeld(anzahlTiere, tiere.length)
    rateTiere = []
    rateFeld.forEach(z => rateTiere.push(tiere[z]))
    let elTab = document.getElementById("tabAnimals")
    elTab.innerHTML = ""
    for(i=0;i<anzahlFelder;i++) {
        // Bei jedem 2. Element neue Zeile anlegen
        if (i % Math.sqrt(anzahlFelder) == 0) {
            tr = document.createElement("tr")
            elTab.appendChild(tr)
        }
        td = document.createElement("td")
        divAnimal = document.createElement("div")
        divAnimal.setAttribute("data-index", i)
        divAnimal.addEventListener("click", (event) => {
            anzahlVersuche++
            let index = event.currentTarget.getAttribute("data-index")
            console.log(`*** index=${index} indexTier1=${indexTier1} Tier=${rateTiere[index].name} ***`)
            // index merken
            if (indexTier1 == -1) {
                indexTier1 = index
            } else {
                treffer = rateTiere[index].name == rateTiere[indexTier1].name ? true : false
                if (treffer) {
                    alert("Treffer!")
                    anzahlTreffer++
                }
                indexTier1 = -1
            }
            let target = event.currentTarget
            event.currentTarget.querySelector("img").setAttribute("src", "Material/Tiere/" + rateTiere[index].img)
            event.currentTarget.querySelector("div").innerText = rateTiere[index].name
            setTimeout(() => {
                if (!treffer) {
                    target.querySelector("img").setAttribute("src", "Material/Tiere/RedQuestionMark.png")
                    target.querySelector("div").innerText = ""
                }
            }, 2500)
        })
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

