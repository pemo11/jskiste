// AnimalGameFunctions1.js1

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

function holeRateZahlen(anzahl, max) {
    var zahlen = []
    for(i=0;i<anzahl;i++) {
        do {
            z = Math.floor(Math.random() * max)

        } while (zahlen.find(e => e == z) != undefined)
        zahlen.push(z)
    }
    return zahlen
}

function starteRateRunde(anzahlTiere) {
    let rateZahlen = holeRateZahlen(anzahlTiere, tiere.length)
    let rateTiere = []
    rateZahlen.forEach(z => rateTiere.push(tiere[z]))
    let elTab = document.getElementById("tabAnimals")
    elTab.innerHTML = ""
    for(i=0;i<anzahlTiere;i++) {
        // Bei jedem 2. Element neue Zeile anlegen
        if (i % Math.sqrt(anzahlTiere) == 0) {
            tr = document.createElement("tr")
            elTab.appendChild(tr)
        }
        td = document.createElement("td")
        divAnimal = document.createElement("div")
        divAnimal.setAttribute("data-index", i)
        divAnimal.addEventListener("click", (event) => {
            let index = event.currentTarget.getAttribute("data-index")
            let target = event.currentTarget
            event.currentTarget.querySelector("img").setAttribute("src", "Material/Tiere/" + rateTiere[index].img)
            event.currentTarget.querySelector("div").innerText = rateTiere[index].name
            setTimeout(() => {
                target.querySelector("img").setAttribute("src", "Material/Tiere/RedQuestionMark.png")
                target.querySelector("div").innerText = ""
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

