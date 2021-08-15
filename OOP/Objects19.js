// file: Object19.js
// Statische Members

class User {

    constructor(name) {
        this.name = name;
        User.Id++
    }

    // Id ist static und gehört damit zur class-Definition selber und nicht zu einer Instanz von User
    static Id = 0;

    toString() {
        return `*** UserId= ${User.Id} Name=${this.name} ***`
    }
}

let user1 = new User("Hajo");
let user2 = new User("Peppo");

console.log(user1.toString());
console.log(user2.toString());