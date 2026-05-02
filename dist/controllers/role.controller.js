import {} from "express";
import { createRoleService, roleListService, roleReadService, updateRoleService, deleteRoleService, } from "../services/role.service.js";
export const CreateRole = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;
        const result = await createRoleService(name, description, permissions);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const RoleList = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 5;
        const result = await roleListService(page, size);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const RoleRead = async (req, res) => {
    try {
        const result = await roleReadService(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const UpdateRole = async (req, res) => {
    try {
        const result = await updateRoleService(req.params.id, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const DeleteRole = async (req, res) => {
    try {
        const result = await deleteRoleService(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//# sourceMappingURL=role.controller.js.map