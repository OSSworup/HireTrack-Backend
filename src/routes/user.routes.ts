import express from "express";
const router=express.Router();
import {
    RegisterUser,
    LoginUser,
    FetchUser,
    FetchAllUsers,
    UpdateUser,
    UpdateUserPassword,
    AssignUserRole,
    DeleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { requirePermissions } from "../middlewares/permissionGuard.js";

router.post('/register',authMiddleware,requirePermissions("user:create"),RegisterUser);
router.post('/login',LoginUser);
router.get('/fetch',authMiddleware,requirePermissions("user:read"),FetchUser);
router.get('/',authMiddleware,requirePermissions("user:list"),FetchAllUsers);
router.patch('/:id',authMiddleware,requirePermissions("user:update"),UpdateUser);
router.patch('/:id/password',authMiddleware,requirePermissions("user:update"),UpdateUserPassword);
router.patch('/:id/roles',authMiddleware,requirePermissions("role:assign"),AssignUserRole);
router.delete('/:id',authMiddleware,requirePermissions("user:delete"),DeleteUser);

export default router;
