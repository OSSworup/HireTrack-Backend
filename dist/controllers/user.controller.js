import { RegisterUserService, LoginUserService, FetchUserService, FetchAllUsers as FetchAllUsersService, UpdateUserService, UpdateUserPasswordService, AssignUserRoleService, DeleteUserService, } from "../services/user.service.js";
import {} from "express";
export const RegisterUser = async (req, res) => {
    try {
        const result = await RegisterUserService(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const LoginUser = async (req, res) => {
    try {
        const result = await LoginUserService(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const FetchUser = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: "Not authenticated" });
        }
        const result = await FetchUserService(req.user.id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const FetchAllUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 5;
        const result = await FetchAllUsersService(page, size);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const UpdateUser = async (req, res) => {
    try {
        const result = await UpdateUserService(req.params.id, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const UpdateUserPassword = async (req, res) => {
    try {
        const result = await UpdateUserPasswordService(req.params.id, req.body.password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const AssignUserRole = async (req, res) => {
    try {
        await AssignUserRoleService(req.params.id, req.body.roleIds);
        res.status(200).json({ message: "User roles updated successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const DeleteUser = async (req, res) => {
    try {
        const result = await DeleteUserService(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//# sourceMappingURL=user.controller.js.map