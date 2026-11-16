import { Response } from "express";
import { Company } from "../models/Company.js";
import { AuthRequest } from "../middleware/auth.js";

// @desc    Create company profile
// @route   POST /api/companies
// @access  Private (Employer)
export const createCompany = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, location, website, logo } = req.body;

    const existingCompany = await Company.findOne({ employerId: req.user!._id });
    if (existingCompany) {
      res.status(400).json({
        success: false,
        message: "You already have a company profile registered. Update it instead.",
      });
      return;
    }

    const company = await Company.create({
      name,
      description,
      location,
      website: website || "",
      logo: logo || "",
      employerId: req.user!._id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
export const getCompanyById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findById(req.params.id).populate("employerId", "name email");
    if (!company) {
      res.status(404).json({ success: false, message: "Company not found" });
      return;
    }
    res.status(200).json({ success: true, company });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in employer's company
// @route   GET /api/companies/my/profile
// @access  Private (Employer)
export const getMyCompany = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findOne({ employerId: req.user!._id });
    res.status(200).json({ success: true, company });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update company profile
// @route   PUT /api/companies/:id
// @access  Private (Employer owner only)
export const updateCompany = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      res.status(404).json({ success: false, message: "Company not found" });
      return;
    }

    // Ownership check
    if (company.employerId.toString() !== req.user!._id.toString() && req.user!.role !== "admin") {
      res.status(403).json({ success: false, message: "Not authorized to update this company" });
      return;
    }

    const { name, description, location, website, logo } = req.body;
    if (name) company.name = name;
    if (description) company.description = description;
    if (location) company.location = location;
    if (website !== undefined) company.website = website;
    if (logo !== undefined) company.logo = logo;

    await company.save();

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      company,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
