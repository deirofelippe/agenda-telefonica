const nodeEnv = process.env.NODE_ENV;
const isCI = nodeEnv === "ci";
const isTesting = nodeEnv === "testing";
const isProduction = nodeEnv === "production";
const isDevelopment = nodeEnv === "development";

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const testDbConfig = () => ({
  host: "mysql",
  username: "root",
  password: "root",
  database: "agenda_test",
  dialect: "mysql",
});

const ciDbConfig = () => ({
  host: "localhost",
  username: "root",
  password: "root",
  database: "agenda_test",
  dialect: "mysql",
});

const productionDbConfig = () => ({
  username: process.env.DB_USERNAME_PROD,
  password: process.env.DB_PASSWORD_PROD,
  database: process.env.DB_DATABASE_PROD,
  host: process.env.DB_HOST_PROD,
  dialect: process.env.DB_DIALECT_PROD,
});

const developmentDbConfig = () => ({
  host: "mysql",
  username: "root",
  password: "root",
  database: "agenda",
  dialect: "mysql",
});

const chooseDbConfig = {
  test: testDbConfig,
  development: developmentDbConfig,
  production: productionDbConfig,
  ci: ciDbConfig,
};

const dbConfigFunction = chooseDbConfig[nodeEnv];

const env = {
  nodeEnv,
  isTesting,
  isProduction,
  isDevelopment,
  isCI,
  region,
  accessKeyId,
  secretAccessKey,
  dbConfig: dbConfigFunction(),
};

export { env };
