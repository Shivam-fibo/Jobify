import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

dotenv.config({ path : "./config/config.env"});

// connecting front-end to back-end using cors
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir : "/tmp/"
}))

export default app