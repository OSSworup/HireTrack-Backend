export interface userPayload {
    sub: string;
}
export type RegisterUserInput = {
    name: string;
    email: string;
    password: string;
};
export type LoginUserInput = {
    email: string;
    password: string;
};
export type UpdateUserData = {
    name?: string;
    email?: string;
    isActive?: boolean;
};
