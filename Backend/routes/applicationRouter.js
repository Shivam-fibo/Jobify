import express, { Router } from "express";
import {isAuthenticated }from "../middlewares/auth.js"
import {employerGetAllApplications,jobseekerGetAllApplications,jobseekerDeleteApplications} from '../controllers/applicationController.js'
const router = express.Router()

router.get('/jobseeker/getall',isAuthenticated, jobseekerGetAllApplications);
router.get('/employer/getall',isAuthenticated, employerGetAllApplications);
router.delete('/delete/:id',isAuthenticated, jobseekerDeleteApplications);

export default router