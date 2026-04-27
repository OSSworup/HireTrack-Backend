import { RegisterUserService, LoginUserService, FetchUserService } from "../services/user.service.js";
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
        const result = await FetchUserService(req.user.id);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//# sourceMappingURL=user.controller.js.map