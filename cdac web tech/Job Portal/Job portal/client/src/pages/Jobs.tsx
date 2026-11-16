import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api, { BACKEND_URL } from "../services/api";
import { IJob, ICategory } from "../types";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  X,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Send,
} from "lucide-react";

export const Jobs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [employmentType, setEmploymentType] = useState(searchParams.get("employmentType") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  // Selected job for Apply Modal
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [searchParams, currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/jobs/categories/all");
      if (res.data.success) setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(currentPage));
      params.set("limit", "6");
      const res = await api.get(`/jobs?${params.toString()}`);
      if (res.data.success) {
        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params: any = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (employmentType) params.employmentType = employmentType;
    if (location) params.location = location;
    setCurrentPage(1);
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setEmploymentType("");
    setLocation("");
    setCurrentPage(1);
    setSearchParams({});
  };

  const handleOpenModal = (job: IJob) => {
    setSelectedJob(job);
    setResumeFile(null);
    setCoverLetter("");
    setApplySuccess(null);
    setApplyError(null);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "jobseeker") {
      setApplyError("Only candidates registered as Job Seekers can apply.");
      return;
    }

    if (!resumeFile) {
      setApplyError("Please select a resume file (PDF/DOC) to upload.");
      return;
    }

    setApplying(true);
    setApplyError(null);
    setApplySuccess(null);

    const formData = new FormData();
    formData.append("jobId", selectedJob!._id);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resumeFile);

    try {
      const res = await api.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        setApplySuccess("Application and PDF resume submitted successfully! You can track this in My Applications.");
      }
    } catch (error: any) {
      setApplyError(error.response?.data?.message || "Failed to submit application");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-mesh-pattern">
      {/* Top Header */}
      <div>
        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Careers Catalog</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Explore Open Roles
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Filter through live vacancies across leading enterprise and startup teams
        </p>
      </div>

      {/* Filter Toolbar */}
      <form
        onSubmit={handleApplyFilter}
        className="glass-panel p-5 sm:p-6 rounded-3xl shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Keyword
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-brand-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="e.g. Full Stack, React"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Employment Type
          </label>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="e.g. Bangalore, Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>
        </div>

        <div className="flex items-end space-x-2">
          <button
            type="submit"
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-md shadow-brand-500/20"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-24 text-center text-slate-400">Loading vacancies...</div>
      ) : jobs.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl p-8">
          <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No jobs match your criteria</h3>
          <p className="text-sm text-slate-500 mt-1">Try clearing filters or searching for different keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="glass-panel p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-500 dark:hover:border-brand-500 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    {job.companyId?.logo ? (
                      <img
                        src={job.companyId.logo}
                        alt="logo"
                        className="w-9 h-9 object-cover rounded-xl"
                      />
                    ) : (
                      <Building2 className="w-6 h-6 text-brand-600" />
                    )}
                  </div>
                  <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-full border border-teal-200 dark:border-teal-800/40">
                    {job.employmentType}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-4 line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {job.companyId?.name} • <span className="text-slate-400">{job.location}</span>
                </p>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.skills?.slice(0, 4).map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Salary CTC</div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    ₹{(job.salaryMin / 100000).toFixed(1)}L - ₹{(job.salaryMax / 100000).toFixed(1)}L
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(job)}
                  className="bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold px-4 py-2 rounded-xl text-xs transition shadow-sm shadow-emerald-600/20"
                >
                  View & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 pt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm font-semibold text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Apply / Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-brand-600 uppercase tracking-wider">
                <span>{selectedJob.companyId?.name}</span>
                <span>•</span>
                <span>{selectedJob.employmentType}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {selectedJob.title}
              </h2>
              <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500 mt-2">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-brand-500" /> {selectedJob.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-amber-500" /> Deadline:{" "}
                  {new Date(selectedJob.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="border-t border-b border-slate-100 dark:border-slate-800 py-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Description</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills?.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Section */}
            {applySuccess ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-start space-x-3 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm font-semibold">{applySuccess}</div>
              </div>
            ) : user?.role === "jobseeker" ? (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Submit Your Application</h3>

                {applyError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-2 text-xs text-red-700 dark:text-red-300 font-medium">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{applyError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Upload Resume (PDF / DOC) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-50 file:text-brand-700 dark:file:bg-brand-950/60 dark:file:text-brand-300 hover:file:bg-brand-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Cover Letter / Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly introduce yourself and why you're a great fit..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applying}
                    className="px-6 py-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm transition disabled:opacity-50 shadow-md shadow-emerald-600/25"
                  >
                    {applying ? "Submitting..." : "Apply Now"}
                  </button>
                </div>
              </form>
            ) : !user ? (
              <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Please log in as a Job Seeker to apply for this vacancy.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow shadow-emerald-600/20"
                >
                  Sign In to Apply
                </button>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs rounded-xl font-medium">
                Logged in as <b>{user.role}</b>. Only registered Job Seekers can apply.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
