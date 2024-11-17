import { Sequelize } from "sequelize";
import Contact from "../models/contact.js";
import { env } from "../env.js";

const connection = new Sequelize(env.dbConfig);

Contact.init(connection);

export default connection;
