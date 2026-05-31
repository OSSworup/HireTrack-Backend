import express from "express";
import { CreateRole, RoleList, RoleDetails, UpdateRole, DeleteRole, PermissionList, } from "../controllers/role.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { requirePermissions } from "../middlewares/permissionGuard.js";
const router = express.Router();
router.post('/', authMiddleware, requirePermissions("role:create"), CreateRole);
router.get('/', authMiddleware, requirePermissions("role:list"), RoleList);
router.get("/permissions", authMiddleware, requirePermissions("role:list"), PermissionList);
router.get('/:id', authMiddleware, requirePermissions("role:read"), RoleDetails);
router.patch('/:id', authMiddleware, requirePermissions("role:update"), UpdateRole);
router.delete('/:id', authMiddleware, requirePermissions("role:delete"), DeleteRole);
export default router;
//# sourceMappingURL=role.routes.js.map