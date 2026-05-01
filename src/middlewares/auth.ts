import "dotenv/config";
import jwt from "jsonwebtoken";
import {type Response, type NextFunction } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import type { userPayload } from "../types/user.types.js";
import prisma from "../prisma/client.js";

const secretKey=process.env.JWT_SECRET as string;


const authMiddleware=async (req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader=req.header("authorization");

    if(!authHeader){
        return res.status(401).send("Access denied");
    }

    const [,token]=authHeader.split(" ");

    if(!token){
        return res.status(401).send("Access denied");
    }

    try{
        const payload=jwt.verify(token,secretKey) as userPayload;
        const user=await prisma.user.findUnique({
            where:{id:payload.sub},
            include:{
                userRoles:{
                    include:{
                        role:true,
                    },
                },
            },
        });

        if(!user){
            return res.status(401).send("User not found");
        }

        req.user={
            id:user.id,
            email:user.email,
            roles:user.userRoles.map((ur)=>ur.role),
        }
        next();
    }catch(error){
        res.status(401).send("Your session is expaired please log in again");
    }

}

const generateToken=(userData:userPayload)=>{
    return jwt.sign(userData,secretKey,{expiresIn:30000});
}

export {generateToken,authMiddleware};
