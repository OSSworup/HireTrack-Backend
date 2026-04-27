import type { LoginUserInput, RegisterUserInput } from "../types/user.types.js";
export declare const RegisterUserService: (data: RegisterUserInput) => Promise<{
    user: {
        id: number;
        email: string;
        role: import("../generated/prisma/enums.js").Role;
    };
    token: string;
}>;
export declare const LoginUserService: (data: LoginUserInput) => Promise<{
    user: {
        id: number;
        email: string;
        role: import("../generated/prisma/enums.js").Role;
    };
    token: string;
}>;
export declare const FetchUserService: (id: number) => Promise<{
    email: string;
    password: string;
    role: import("../generated/prisma/enums.js").Role;
    id: number;
} | null>;
