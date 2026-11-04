const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWTsecretKey = process.env.JWT_SECRET || "default_jwt_secret";

const authVerifyMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        if (req.headers.accept?.includes("application/json")) {
            return res.status(401).json({ error: "Access Denied. Please login first." });
        }
        return res.redirect("/login");
    }

    // Verify token inside try-catch
    try {
        const decoded = jwt.verify(token, JWTsecretKey);
        req.user = decoded; // Attach user info to request
        next();             // Allow access to the route
    } catch (err) {
        if (req.headers.accept?.includes("application/json")) {
            return res.status(403).json({ error: "Session expired, please log in again" });
        }
        return res.redirect("/login");
    }
};

module.exports = { authVerifyMiddleware, JWTsecretKey };
