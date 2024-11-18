import { Sequelize } from "sequelize";
import Contact from "../models/contact.js";
import { env } from "../env.js";
import mysql from "mysql2/promise";

async function createDatabasesIfNotExists() {
  const dbConnection = await mysql.createConnection({
    host: env.dbConfig.host,
    user: env.dbConfig.username,
    password: env.dbConfig.password,
  });

  await dbConnection.query(
    `CREATE DATABASE IF NOT EXISTS ${env.dbConfig.database}`
  );

  if (env.isTesting) {
    await dbConnection.query(
      `CREATE DATABASE IF NOT EXISTS ${env.dbConfig.database}_test`
    );
  }

  await dbConnection.end();
}

await createDatabasesIfNotExists();

const connection = new Sequelize(env.dbConfig);

Contact.init(connection);

export default connection;
