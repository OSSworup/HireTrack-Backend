import {
    RegisterUserService,
    LoginUserService,
    FetchUserService,
    FetchAllUsers as FetchAllUsersService,
    UpdateUserService,
    UpdateUserPasswordService,
    AssignUserRoleService,
    DeleteUserService,
} from "../services/user.service.js";
import { type Request, type Response } from "express";
import type { LoginUserInput, RegisterUserInput, UpdateUserData } from "../types/user.types.js";
import type { AuthRequest } from "../types/auth.types.js";

export const RegisterUser=async(req:Request<{},{}, RegisterUserInput>,res:Response)=>{
    try{
        const result =await RegisterUserService(req.body);
        res.status(201).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}

export const LoginUser=async(req:Request<{},{},LoginUserInput>,res:Response)=>{
    try{
        const result =await LoginUserService(req.body);
        res.status(201).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}

export const FetchUser=async(req:AuthRequest,res:Response)=>{
    try{
        if(!req.user?.id){
            return res.status(401).json({ error: "Not authenticated" });
        }

        const result =await FetchUserService(req.user.id);
        res.status(200).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}

export const FetchAllUsers=async(req:Request,res:Response)=>{
    try{
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 5;

        const result = await FetchAllUsersService(page, size);
        res.status(200).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}

export const UpdateUser=async(req:Request<{id:string},{},UpdateUserData>,res:Response)=>{
    try{
        const result = await UpdateUserService(req.params.id, req.body);
        res.status(200).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}

export const UpdateUserPassword=async(req:Request<{id:string},{},{password:string}>,res:Response)=>{
    try{
        const result = await UpdateUserPasswordService(req.params.id, req.body.password);
        res.status(200).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}

export const AssignUserRole=async(req:Request<{id:string},{},{roleIds:string[]}>,res:Response)=>{
    try{
        await AssignUserRoleService(req.params.id, req.body.roleIds);
        res.status(200).json({ message: "User roles updated successfully" });
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}

export const DeleteUser=async(req:Request<{id:string}>,res:Response)=>{
    try{
        const result = await DeleteUserService(req.params.id);
        res.status(200).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}
