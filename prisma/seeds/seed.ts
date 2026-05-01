import prisma from "../../src/prisma/client";
import bcrypt from "bcrypt";
import { PERMISSIONS } from "../../src/common/permissions.js"

async function main() {
    const adminRole = await prisma.role.create({
        data: {
            name: 'ADMIN',
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

    const userRole = await prisma.role.create({
        data: {
            name: "USER",
            permissions: [PERMISSIONS.USER.READ],
        }
    })

    const hashedPassword = await bcrypt.hash("Admin@123",10);

    const admin = await prisma.user.create({
        data: {
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
