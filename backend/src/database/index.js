const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");
const Contact = require("../models/contact.js");

const connection = new Sequelize(dbConfig);

Contact.init(connection);

module.exports = connection;
