import { Sequelize } from "sequelize";
import { config as dbConfig } from "../config/database.js";
import Contact from "../models/contact.js";

const connection = new Sequelize(dbConfig);

Contact.init(connection);

export default connection;
