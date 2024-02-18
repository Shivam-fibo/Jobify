import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
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

app.use('/api/v1/user', userRouter)
app.use('/api/v2/job', jobRouter)
app.use('/api/v2/application', applicationRouter)

export default app