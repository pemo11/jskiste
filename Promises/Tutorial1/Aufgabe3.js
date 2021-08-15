// file: Aufgabe3.js
// https://www.freecodecamp.org/news/learn-promise-async-await-in-20-minutes/
// Get Country Data

const fetchCountry = async (alpha3Code) => {
    try {
        const result = await fetch(
            `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
        )
        const data = await result.json()

        return data
    }
    catch (error) {
        console.log(error)
    }
}
