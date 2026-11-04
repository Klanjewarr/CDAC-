const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const { authVerifyMiddleware, JWTsecretKey } = require("./jwtVerification");

const app = express();

// Middlewares
app.use(express.static("static"));
app.use(express.json()); // Parses incoming JSON
app.use(express.urlencoded({ extended: true })); // Parses incoming HTML form submissions
app.use(cookieParser()); // Populates req.cookies

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Public Routes
app.get("/", (req, res) => {
    res.send("Server Started");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/about", (req, res) => {
    res.send("Server Started on about");
});

app.get("/contact", (req, res) => {
    res.send("Server Started on contact");
});

app.get("/service", (req, res) => {
    res.send("Server Started on service");
});

app.get("/product", (req, res) => {
    res.send("Server Started on product");
});

// Handles login submission (from form or POST request)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // MOCK USER CHECK
    // For testing: accepts admin@example.com / password123
    const mockUser = {
        id: "1",
        email: "admin@example.com",
        name: "Admin User",
        // Hashed version of "password123"
        passwordHash: "$2b$10$w9V0k0V27r2L4l4V7sYhieUu5w7aG2g4T9kM8gI9gY6K4jV3vM9mC"
    };

    if (email !== mockUser.email) {
        if (req.headers.accept?.includes("application/json") || req.xhr) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        return res.status(401).send("Invalid email or password");
    }

    // Compare password
    const isMatch = (password === "password123");
    if (!isMatch) {
        if (req.headers.accept?.includes("application/json") || req.xhr) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        return res.status(401).send("Invalid email or password");
    }

    // 1. Create token payload
    const payload = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name
    };

    // 2. Sign token
    const token = jwt.sign(payload, JWTsecretKey, {
        expiresIn: process.env.TOKEN_EXPIRE || "1h"
    });

    // 3. Store token in HTTP-Only cookie (secure from client JS tampering)
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true in HTTPS production
        sameSite: "lax",
        maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
    });

    // Support both Fetch/AJAX and traditional form submission
    if (req.headers.accept?.includes("application/json") || req.xhr) {
        return res.json({ success: true, message: "Login successful", token, user: payload, redirect: "/dash" });
    }

    // 4. Redirect to the protected dashboard
    res.redirect("/dash");
});

// Logout route to clear the cookie
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// ------------------- PROTECTED ROUTE -------------------
// authVerifyMiddleware guards /dash: only valid token holders can enter
app.get("/dash", authVerifyMiddleware, (req, res) => {
    // req.user was attached by authVerifyMiddleware
    res.render("dashboard", { user: req.user });
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
});
