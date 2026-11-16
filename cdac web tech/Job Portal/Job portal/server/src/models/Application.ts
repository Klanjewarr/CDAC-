import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  applicantId: mongoose.Types.ObjectId;
  resumeUrl: string;
  coverLetter?: string;
  status: "pending" | "shortlisted" | "rejected" | "selected";
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
    },
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Applicant ID is required"],
    },
    resumeUrl: {
      type: String,
      required: [true, "Resume URL/path is required"],
    },
    coverLetter: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected", "selected"],
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Unique Index: prevents duplicate applications for the same job by the same user
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

export const Application = mongoose.model<IApplication>("Application", applicationSchema);
