export type UserRole = "admin" | "employer" | "jobseeker";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  isActive?: boolean;
  company?: {
    id: string;
    name: string;
  } | null;
}

export interface ICompany {
  _id: string;
  name: string;
  description: string;
  location: string;
  website?: string;
  logo?: string;
  employerId: string;
}

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
}

export interface IJob {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  companyId: {
    _id: string;
    name: string;
    location: string;
    logo?: string;
    website?: string;
  };
  employerId: string;
  categoryId: {
    _id: string;
    name: string;
  };
  status: "pending" | "approved" | "rejected" | "closed";
  deadline: string;
  createdAt: string;
}

export interface IApplication {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    location: string;
    employmentType: string;
    salaryMin: number;
    salaryMax: number;
    companyId?: {
      name: string;
      logo?: string;
    };
    deadline: string;
  };
  applicantId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  resumeUrl: string;
  coverLetter?: string;
  status: "pending" | "shortlisted" | "rejected" | "selected";
  appliedAt: string;
}

export interface IAdminStats {
  totalUsers: number;
  totalCompanies: number;
  totalJobs: number;
  totalApplications: number;
  usersByRole: Array<{ _id: string; count: number }>;
  applicationsByStatus: Array<{ _id: string; count: number }>;
  jobsByStatus: Array<{ _id: string; count: number }>;
}
