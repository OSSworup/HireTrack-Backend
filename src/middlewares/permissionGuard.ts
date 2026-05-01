import {type Response, type NextFunction } from "express";
import type { AuthRequest } from "../types/auth.types.js";


export const requirePermissions=(...requiredPermissions:String[])=>{
    return (req:AuthRequest,res:Response,next:NextFunction)=>{
        const user=req.user;

        if(!user){
            return res.status(403).json({ message: "Not authenticated" });
        }

        const userPermissions=new Set();

        for(const role of user.roles){
            for(const perm of role.permissions || []){
                userPermissions.add(perm);
            }
        }
        const allowed=requiredPermissions.some((perm)=>{
            return userPermissions.has(perm);
        });

        

        if(!allowed){
            return res.status(403).json({message:"Forbidden"});
        }

        next();
    }
}