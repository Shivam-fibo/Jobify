import express from "express";
import {getAllJobs, getmyJobs, postJob, updateJob} from "../controllers/jobController.js"
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router()
router.get("/getAll", getAllJobs)
router.post("/post",isAuthenticated, postJob)
router.get("/getmyJobs", getmyJobs)
router.put("/update/:id", isAuthenticated,updateJob)

export default router