const Sequelize = require('sequelize');

const db = new Sequelize("postgres://localhost/acme_users_filter");

module.exports = db;