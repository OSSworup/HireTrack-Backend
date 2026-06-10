import express from "express";
const router = express.Router();
import {
    CreateUser,
    LoginUser,
    FetchAllUsers,
    UpdateUser,
    UpdateUserPassword,
    AssignUserRole,
    DeleteUser,
    FetchUserDetails,
    getCurrentUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { requirePermissions } from "../middlewares/permissionGuard.js";

router.post('/', authMiddleware, requirePermissions("user:create"), CreateUser);
router.post('/login', LoginUser);
router.get('/me',authMiddleware,getCurrentUser);
router.get('/:id', authMiddleware, requirePermissions("user:read"), FetchUserDetails);
router.get('/', authMiddleware, requirePermissions("user:list"), FetchAllUsers);
router.patch('/:id', authMiddleware, requirePermissions("user:update"), UpdateUser);
router.patch('/:id/password', authMiddleware, requirePermissions("user:update"), UpdateUserPassword);
router.patch('/:id/roles', authMiddleware, requirePermissions("role:assign"), AssignUserRole);
router.delete('/:id', authMiddleware, requirePermissions("user:delete"), DeleteUser);

export default router;
