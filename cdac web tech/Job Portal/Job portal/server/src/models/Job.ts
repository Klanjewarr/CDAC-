import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  companyId: mongoose.Types.ObjectId;
  employerId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  status: "pending" | "approved" | "rejected" | "closed";
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    salaryMin: {
      type: Number,
      default: 0,
    },
    salaryMax: {
      type: Number,
      default: 0,
    },
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    employerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "closed"],
      default: "pending",
    },
    deadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model<IJob>("Job", jobSchema);