import { type Request, type Response } from "express";
import type { LoginUserInput, RegisterUserInput } from "../types/user.types.js";
import type { AuthRequest } from "../types/auth.types.js";
export declare const RegisterUser: (req: Request<{}, {}, RegisterUserInput>, res: Response) => Promise<void>;
export declare const LoginUser: (req: Request<{}, {}, LoginUserInput>, res: Response) => Promise<void>;
export declare const FetchUser: (req: AuthRequest, res: Response) => Promise<void>;
