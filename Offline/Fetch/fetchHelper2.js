// ============================================================================
// fetchHelper2.js
// fetch mit promise, daher alles in einer Function (?)
// ============================================================================

// Holt die Wiki-Länder-Daten als Objekte
function getLaenderData() {
    let urlLaender = "https://www.activetraining.de/WikiLaender.json";

    var fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type","text/plain; charset=UTF-8");

    const fetchOptions = {
        method: "GET",
        mode: "no-cors",
        headers: fetchHeaders
     };

    fetch(urlLaender, fetchOptions)
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
        return JSON.parse(jsonData);
    })
    .catch(error => {
        console.log("!!! Fehler im fetch-Aufruf: " + error);
        return JSON.parse('[{"country":"TakaTuka-Land"}]');
    })
}
