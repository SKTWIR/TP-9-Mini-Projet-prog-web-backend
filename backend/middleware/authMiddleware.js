export function requireAuth(req, res, next) {
    if (!req.session.user)
        return res.status(401).json({ message: "Not authenticated" });
    next();
}

export function requireAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
    }
    next();
}
