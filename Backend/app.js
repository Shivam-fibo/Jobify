import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js"
import {dbConnection } from './database/dbConnection .js'
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import {errorMiddleware} from './middlewares/error.js'


const app = express();
dotenv.config({ path: "./config/config.env" });

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

// Use cors middleware with the provided options
app.use(cors(corsOptions));

// Define your routes and other middleware

// Set headers to allow credentials from the specified origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/application', applicationRouter)

dbConnection();

app.use(errorMiddleware);

export default app;


