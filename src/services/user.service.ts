import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";
import type { LoginUserInput, RegisterUserInput, UpdateUserData } from "../types/user.types.js";
import { generateToken } from "../middlewares/auth.js";

export const RegisterUserService = async (data: RegisterUserInput) => {
    const { name, email, password } = data;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const userRole = await prisma.role.findUnique({
        where: { name: "USER" },
    });

    if (!userRole) {
        throw new Error("User role not found")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            userRoles: {
                create: [{ roleId: userRole.id }]
            }
        }
    });

    return {
        user: {
            sub: user.id,
            email: user.email,
        }
    };
}

export const LoginUserService = async (data: LoginUserInput) => {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error("user not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Incrroect password");
    }

    const payload = {
        sub: user.id,
    }

    const token = generateToken(payload);
    return {
        user: {
            sub: user.id,
            email: user.email,
        },
        token,
    };
}

export const FetchUserService = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id: id },
        include: {
            userRoles: {
                include: {
                    role: true,
                },
            },
        },
    });
}

export const FetchAllUsers = async (page: number = 1, size: number = 5) => {
    const skip = (page - 1) * size;
    return await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip: skip,
        take: size,
    });;
}

export const UpdateUserService = async (id: string, data: UpdateUserData) => {
    return await prisma.user.update({
        where: { id },
        data,
    })
}

export const UpdateUserPasswordService = async (id: string, password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return await prisma.user.update({
        where: { id },
        data: {
            password: hashedPassword,
        }
    });
}

export const AssignUserRoleService=async (userId:string,roleIds:string[])=>{
    await prisma.$transaction([
        prisma.userRole.deleteMany({
            where:{userId:userId},
        }),

        prisma.userRole.createMany({
            data:roleIds.map((roleId)=>({
                roleId,
                userId,
            })),
            skipDuplicates:true,
        })
    ]);
}

export const DeleteUserService = async (id: string) => {
    return await prisma.user.delete({
        where: { id }
    })
}




