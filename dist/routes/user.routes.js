import express from "express";
const router = express.Router();
import { RegisterUser, LoginUser, FetchUser } from "../controllers/user.controller.js";
router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/fetch', FetchUser);
export default router;
//# sourceMappingURL=user.routes.js.map