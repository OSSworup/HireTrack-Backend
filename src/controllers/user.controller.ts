import { RegisterUserService,LoginUserService, FetchUserService } from "../services/user.service.js";
import { type Request, type Response } from "express";
import type { LoginUserInput, RegisterUserInput } from "../types/user.types.js";
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
        const result =await FetchUserService(req.user.id);
        res.status(201).json(result);
    }catch(error:any){
        res.status(400).json({ error: error.message });
    }
}