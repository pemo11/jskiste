// ============================================================================
// fetchHelper1.js
// fetch mit await/async
// ============================================================================

// Holt Json-Daten per fetch()
async function getJsonData(url) {
    try {

        var reqHeaders = new Headers();
        reqHeaders.append("Content-Type","text/plain; charset=UTF-8");

        const options = {
            method: "GET",
            mode: "no-cors",
            headers:reqHeaders
         };

        
        let res = await fetch(url, options);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Holt die Wiki-Länder-Daten als Objekte
async function getLaenderData() {
    // let urlLaender = "https://www.activetraining.de/WikiLaender.json";
    let urlLaender = "../../Material/WikiLaender.json";

    try {
        let res = await getJsonData(urlLaender);
        return JSON.parse(res)
    } catch (error) {
        console.log(error);
    }
}

