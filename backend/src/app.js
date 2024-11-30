import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import "./types/index.js";
import { env } from "./env.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: env.frontendUrl }));
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

/**
 * @param {RequestExpress} req
 * @param {ResponseExpress} res
 * @param {import("express").NextFunction} next
 * @param {import("express").ErrorRequestHandler} error
 */
function errorHandler(req, res, next, error) {
  console.log(error);

  return res.status(500).json({ message: "Internal Server Error" });
}

export default app;
