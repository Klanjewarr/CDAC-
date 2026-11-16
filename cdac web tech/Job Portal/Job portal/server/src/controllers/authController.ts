import { Request, Response } from "express";
import { User } from "../models/User.js";
import { Company } from "../models/Company.js";
import { generateTokens, verifyRefreshToken } from "../utils/jwt.js";
import { AuthRequest } from "../middleware/auth.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Please provide name, email and password" });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ success: false, message: "A user with this email already exists" });
      return;
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || "jobseeker",
      phone: phone || "",
    });

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Registration failed" });
  }
};

// @desc    Login user & issue JWT
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Please provide email and password" });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ success: false, message: "Your account is deactivated. Contact administrator." });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    // If employer, attach their company info if available
    let company = null;
    if (user.role === "employer") {
      company = await Company.findOne({ employerId: user._id });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: company ? { id: company._id, name: company.name } : null,
      },
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Login failed" });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ success: false, message: "Refresh token is required" });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: "Invalid refresh token or inactive account" });
      return;
    }

    const tokens = generateTokens(user._id, user.role);

    res.status(200).json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!._id).select("-password");
    let company = null;
    if (user?.role === "employer") {
      company = await Company.findOne({ employerId: user._id });
    }

    res.status(200).json({
      success: true,
      user,
      company,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user!._id);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
