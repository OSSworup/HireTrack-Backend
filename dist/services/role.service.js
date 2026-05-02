import prisma from "../prisma/client.js";
export const createRoleService = async (name, description, permissions) => {
    const existingRole = await prisma.role.findUnique({ where: { name } });
    if (existingRole) {
        throw new Error('Role already exists');
    }
    const role = await prisma.role.create({
        data: {
            name,
            description,
            permissions,
        }
    });
    return role;
};
export const roleListService = async (page = 1, size = 5) => {
    const skip = (page - 1) * size;
    return await prisma.role.findMany({
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take: size,
    });
};
export const roleReadService = async (id) => {
    const role = await prisma.role.findUnique({
        where: { id },
        include: {
            userRoles: {
                include: {
                    user: true,
                },
            },
        },
    });
    if (!role) {
        throw new Error("Role not found");
    }
    return role;
};
export const updateRoleService = async (id, data) => {
    if (data.name) {
        const existingRole = await prisma.role.findUnique({ where: { name: data.name } });
        if (existingRole && existingRole.id !== id) {
            throw new Error("Role already exists");
        }
    }
    return await prisma.role.update({
        where: { id },
        data,
    });
};
export const deleteRoleService = async (id) => {
    return await prisma.role.delete({
        where: { id },
    });
};
//# sourceMappingURL=role.service.js.map