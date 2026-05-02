import {} from "express";
export const requirePermissions = (...requiredPermissions) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(403).json({ message: "Not authenticated" });
        }
        const userPermissions = new Set();
        for (const role of user.roles) {
            for (const perm of role.permissions || []) {
                userPermissions.add(perm);
            }
        }
        const allowed = requiredPermissions.some((perm) => {
            return userPermissions.has(perm);
        });
        if (!allowed) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
//# sourceMappingURL=permissionGuard.js.map