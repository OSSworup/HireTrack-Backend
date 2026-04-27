import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";
import type { LoginUserInput, RegisterUserInput } from "../types/user.types.js";
import { generateToken } from "../middlewares/auth.js";

export const RegisterUserService=async (data: RegisterUserInput)=>{
    const {email,password}=data;
    const existingUser=await prisma.user.findUnique({where:{email}});

    if(existingUser){
        throw new Error('User already exists');
    }
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=await prisma.user.create({
        data:{
            email,
            password:hashedPassword,
            role:"CANDIDATE",
        }
    });

    const payload={
        id:user.id,
        email:user.email,
        //role:user.role,
    }

    const token=generateToken(payload);
    return {
    user: {
      id: user.id,
      email: user.email,
      role:user.role,
    },
    token,
  };
}

export const LoginUserService=async (data: LoginUserInput)=>{
    const {email,password}=data;
    const user=await prisma.user.findUnique({where:{email}});
    
    if(!user){
        throw new Error("user not found");
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error("Incrroect password");
    }

        const payload={
        id:user.id,
        email:user.email,
        role:user.role,
    }

    const token=generateToken(payload);
    return {
    user: {
      id: user.id,
      email: user.email,
      role:user.role,
    },
    token,
  };
}

export const FetchUserService=async(id:number)=>{
    const user=await prisma.user.findUnique({where:{id}});
    return user;
}
