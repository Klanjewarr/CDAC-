import { Request, Response } from "express";
import { Job } from "../models/Job.js";
import { Company } from "../models/Company.js";
import { Category } from "../models/Category.js";
import { AuthRequest } from "../middleware/auth.js";

// @desc    Create a new job posting
// @route   POST /api/jobs
// @access  Private (Employer)
export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const employerId = req.user!._id;

    // Check if employer has a company registered
    const company = await Company.findOne({ employerId });
    if (!company) {
      res.status(400).json({
        success: false,
        message: "You must create a Company Profile before posting jobs.",
      });
      return;
    }

    const {
      title,
      description,
      location,
      employmentType,
      salaryMin,
      salaryMax,
      skills,
      categoryId,
      deadline,
    } = req.body;

    // Parse skills if string
    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((s) => s.trim())
      : [];

    const job = await Job.create({
      title,
      description,
      location,
      employmentType: employmentType || "Full-time",
      salaryMin: Number(salaryMin) || 0,
      salaryMax: Number(salaryMax) || 0,
      skills: parsedSkills,
      companyId: company._id,
      employerId,
      categoryId,
      deadline: new Date(deadline),
      status: "approved", // auto-approve for convenience or pending
    });

    res.status(201).json({
      success: true,
      message: "Job posting created successfully",
      job,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all jobs with search, filters, pagination
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      category,
      employmentType,
      location,
      page = "1",
      limit = "10",
      status = "approved",
    } = req.query;

    const query: any = {};

    // By default, public sees only approved jobs
    if (status) {
      query.status = status;
    }

    // Search by title or skills
    if (search) {
      const searchRegex = new RegExp(String(search), "i");
      query.$or = [{ title: searchRegex }, { skills: { $in: [searchRegex] } }];
    }

    if (category) {
      query.categoryId = category;
    }

    if (employmentType) {
      query.employmentType = employmentType;
    }

    if (location) {
      query.location = new RegExp(String(location), "i");
    }

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const totalJobs = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate("companyId", "name location logo website")
      .populate("categoryId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: jobs.length,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limitNum),
      currentPage: pageNum,
      jobs,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single job details
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("companyId")
      .populate("categoryId")
      .populate("employerId", "name email");

    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    res.status(200).json({ success: true, job });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get jobs posted by the logged-in employer
// @route   GET /api/jobs/my/listings
// @access  Private (Employer)
export const getMyJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find({ employerId: req.user!._id })
      .populate("companyId", "name logo")
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a job posting
// @route   PUT /api/jobs/:id
// @access  Private (Employer owner only)
export const updateJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    // Ownership check
    if (job.employerId.toString() !== req.user!._id.toString() && req.user!.role !== "admin") {
      res.status(403).json({ success: false, message: "Not authorized to update this job" });
      return;
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a job posting
// @route   DELETE /api/jobs/:id
// @access  Private (Employer owner or Admin)
export const deleteJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    if (job.employerId.toString() !== req.user!._id.toString() && req.user!.role !== "admin") {
      res.status(403).json({ success: false, message: "Not authorized to delete this job" });
      return;
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job removed successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all categories
// @route   GET /api/jobs/categories/all
// @access  Public
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json({ success: true, categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
