// file: Aufgabe4.js
// https://www.freecodecamp.org/news/learn-promise-async-await-in-20-minutes/
// Get Country Data

const fetchCountry = async (alpha3Code) => {
    try {
        const result = await fetch(
            `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
        )
        const data = await result.json()

        return data
    } catch (error) {
        console.log(error)
    }
}

const fetchNeighbors = async (countryCode) => {
    try {
        const country = await fetchCountry(countryCode);

        // Geniale Technik, die Rückgaben beliebiger vieler Abfragen werden gesammelt
        // Am Ende ist neighbors ein Array mit Json-Objekten
        const neighbors = await Promise.all(
            country.borders.map(border => fetchCountry(border))
        );

        return neighbors;
    } catch (error) {
        console.log(error)
    }
}