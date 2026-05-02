import { type Response, type NextFunction } from "express";
import type { AuthRequest } from "../types/auth.types.js";
export declare const requirePermissions: (...requiredPermissions: String[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
