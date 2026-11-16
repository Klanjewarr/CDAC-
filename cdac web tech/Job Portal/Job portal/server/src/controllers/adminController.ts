import { Request, Response } from "express";
import { User } from "../models/User.js";
import { Job } from "../models/Job.js";
import { Company } from "../models/Company.js";
import { Application } from "../models/Application.js";

// @desc    Get Admin Dashboard Stats using MongoDB Aggregation
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getAdminStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    // 1. Aggregation Pipeline: Count users grouped by role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    // 2. Aggregation Pipeline: Count applications grouped by status
    const applicationsByStatus = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // 3. Aggregation Pipeline: Jobs grouped by approval status
    const jobsByStatus = await Job.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalUsers = await User.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCompanies,
        totalJobs,
        totalApplications,
        usersByRole,
        applicationsByStatus,
        jobsByStatus,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve or reject a job posting
// @route   PATCH /api/admin/jobs/:id/review
// @access  Private (Admin)
export const reviewJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      res.status(400).json({ success: false, message: "Status must be 'approved' or 'rejected'" });
      return;
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    job.status = status;
    await job.save();

    res.status(200).json({
      success: true,
      message: `Job has been ${status}`,
      job,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users for admin management
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Activate or deactivate user account
// @route   PATCH /api/admin/users/:id/status
// @access  Private (Admin)
export const toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User account is now ${user.isActive ? "Active" : "Deactivated"}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
