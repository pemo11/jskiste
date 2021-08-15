// file: Object18.js

// Klassen-Vererbung über extends - es ist nur eine Einfach-Vererbung möglich

class User {

    constructor (username, createDate) {
        this.username = username,
        this.createDate = createDate
    }

    toString() {
        return `*** Username= ${this.username} ***`
    }
}

// Klasse Admin erweitert die Klasse User
class Admin extends User {

    constructor (username, createDate, password) {
        super(username, createDate)
        this.type = "Administrator"
        this.password = password
    }

    toString() {
        return `*** Admin-User ${this.username} ***`
    }

    toStringAdmin() {
        return super.toString()
    }

}

var adminUser = new Admin("pemo", "08/11/2021", "demo+123");

// Aufruf der toString-Methode der Klasse Admin
console.log(adminUser.toString())

// Aufruf der toString-Methode der Klasse User
// Nur provisorisch  - es muss noch einen direkten Weg geben, um eine Super-Methode aufzurufen
console.log(adminUser.toStringAdmin())