import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Home } from "./pages/Home";
import { Jobs } from "./pages/Jobs";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SeekerDashboard } from "./pages/SeekerDashboard";
import { EmployerDashboard } from "./pages/EmployerDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 dark:bg-[#0c1017] dark:text-stone-100 transition-colors">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Job Seeker Route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["jobseeker"]}>
                    <SeekerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Employer Route */}
              <Route
                path="/employer"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Route */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
