import { Response } from "express";
import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";
import { AuthRequest } from "../middleware/auth.js";

// @desc    Apply for a job with resume upload
// @route   POST /api/applications
// @access  Private (Job Seeker)
export const applyJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { jobId, coverLetter } = req.body;
    const applicantId = req.user!._id;

    if (!jobId) {
      res.status(400).json({ success: false, message: "Job ID is required" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ success: false, message: "Please upload your resume (PDF/DOC)" });
      return;
    }

    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    if (job.status !== "approved") {
      res.status(400).json({ success: false, message: "Cannot apply. Job is not active or approved." });
      return;
    }

    // Check application deadline
    if (new Date(job.deadline) < new Date()) {
      res.status(400).json({ success: false, message: "The application deadline for this job has passed." });
      return;
    }

    // Check duplicate
    const existingApp = await Application.findOne({ jobId, applicantId });
    if (existingApp) {
      res.status(400).json({ success: false, message: "You have already applied for this job." });
      return;
    }

    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const application = await Application.create({
      jobId,
      applicantId,
      resumeUrl,
      coverLetter: coverLetter || "",
      status: "pending",
      appliedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: "You have already applied for this job." });
      return;
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in job seeker's applications
// @route   GET /api/applications/my
// @access  Private (Job Seeker)
export const getMyApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const applications = await Application.find({ applicantId: req.user!._id })
      .populate({
        path: "jobId",
        select: "title location employmentType salaryMin salaryMax companyId deadline",
        populate: {
          path: "companyId",
          select: "name logo location",
        },
      })
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all applications for a job (Employer only)
// @route   GET /api/jobs/:id/applications
// @access  Private (Employer owner)
export const getJobApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    if (job.employerId.toString() !== req.user!._id.toString() && req.user!.role !== "admin") {
      res.status(403).json({ success: false, message: "Not authorized to view applicants for this job" });
      return;
    }

    const applications = await Application.find({ jobId: req.params.id as any })
      .populate("applicantId", "name email phone")
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status (Shortlist, Reject, Select)
// @route   PATCH /api/applications/:id/status
// @access  Private (Employer)
export const updateApplicationStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    if (!["pending", "shortlisted", "rejected", "selected"].includes(status)) {
      res.status(400).json({ success: false, message: "Invalid status value" });
      return;
    }

    const application = await Application.findById(req.params.id).populate("jobId");
    if (!application) {
      res.status(404).json({ success: false, message: "Application not found" });
      return;
    }

    const job = application.jobId as any;
    if (job.employerId.toString() !== req.user!._id.toString() && req.user!.role !== "admin") {
      res.status(403).json({ success: false, message: "Not authorized to update this application status" });
      return;
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Application marked as ${status}`,
      application,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
