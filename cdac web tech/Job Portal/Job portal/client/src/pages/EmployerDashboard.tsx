import React, { useEffect, useState } from "react";
import api, { BACKEND_URL } from "../services/api";
import { IJob, ICompany, IApplication, ICategory } from "../types";
import { useAuth } from "../context/AuthContext";
import {
  Building2,
  PlusCircle,
  Briefcase,
  Users,
  Calendar,
  Trash2,
  ExternalLink,
  X,
  CheckCircle2,
  AlertCircle,
  Check,
  UserX,
} from "lucide-react";

export const EmployerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<ICompany | null>(null);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Post Job Modal State
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [jobSalaryMin, setJobSalaryMin] = useState("800000");
  const [jobSalaryMax, setJobSalaryMax] = useState("1400000");
  const [jobSkills, setJobSkills] = useState("React, TypeScript, Node.js");
  const [jobCategory, setJobCategory] = useState("");
  const [jobDeadline, setJobDeadline] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [postJobMsg, setPostJobMsg] = useState<string | null>(null);

  // View Applicants Modal State
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState<IJob | null>(null);
  const [applicants, setApplicants] = useState<IApplication[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  // Create Company Profile Form State
  const [companyName, setCompanyName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  useEffect(() => {
    fetchEmployerData();
  }, []);

  const fetchEmployerData = async () => {
    setLoading(true);
    try {
      const [compRes, jobsRes, catRes] = await Promise.all([
        api.get("/companies/my/profile"),
        api.get("/jobs/my/listings"),
        api.get("/jobs/categories/all"),
      ]);
      if (compRes.data.success && compRes.data.company) {
        setCompany(compRes.data.company);
      }
      if (jobsRes.data.success) {
        setJobs(jobsRes.data.jobs);
      }
      if (catRes.data.success) {
        setCategories(catRes.data.categories);
        if (catRes.data.categories.length > 0) {
          setJobCategory(catRes.data.categories[0]._id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/companies", {
        name: companyName,
        description: companyDesc,
        location: companyLocation,
        website: companyWebsite,
        logo: companyLogo,
      });
      if (res.data.success) {
        setCompany(res.data.company);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create company");
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostJobMsg(null);
    try {
      const res = await api.post("/jobs", {
        title: jobTitle,
        description: jobDesc,
        location: jobLocation,
        employmentType: jobType,
        salaryMin: Number(jobSalaryMin),
        salaryMax: Number(jobSalaryMax),
        skills: jobSkills.split(",").map((s) => s.trim()),
        categoryId: jobCategory,
        deadline: jobDeadline,
      });
      if (res.data.success) {
        setPostJobMsg("Job vacancy posted successfully!");
        fetchEmployerData();
        setTimeout(() => {
          setShowPostJobModal(false);
          setPostJobMsg(null);
        }, 1200);
      }
    } catch (err: any) {
      setPostJobMsg(err.response?.data?.message || "Failed to post job");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm("Are you sure you want to delete this job vacancy?")) return;
    try {
      const res = await api.delete(`/jobs/${jobId}`);
      if (res.data.success) {
        setJobs(jobs.filter((j) => j._id !== jobId));
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  const handleOpenApplicants = async (job: IJob) => {
    setSelectedJobForApplicants(job);
    setLoadingApplicants(true);
    try {
      const res = await api.get(`/applications/job/${job._id}`);
      if (res.data.success) {
        setApplicants(res.data.applications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingApplicants(false);
    }
  };

  const handleUpdateStatus = async (appId: string, status: string) => {
    try {
      const res = await api.patch(`/applications/${appId}/status`, { status });
      if (res.data.success) {
        setApplicants(
          applicants.map((a) => (a._id === appId ? { ...a, status: status as any } : a))
        );
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Employer Management</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {company ? company.name : "Company Workspace"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish openings, review applicant resumes, and update recruitment status
          </p>
        </div>

        {company && (
          <button
            onClick={() => setShowPostJobModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-md shadow-emerald-600/20 transition"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Post New Job</span>
          </button>
        )}
      </div>

      {/* If No Company Profile Yet: Force Creation */}
      {!company ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Building2 className="w-12 h-12 text-brand-600 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create Your Company Profile</h2>
            <p className="text-xs text-slate-500">
              Before you can post jobs, introduce your organization to job seekers.
            </p>
          </div>

          <form onSubmit={handleCreateCompany} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                placeholder="e.g. Acme Tech Corp"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location *</label>
              <input
                type="text"
                required
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                placeholder="e.g. Bangalore, India"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description *</label>
              <textarea
                required
                rows={3}
                value={companyDesc}
                onChange={(e) => setCompanyDesc(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                placeholder="What does your company build or specialize in?"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
              <input
                type="url"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                placeholder="https://example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-600/20 transition"
            >
              Save Company Profile
            </button>
          </form>
        </div>
      ) : (
        /* Jobs List */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Published Vacancies ({jobs.length})</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400">Loading your jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              You haven't posted any jobs yet. Click "Post New Job" above to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Job Title</th>
                    <th className="px-6 py-4">Type & Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Deadline</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                        {job.title}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {job.employmentType} • {job.location}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full text-xs font-bold uppercase">
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {new Date(job.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenApplicants(job)}
                          className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold rounded-lg text-xs"
                        >
                          View Applicants
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setShowPostJobModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Job Vacancy</h2>

            {postJobMsg && (
              <div className="p-3 bg-brand-50 text-brand-700 rounded-xl text-xs font-semibold">
                {postJobMsg}
              </div>
            )}

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                    placeholder="Bangalore / Remote"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Type *</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category *</label>
                <select
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Min Salary (₹/yr)</label>
                  <input
                    type="number"
                    value={jobSalaryMin}
                    onChange={(e) => setJobSalaryMin(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Max Salary (₹/yr)</label>
                  <input
                    type="number"
                    value={jobSalaryMax}
                    onChange={(e) => setJobSalaryMax(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Required Skills (Comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={jobSkills}
                  onChange={(e) => setJobSkills(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                  placeholder="React, TypeScript, CSS, REST APIs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Application Deadline *</label>
                <input
                  type="date"
                  required
                  value={jobDeadline}
                  onChange={(e) => setJobDeadline(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700"
                  placeholder="Responsibilities, requirements, and benefits..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold rounded-xl text-sm shadow-md shadow-emerald-600/20 transition"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Applicants Modal */}
      {selectedJobForApplicants && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111722] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 dark:border-emerald-500/10 p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedJobForApplicants(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-400 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                Applicants Review
              </span>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-1">
                {selectedJobForApplicants.title}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Review candidate resumes, read cover letters, and update hiring pipeline status
              </p>
            </div>

            {loadingApplicants ? (
              <div className="py-12 text-center text-stone-400">Loading applicants...</div>
            ) : applicants.length === 0 ? (
              <div className="py-12 text-center text-stone-400">
                No candidates have applied for this job yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-stone-600 dark:text-stone-300">
                  <thead className="bg-stone-50 dark:bg-stone-800/50 text-xs uppercase font-semibold text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800">
                    <tr>
                      <th className="px-4 py-3.5">Candidate</th>
                      <th className="px-4 py-3.5">Resume</th>
                      <th className="px-4 py-3.5">Cover Letter</th>
                      <th className="px-4 py-3.5 text-center">Status</th>
                      <th className="px-4 py-3.5 text-right whitespace-nowrap">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {applicants.map((app) => (
                      <tr key={app._id} className="hover:bg-stone-50/70 dark:hover:bg-stone-800/30 transition">
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-stone-900 dark:text-white">{app.applicantId?.name}</div>
                          <div className="text-xs text-stone-500 dark:text-stone-400">{app.applicantId?.email}</div>
                          {app.applicantId?.phone && (
                            <div className="text-xs text-stone-400">{app.applicantId.phone}</div>
                          )}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {app.resumeUrl ? (
                            <a
                              href={`${BACKEND_URL}${app.resumeUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-xl transition shadow-sm"
                            >
                              <span>Download PDF</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-xs text-stone-400 italic">No resume</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-stone-600 dark:text-stone-300 max-w-xs">
                          <div className="line-clamp-2" title={app.coverLetter || "N/A"}>
                            {app.coverLetter || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          {app.status === "selected" ? (
                            <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 rounded-full text-xs font-bold uppercase tracking-wide">
                              Selected
                            </span>
                          ) : app.status === "shortlisted" ? (
                            <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 rounded-full text-xs font-bold uppercase tracking-wide">
                              Shortlisted
                            </span>
                          ) : app.status === "rejected" ? (
                            <span className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 rounded-full text-xs font-bold uppercase tracking-wide">
                              Rejected
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 rounded-full text-xs font-bold uppercase tracking-wide">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleUpdateStatus(app._id, "shortlisted")}
                              disabled={app.status === "shortlisted"}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                                app.status === "shortlisted"
                                  ? "bg-teal-600 text-white cursor-default opacity-90 shadow-sm"
                                  : "bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-600 hover:text-white text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60"
                              }`}
                            >
                              Shortlist
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(app._id, "selected")}
                              disabled={app.status === "selected"}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                                app.status === "selected"
                                  ? "bg-emerald-600 text-white cursor-default opacity-90 shadow-sm"
                                  : "bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-600 hover:text-white text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                              }`}
                            >
                              Select
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(app._id, "rejected")}
                              disabled={app.status === "rejected"}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                                app.status === "rejected"
                                  ? "bg-rose-600 text-white cursor-default opacity-90 shadow-sm"
                                  : "bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-600 hover:text-white text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60"
                              }`}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
