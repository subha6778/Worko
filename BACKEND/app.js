import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import userRouter from "./routes/userRoutes.js";
import { config } from "dotenv";

import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";


const app = express();
config({ path: "./config/config.env" });
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/worko', userRouter);
dbConnection();

app.use(errorMiddleware);
export default app;

