import { type Request, type Response } from "express";
import { type UpdateRoleData } from "../services/role.service.js";
type CreateRoleInput = {
    name: string;
    description: string;
    permissions: string[];
};
export declare const CreateRole: (req: Request<{}, {}, CreateRoleInput>, res: Response) => Promise<void>;
export declare const RoleList: (req: Request, res: Response) => Promise<void>;
export declare const RoleRead: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const UpdateRole: (req: Request<{
    id: string;
}, {}, UpdateRoleData>, res: Response) => Promise<void>;
export declare const DeleteRole: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export {};
