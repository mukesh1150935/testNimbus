import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Connection from "./Database/db.js";
import Router from "./routes/route.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger/swagger.Json.js";
import { firebaseConn } from "./middleware/initialiaseFirebase.js";
import { authMiddleware } from "./middleware/authController.js";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", false);

const app = express();
const port = process.env.PORT || 8050;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// app.use('/',authMiddleware);
app.use(express.json());
app.use(cors());
app.use("/", Router);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//credentials for mongodb database
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

Connection(username, password);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
