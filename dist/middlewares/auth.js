import "dotenv/config";
import jwt from "jsonwebtoken";
import {} from "express";
const secretKey = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("authorization");
    if (!authHeader) {
        return res.status(401).send("Access denied");
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
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