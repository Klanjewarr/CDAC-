
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { TitleContext } from "../App";

export function Register() {
  const {setTitle,title}=useContext(TitleContext)
   useEffect(function()
    {
    setTitle("Register")
    },[])
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password does not match!");
      return;
    }

    alert("Registration Successful!");
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center py-4">
      <div className="card shadow border-0 p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <h2 className="text-center text-primary mb-2">
          Create Account
        </h2>

        <p className="text-center text-secondary mb-4">
          Register to get started
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Register
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}