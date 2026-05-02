import { type Request, type Response } from "express";
import type { LoginUserInput, RegisterUserInput, UpdateUserData } from "../types/user.types.js";
import type { AuthRequest } from "../types/auth.types.js";
export declare const RegisterUser: (req: Request<{}, {}, RegisterUserInput>, res: Response) => Promise<void>;
export declare const LoginUser: (req: Request<{}, {}, LoginUserInput>, res: Response) => Promise<void>;
export declare const FetchUser: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const FetchAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const UpdateUser: (req: Request<{
    id: string;
}, {}, UpdateUserData>, res: Response) => Promise<void>;
export declare const UpdateUserPassword: (req: Request<{
    id: string;
}, {}, {
    password: string;
}>, res: Response) => Promise<void>;
export declare const AssignUserRole: (req: Request<{
    id: string;
}, {}, {
    roleIds: string[];
}>, res: Response) => Promise<void>;
export declare const DeleteUser: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
