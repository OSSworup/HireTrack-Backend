import "dotenv/config";
import { type Response, type NextFunction } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import type { userPayload } from "../types/user.types.js";
declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const generateToken: (userData: userPayload) => string;
export { generateToken, authMiddleware };
