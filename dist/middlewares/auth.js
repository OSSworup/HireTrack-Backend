import "dotenv/config";
import jwt from "jsonwebtoken";
import {} from "express";
import prisma from "../prisma/client.js";
const secretKey = process.env.JWT_SECRET;
const authMiddleware = async (req, res, next) => {
    const authHeader = req.header("authorization");
    if (!authHeader) {
        return res.status(401).send("Access denied");
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const payload = jwt.verify(token, secretKey);
        const user = await prisma.user.findUnique({
            where: { id: payload.sub },
            include: {
                userRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        if (!user) {
            return res.status(401).send("User not found");
        }
        req.user = {
            id: user.id,
            email: user.email,
            roles: user.userRoles.map((ur) => ur.role),
        };
        next();
    }
    catch (error) {
        res.status(401).send("Your session is expaired please log in again");
    }
};
const generateToken = (userData) => {
    return jwt.sign(userData, secretKey, { expiresIn: 30000 });
};
export { generateToken, authMiddleware };
//# sourceMappingURL=auth.js.map