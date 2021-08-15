// file: getCountries.js

async function getCountries() {
    const url = "../Material/WikiLaender.json"
    var reqHeaders = new Headers()
    reqHeaders.append("Content-Type","text/plain; charset=UTF-8")

    const options = {
        headers:reqHeaders
    }

    const response = await fetch(url, options)
    const countries = await response.json()
    return countries
}

