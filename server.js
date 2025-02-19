import cookieParser from "cookie-parser";
import connectToDb from "./utils/connectToDb.js";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import reportRoute from "./routes/reportRoute.js";
dotenv.config();

import authRoute from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

// ROUTES
app.use(morgan("dev"));
app.use(cookieParser());

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Add this with other routes
app.use("/api/v1/report", reportRoute);
app.use("/api/v1/auth", authRoute);

// connect to DB
connectToDb();

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "something went wrong";
  const stack = error.stack;
  res.status(status).json({ message, stack });
});

app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}`);
});
