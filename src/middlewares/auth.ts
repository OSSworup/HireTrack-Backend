import "dotenv/config";
import jwt from "jsonwebtoken";
import {type Response, type NextFunction } from "express";
import type { AuthRequest } from "../types/auth.types.js";
import type { userPayload } from "../types/user.types.js";

const secretKey=process.env.JWT_SECRET as string;


const authMiddleware=(req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader=req.header("authorization");

    if(!authHeader){
        return res.status(401).send("Access denied");
    }

    const [,token]=authHeader.split(" ");

    if(!token){
        return res.status(401).send("Access denied");
    }

    try{
        const decoded=jwt.verify(token,secretKey);
        req.user=decoded;
        next();
    }catch(error){
        res.status(401).send("Your session is expaired please log in again");
    }

}

const generateToken=(userData:userPayload)=>{
    return jwt.sign(userData,secretKey,{expiresIn:30000});
}

export {generateToken,authMiddleware};
