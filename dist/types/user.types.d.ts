import type { Role } from "../generated/prisma/enums.js";
export type userRole = Role;
export interface userPayload {
    id: number;
    role: userRole;
}
export type RegisterUserInput = {
    email: string;
    password: string;
    role: userRole;
};
export type LoginUserInput = {
    email: string;
    password: string;
};
