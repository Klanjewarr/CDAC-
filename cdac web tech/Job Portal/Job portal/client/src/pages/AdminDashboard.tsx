import React, { useEffect, useState } from "react";
import api from "../services/api";
import { IAdminStats } from "../types";
import { Shield, Users, Briefcase, FileText, CheckCircle, XCircle, Building2 } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<IAdminStats | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/users"),
      ]);
      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (usersRes.data.success) setUsers(usersRes.data.users);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUser = async (userId: string) => {
    try {
      const res = await api.patch(`/admin/users/${userId}/status`);
      if (res.data.success) {
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, isActive: res.data.user.isActive } : u))
        );
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update user status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 sm:p-8 rounded-3xl border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center">
            <Shield className="w-4 h-4 mr-1" /> Platform Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            System Operations & Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            MongoDB aggregation statistics, user account controls, and job moderation
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading admin analytics...</div>
      ) : (
        <>
          {/* Top Aggregation Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase">Total Users</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {stats?.totalUsers || 0}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/60 text-purple-600 rounded-2xl">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase">Companies</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {stats?.totalCompanies || 0}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-2xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase">Total Vacancies</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {stats?.totalJobs || 0}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 rounded-2xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase">Applications</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {stats?.totalApplications || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Aggregation Pipeline Breakdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                MongoDB $group Aggregation: Users by Role
              </h3>
              <div className="space-y-3">
                {stats?.usersByRole.map((item) => (
                  <div key={item._id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <span className="font-semibold text-sm capitalize">{item._id}</span>
                    <span className="px-3 py-1 bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 font-bold text-xs rounded-full">
                      {item.count} users
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                MongoDB $group Aggregation: Applications by Status
              </h3>
              <div className="space-y-3">
                {stats?.applicationsByStatus.map((item) => (
                  <div key={item._id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <span className="font-semibold text-sm capitalize">{item._id}</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs rounded-full">
                      {item.count} candidates
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Management Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Registered Users Account Control</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold capitalize">
                        {u.role}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                            u.isActive
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                          }`}
                        >
                          {u.isActive ? "Active" : "Deactivated"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {u.role !== "admin" && (
                          <button
                            onClick={() => handleToggleUser(u._id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                              u.isActive
                                ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40"
                                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40"
                            }`}
                          >
                            {u.isActive ? "Deactivate" : "Activate"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
