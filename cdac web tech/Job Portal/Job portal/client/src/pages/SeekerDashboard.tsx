import React, { useEffect, useState } from "react";
import api, { BACKEND_URL } from "../services/api";
import { IApplication } from "../types";
import { useAuth } from "../context/AuthContext";
import { FileText, Clock, Building, Calendar, CheckCircle, ExternalLink } from "lucide-react";

export const SeekerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      const res = await api.get("/applications/my");
      if (res.data.success) {
        setApplications(res.data.applications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "shortlisted":
        return <span className="px-3 py-1 bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 rounded-full text-xs font-bold uppercase">Shortlisted</span>;
      case "selected":
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full text-xs font-bold uppercase">Selected</span>;
      case "rejected":
        return <span className="px-3 py-1 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 rounded-full text-xs font-bold uppercase">Rejected</span>;
      default:
        return <span className="px-3 py-1 bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 rounded-full text-xs font-bold uppercase">Under Review</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Candidate Portal</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your submitted job applications, resume status, and hiring outcomes
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-brand-50 dark:bg-brand-950/40 px-4 py-2 rounded-2xl border border-brand-100 dark:border-brand-900">
          <FileText className="w-5 h-5 text-brand-600" />
          <div className="text-sm font-bold text-brand-900 dark:text-brand-300">
            {applications.length} Applications Submitted
          </div>
        </div>
      </div>

      {/* Applications Table / List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Application History</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading your applications...</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            You haven't applied to any jobs yet. Check out the <a href="/jobs" className="text-brand-600 underline">Job Listings</a> page!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Job Title & Company</th>
                  <th className="px-6 py-4">Applied Date</th>
                  <th className="px-6 py-4">Submitted Resume</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{app.jobId?.title || "Position Closed"}</div>
                      <div className="text-xs text-slate-500 flex items-center mt-0.5">
                        <Building className="w-3.5 h-3.5 mr-1" />
                        {app.jobId?.companyId?.name || "Company"} • {app.jobId?.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`${BACKEND_URL}${app.resumeUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-lg"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Resume</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(app.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
