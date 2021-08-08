// Durchlaufen von zweidimensionalen Arrays

let aEuropeCountries = [{name:"Germany",capital:"Berlin"},{name:"Netherland",capital:"Den Haag"},{name:"Belgium",capital:"Brusselles"}]
let aAsianCountries = [{name:"India",capital:"Deli"},{name:"Vietman",capital:"Hochimin City"},{name:"Malysia",capital:"Kuala Lumpur"}]

let aCountries = [aEuropeCountries, aAsianCountries]

aCountries.forEach((continent, index) => {
    continent.forEach((country, index) => {
        console.log(`Die Hauptstadt von ${country.name} ist ${country.capital}`);
    });
});


