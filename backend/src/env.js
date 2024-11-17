const nodeEnv = process.env.NODE_ENV;
const isCI = nodeEnv === "ci";
const isTesting = nodeEnv === "testing";
const isProduction = nodeEnv === "production";
const isDevelopment = nodeEnv === "development";

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const testDbConfig = () => ({
  username: process.env.DB_USERNAME_TEST,
  password: process.env.DB_PASSWORD_TEST,
  database: process.env.DB_DATABASE_TEST,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT_TEST,
});

const ciDbConfig = () => ({
  username: process.env.DB_USERNAME_CI,
  password: process.env.DB_PASSWORD_CI,
  database: process.env.DB_DATABASE_CI,
  host: process.env.DB_HOST_CI,
  dialect: process.env.DB_DIALECT_CI,
});

const productionDbConfig = () => ({
  username: process.env.DB_USERNAME_PROD,
  password: process.env.DB_PASSWORD_PROD,
  database: process.env.DB_DATABASE_PROD,
  host: process.env.DB_HOST_PROD,
  dialect: process.env.DB_DIALECT_PROD,
});

const developmentDbConfig = () => ({
  username: process.env.DB_USERNAME_DEV,
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_DATABASE_DEV,
  host: process.env.DB_HOST_DEV,
  dialect: process.env.DB_DIALECT_DEV,
});

const chooseDbConfig = {
  test: testDbConfig,
  development: developmentDbConfig,
  production: productionDbConfig,
  ci: ciDbConfig,
};

let dbConfig = chooseDbConfig[nodeEnv];

const env = {
  isTesting,
  isProduction,
  isDevelopment,
  isCI,
  region,
  accessKeyId,
  secretAccessKey,
  dbConfig: dbConfig(),
};

export { env };
