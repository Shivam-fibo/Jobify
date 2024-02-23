import express from "express";
import {register, login, logout} from "../controllers/userController.js";
import {isAuthenticated} from '../middlewares/auth.js'
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout)


export default router