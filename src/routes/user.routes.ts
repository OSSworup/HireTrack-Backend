import express from "express";
const router=express.Router();
import { RegisterUser,LoginUser, FetchUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.get('/fetch',authMiddleware,FetchUser);

export default router;