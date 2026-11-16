import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Briefcase, AlertCircle, Shield, Building, User } from "lucide-react";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message || "Invalid credentials");
    }
  };

  // 1-Click Demo Login Fillers for Evaluation!
  const fillCredentials = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#111722] p-8 rounded-3xl border border-stone-200 dark:border-emerald-500/10 shadow-xl">
        <div className="text-center">
          <div className="mx-auto bg-gradient-to-tr from-brand-600 to-teal-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20 mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sign In to Your Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access applications, candidate resumes, or admin dashboard
          </p>
        </div>

        {/* 1-Click Evaluation Demo Credentials Box */}
        <div className="p-3 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-2xl space-y-2">
          <div className="text-[11px] font-bold text-brand-800 dark:text-brand-300 uppercase tracking-wider text-center">
            ⚡ Quick Demo Accounts (Click to Fill):
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillCredentials("admin@jobportal.com", "Password123")}
              className="px-2 py-1.5 bg-white dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 flex flex-col items-center"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("employer@techcorp.com", "Password123")}
              className="px-2 py-1.5 bg-white dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 flex flex-col items-center"
            >
              <Building className="w-3.5 h-3.5 text-teal-500 mb-0.5" />
              <span>Employer</span>
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("rahul.seeker@gmail.com", "Password123")}
              className="px-2 py-1.5 bg-white dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 flex flex-col items-center"
            >
              <User className="w-3.5 h-3.5 text-emerald-500 mb-0.5" />
              <span>Seeker</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-2 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold rounded-xl text-sm shadow-md shadow-emerald-600/20 transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
