import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { IJob, ICategory } from "../types";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState<IJob[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, catsRes] = await Promise.all([
          api.get("/jobs?limit=6"),
          api.get("/jobs/categories/all"),
        ]);
        if (jobsRes.data.success) setFeaturedJobs(jobsRes.data.jobs);
        if (catsRes.data.success) setCategories(catsRes.data.categories);
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(locationTerm)}`);
  };

  return (
    <div className="space-y-20 pb-20 bg-mesh-pattern">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-xs font-bold text-brand-700 dark:text-brand-300 tracking-wide uppercase">
              Next-Gen Career & Recruitment Ecosystem
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Land Your Next Tech Role with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-400 bg-clip-text text-transparent">
              Precision & Speed
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Directly connect with industry-leading employers. Upload your verified resume, track applications in real-time, and get hired faster.
          </p>

          {/* Search Card */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto glass-panel p-2.5 sm:p-3 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 flex items-center px-4 space-x-3 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 py-2 sm:py-0">
              <Search className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, skills (e.g. React, Node.js, MERN)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
              />
            </div>

            <div className="flex-1 flex items-center px-4 space-x-3 py-2 sm:py-0">
              <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Location (e.g. Bangalore, Remote, Pune)"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 text-sm"
            >
              <span>Explore Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Proof Stats */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-brand-600">10+</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Active Tech Jobs</div>
            </div>
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400">3+</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Top Companies</div>
            </div>
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-emerald-600">100%</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Verified Vacancies</div>
            </div>
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-amber-500">Real-time</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">Application Status</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-2">
          <div>
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">Browse by Specialization</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Popular Career Disciplines
            </h2>
          </div>
          <Link
            to="/jobs"
            className="text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center group"
          >
            <span>View all opportunities</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, idx) => (
            <Link
              key={cat._id}
              to={`/jobs?category=${cat._id}`}
              className="glass-panel p-6 rounded-2xl hover:border-brand-500 hover:shadow-xl hover:-translate-y-1 transition duration-200 group flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description || "Explore verified engineering roles in this sector."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-2">
          <div>
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">Top Vacancies Today</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Opportunities
            </h2>
          </div>
          <Link
            to="/jobs"
            className="text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center group"
          >
            <span>Browse all jobs</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400">Loading verified openings...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job._id}
                className="glass-panel p-7 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-400 dark:hover:border-brand-700 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-13 h-13 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        {job.companyId?.logo ? (
                          <img
                            src={job.companyId.logo}
                            alt="logo"
                            className="w-10 h-10 object-cover rounded-xl"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-brand-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white hover:text-brand-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                          {job.companyId?.name} • <span className="text-slate-400">{job.location}</span>
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-full border border-teal-200 dark:border-teal-800/50">
                      {job.employmentType}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.skills?.slice(0, 5).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Salary CTC</div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      ₹{(job.salaryMin / 100000).toFixed(1)}L - ₹{(job.salaryMax / 100000).toFixed(1)}L
                      <span className="text-xs text-slate-400 font-normal ml-1">/ yr</span>
                    </div>
                  </div>

                  <Link
                    to="/jobs"
                    className="text-xs font-bold text-white bg-slate-900 hover:bg-brand-600 dark:bg-white dark:text-slate-900 dark:hover:bg-brand-500 dark:hover:text-white px-4 py-2 rounded-xl transition duration-150 shadow"
                  >
                    View & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
