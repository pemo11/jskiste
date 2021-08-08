// file: helper.js

// Es kommt auf die Groß-/Kleinschreibung an
// !!! Ohne Https muss der Host über localhost angesprochen werden, nicht über die IP-Adresse !!!
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("sw.js")
    .then(registration => {
        console.log("*** Service Worker wurde registriert ***");
        console.log("Registration für Scope=" + registration.scope);
    })
    .catch(err => {
        console.log("!!! Fehler bei der Service Worker-Registrierung " + err + "!!!");
    });
} else {
    console.info("!!! ServiceWorker werden leider nicht unterstützt !!!");
}

var flaggen = [];
flaggen.push({name:"Abchasien",path:"images/Abkhazia.png"});
flaggen.push({name:"Afghanistan",path:"images/Afghanistan.png"})
flaggen.push({name:"Albanien",path:"images/Albania.png"})
flaggen.push({name:"Algerien",path:"images/Algeria.png"})
flaggen.push({name:"Ägypten",path:"images/Egypt.png"})
var flaggenIndex = 0;

function imgNext() {
    if (flaggenIndex < flaggen.length - 1) {
        flaggenIndex++;
    } else {
        flaggenIndex = 0;
    }
    var elImg = document.getElementById("imgFlagge");
    elImg.src = flaggen[flaggenIndex].path;
    var elDiv = document.getElementById("divFlaggenName");
    elDiv.innerHTML = flaggen[flaggenIndex].name;
}

function imgPrev() {
    if (flaggenIndex > 0) {
        flaggenIndex--;
    } else {
        flaggenIndex = flaggen.length - 1;
    }
    var elImg = document.getElementById("imgFlagge");
    elImg.src = flaggen[flaggenIndex].path;
    var elDiv = document.getElementById("divFlaggenName");
    elDiv.innerHTML = flaggen[flaggenIndex].name;
}

function imgInit() {
    console.log("*** Aufruf von imgInit() ***");
    var elImg = document.getElementById("imgFlagge");
    elImg.src = flaggen[flaggenIndex].path;
    var elDiv = document.getElementById("divFlaggenName");
    elDiv.innerHTML = flaggen[flaggenIndex].name;
}

imgInit();