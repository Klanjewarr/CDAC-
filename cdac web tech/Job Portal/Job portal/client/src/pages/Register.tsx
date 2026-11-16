import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Briefcase, AlertCircle, Building, User } from "lucide-react";
import { UserRole } from "../types";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>("jobseeker");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await register({ name, email, password, phone, role });
    setLoading(false);

    if (res.success) {
      if (role === "employer") {
        navigate("/employer");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(res.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#111722] p-8 rounded-3xl border border-stone-200 dark:border-emerald-500/10 shadow-xl">
        <div className="text-center">
          <div className="mx-auto bg-gradient-to-tr from-brand-600 to-teal-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20 mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Your Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Join thousands of professionals and hiring companies
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-2 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector tab */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Select Your Account Type:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("jobseeker")}
                className={`py-3 px-4 rounded-xl border flex flex-col items-center space-y-1 transition ${
                  role === "jobseeker"
                    ? "border-brand-600 bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-bold">Job Seeker</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("employer")}
                className={`py-3 px-4 rounded-xl border flex flex-col items-center space-y-1 transition ${
                  role === "employer"
                    ? "border-brand-600 bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                <Building className="w-5 h-5" />
                <span className="text-xs font-bold">Employer</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

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
              placeholder="rahul@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password (min. 6 characters)
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="+91 9876543210"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold rounded-xl text-sm shadow-md shadow-emerald-600/20 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
