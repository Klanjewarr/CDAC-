import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Briefcase,
  Sun,
  Moon,
  LogOut,
  User,
  Shield,
  Building,
  FileText,
  Menu,
  X,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-stone-50/90 dark:bg-[#0e141f]/90 backdrop-blur-md border-b border-stone-200 dark:border-emerald-500/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="bg-gradient-to-tr from-brand-600 to-teal-500 text-white p-2 rounded-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-stone-900 dark:text-white">
              Job<span className="text-brand-600 dark:text-brand-400">Portal</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/jobs"
              className="text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors"
            >
              Browse Jobs
            </Link>

            {user?.role === "jobseeker" && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
              >
                <FileText className="w-4 h-4" />
                <span>My Applications</span>
              </Link>
            )}

            {user?.role === "employer" && (
              <Link
                to="/employer"
                className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
              >
                <Building className="w-4 h-4" />
                <span>Employer Hub</span>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Switch */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                    {user.name}
                  </div>
                  <div className="text-xs text-brand-600 dark:text-brand-400 capitalize font-medium">
                    {user.role}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-500 dark:text-slate-400"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Browse Jobs
          </Link>
          {user?.role === "jobseeker" && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              My Applications
            </Link>
          )}
          {user?.role === "employer" && (
            <Link
              to="/employer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Employer Hub
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20"
            >
              Admin Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-base font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              Logout ({user.name})
            </button>
          ) : (
            <div className="pt-2 flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-medium rounded-lg"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center px-4 py-2 bg-gradient-to-r from-brand-600 to-teal-600 text-white font-medium rounded-xl shadow-md shadow-emerald-600/20"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
