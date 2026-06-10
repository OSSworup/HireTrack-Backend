import prisma from "../../src/prisma/client";
import bcrypt from "bcrypt";
import { PERMISSIONS } from "../../src/common/permissions.js"

async function main() {
    const adminRole = await prisma.role.upsert({
        where: { name: "ADMIN" },
        update: {
            description: "Full access to users, roles, and permissions",
            permissions: [
                PERMISSIONS.USER.CREATE,
                PERMISSIONS.USER.READ,
                PERMISSIONS.USER.LIST,
                PERMISSIONS.USER.DELETE,
                PERMISSIONS.USER.UPDATE,
                PERMISSIONS.ROLE.CREATE,
                PERMISSIONS.ROLE.READ,
                PERMISSIONS.ROLE.LIST,
                PERMISSIONS.ROLE.DELETE,
                PERMISSIONS.ROLE.UPDATE,
                PERMISSIONS.ROLE.ASSIGN
            ]
        },
        create: {
            name: 'ADMIN',
            description: "Full access to users, roles, and permissions",
            permissions: [
                PERMISSIONS.USER.CREATE,
                PERMISSIONS.USER.READ,
                PERMISSIONS.USER.LIST,
                PERMISSIONS.USER.DELETE,
                PERMISSIONS.USER.UPDATE,
                PERMISSIONS.ROLE.CREATE,
                PERMISSIONS.ROLE.READ,
                PERMISSIONS.ROLE.LIST,
                PERMISSIONS.ROLE.DELETE,
                PERMISSIONS.ROLE.UPDATE,
                PERMISSIONS.ROLE.ASSIGN
            ]
        }
    });

    await prisma.role.upsert({
        where: { name: "USER" },
        update: {
            description: "Basic self-read access",
            permissions: [PERMISSIONS.USER.READ],
        },
        create: {
            name: "USER",
            description: "Basic self-read access",
            permissions: [PERMISSIONS.USER.READ],
        }
    })

    const hashedPassword = await bcrypt.hash("Admin@123",10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {
            name: "Admin",
            password: hashedPassword,
            userRoles: {
                deleteMany: {},
                create: [{ roleId: adminRole.id }]
            }
        },
        create: {
            name: "Admin",
            email: "admin@example.com",
            password: hashedPassword,
            userRoles: {
                create: [{ roleId: adminRole.id }]
            }
        }
    })

    console.log("Seeded", admin.email);
};

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    })
