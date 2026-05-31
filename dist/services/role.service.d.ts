export type UpdateRoleData = {
    name?: string;
    description?: string;
    permissions?: string[];
    isActive?: boolean;
};
export declare const createRoleService: (name: string, description: string, permissions: string[]) => Promise<{
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    permissions: string[];
}>;
export declare const roleListService: (page?: number, size?: number) => Promise<{
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    permissions: string[];
}[]>;
export declare const roleDetailService: (id: string) => Promise<{
    userRoles: ({
        user: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    })[];
} & {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    permissions: string[];
}>;
export declare const updateRoleService: (id: string, data: UpdateRoleData) => Promise<{
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    permissions: string[];
}>;
export declare const deleteRoleService: (id: string) => Promise<{
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    permissions: string[];
}>;
export declare const permissionListService: () => {
    readonly USER: {
        readonly CREATE: "user:create";
        readonly READ: "user:read";
        readonly UPDATE: "user:update";
        readonly DELETE: "user:delete";
        readonly LIST: "user:list";
    };
    readonly ROLE: {
        readonly CREATE: "role:create";
        readonly READ: "role:read";
        readonly UPDATE: "role:update";
        readonly DELETE: "role:delete";
        readonly LIST: "role:list";
        readonly ASSIGN: "role:assign";
    };
};
