import { type Request, type Response } from "express";
import {
    createRoleService,
    roleListService,
    roleReadService,
    updateRoleService,
    deleteRoleService,
    type UpdateRoleData,
} from "../services/role.service.js";

type CreateRoleInput = {
    name: string;
    description: string;
    permissions: string[];
}

export const CreateRole = async (req: Request<{}, {}, CreateRoleInput>, res: Response) => {
    try {
        const { name, description, permissions } = req.body;
        const result = await createRoleService(name, description, permissions);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const RoleList = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 5;

        const result = await roleListService(page, size);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const RoleRead = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const result = await roleReadService(req.params.id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const UpdateRole = async (req: Request<{ id: string }, {}, UpdateRoleData>, res: Response) => {
    try {
        const result = await updateRoleService(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const DeleteRole = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const result = await deleteRoleService(req.params.id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
