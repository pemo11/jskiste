// file: Aufgabe1.js
// https://www.freecodecamp.org/news/learn-promise-async-await-in-20-minutes/
// Guessing game mit Promises

const enterNumber = () => {
    return new Promise((resolve, reject) => {
        const userNumber = Number(window.prompt("Gib eine Zahl ein (1-6):"))
        if (isNaN(userNumber)) {
            reject(new Error("Diese Eingabe ist keine Zahl"))
        }
        const randomNumber = Math.floor(Math.random() * 6 + 1)
        if (userNumber == randomNumber) {
            resolve({
                points: 2,
                randomNumber
            })
        } else if (
            userNumber === randomNumber - 1 || userNumber === randomNumber + 1
        ) {
            resolve({
                points: 1,
                randomNumber
            })
        } else {
            resolve({
                points: 0,
                randomNumber
            })
        }
    });
}

const continueGame = () => {
    return new Promise((resolve) => {
        if (window.confirm("Noch eine Runde?")) {
            resolve(true)
        } else {
            resolve(false)
        }
    })
}

const handleGuess = () => {
    enterNumber()
    .then(result => {
        alert(`Gewürfelt wurde die ${result.randomNumber}: Deine Punktzahl: ${result.points} ${result.points !== 1 ? "Punkte" : "Punkt"}`)

        continueGame()
        .then(result => {
            if (result) {
                handleGuess()
            } else {
                alert("Das Spiel ist zu Ende")
            }
        })
    })
    .catch((error)=> alert(error))
}

handleGuess()
