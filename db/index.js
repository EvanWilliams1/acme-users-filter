const db = require('./db');

const sync = () => {
    return db.sync({force: true})
};

const User = db.define('user', {
    first_name: db.Sequelize.STRING,
    last_name: db.Sequelize.STRING,
    email: db.Sequelize.STRING,
    location: db.Sequelize.STRING
}, {
    classMethods:{
        getLetter: function(){
            return User.last_name.charAt[0];
        }
    }
});

const myUsers = [
    {first_name: "evan", last_name: "williams", email: "evan.williams@fsa.com", location: "home"},
    {first_name: "ryan", last_name: "williams", email: "ryan.williams@fsa.com", location: "boodoir"},
    {first_name: "joanne", last_name: "koski", email: "joanne.koski@fsa.com", location: "miami"},
    {first_name: "bob", last_name: "williams", email: "bob.williams@fsa.com", location: "miami"},
    {first_name: "cora", last_name: "weiss", email: "cora.weiss@fsa.com", location: "boodoir"},
    {first_name: "danielle", last_name: "lefebvre", email: "d.l@fsa.com", location: "miami"}
];

var myLetter = {};

const seed = () => {
    return sync()
    .then(function(){
        console.log("db was synced");
        const creatingUsers = Promise.all(
            myUsers.map( user => User.create(user))
        );
    })
};

module.exports = {
    seed,
    sync,
    User
};