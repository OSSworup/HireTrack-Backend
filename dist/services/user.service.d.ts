import type { LoginUserInput, RegisterUserInput, UpdateUserData } from "../types/user.types.js";
export declare const RegisterUserService: (data: RegisterUserInput) => Promise<{
    user: {
        sub: string;
        email: string;
    };
}>;
export declare const LoginUserService: (data: LoginUserInput) => Promise<{
    user: {
        sub: string;
        email: string;
    };
    token: string;
}>;
export declare const FetchUserService: (id: string) => Promise<({
    userRoles: ({
        role: {
            id: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            permissions: string[];
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    })[];
} & {
    id: string;
    email: string;
    password: string;
    name: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const FetchAllUsers: (page?: number, size?: number) => Promise<{
    id: string;
    email: string;
    password: string;
    name: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const UpdateUserService: (id: string, data: UpdateUserData) => Promise<{
    id: string;
    email: string;
    password: string;
    name: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const UpdateUserPasswordService: (id: string, password: string) => Promise<{
    id: string;
    email: string;
    password: string;
    name: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const AssignUserRoleService: (userId: string, roleIds: string[]) => Promise<void>;
export declare const DeleteUserService: (id: string) => Promise<{
    id: string;
    email: string;
    password: string;
    name: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
