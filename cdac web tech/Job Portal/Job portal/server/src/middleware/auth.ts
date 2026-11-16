import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { User, IUser } from "../models/User.js";

// Extend Express Request interface to include our User
export interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * Protects private routes by verifying JWT Bearer Token
 */
export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
    return;
  }

  try {
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found or token invalid",
      });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({
        success: false,
        message: "Account has been deactivated. Please contact admin.",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed or expired",
    });
    return;
  }
};

/**
 * Role-Based Access Control (RBAC) middleware factory
 * Example: authorize("admin", "employer")
 */
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: Role '${req.user?.role}' is not authorized to access this resource`,
      });
      return;
    }
    next();
  };
};
