// ============================================================================
// file: helper1.js
// ============================================================================

async function getFlaggen1() {
    let urlFlaggen = "https://www.activetraining.de/Flaggen.json";
    try {

        const options = {
            method: "GET",
            mode: "no-cors" };
        
        fetch(urlFlaggen)
            let res = await fetch(urlFlaggen, options);
            return await res.text();
    } catch (error) {
        console.log(error);
    }
}

async function getFlaggen2() {
    let urlFlaggen = "https://www.activetraining.de/Flaggen.json";
    try {

        fetch(urlFlaggen)
            let res = await fetch(urlFlaggen, options);
            return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderFlaggen() {
    let flaggen = await getFlaggen1();
    flaggen = JSON.parse(flaggen);
    let elFlaggen = document.querySelector("#divFlaggen");
    var i = 1;
    flaggen.forEach(flagge => {
        let elFlagge = document.createElement("div");
        elFlagge.setAttribute("class", "flagge");
        let elCountry = document.createElement("div");
        elCountry.innerText = `${flagge.Country}lic (${i++})`;
        elCountry.setAttribute("class", "country");
        let elImg = document.createElement("img");
        elImg.setAttribute("src", flagge.ImageUrl);
        elFlagge.appendChild(elCountry);
        elFlagge.appendChild(elImg);
        elFlaggen.appendChild(elFlagge);
    });
}

renderFlaggen();