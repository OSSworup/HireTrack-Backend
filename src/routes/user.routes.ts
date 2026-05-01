import express from "express";
const router=express.Router();
import { RegisterUser,LoginUser, FetchUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { requirePermissions } from "../middlewares/permissionGuard.js";

router.post('/register',authMiddleware,requirePermissions("user:create"),RegisterUser);
router.post('/login',LoginUser);
router.get('/fetch',authMiddleware,requirePermissions("user:read"),FetchUser);

export default router;