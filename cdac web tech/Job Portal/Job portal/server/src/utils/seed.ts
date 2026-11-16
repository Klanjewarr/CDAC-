import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Company } from "../models/Company.js";
import { Category } from "../models/Category.js";
import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    if (!mongoUri) throw new Error("MONGODB_URL not found in .env");

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for rich seeding...");

    // Clear existing collections
    await User.deleteMany({});
    await Company.deleteMany({});
    await Category.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});
    console.log("Cleared existing collections.");

    // 1. Create Categories
    const categories = await Category.insertMany([
      { name: "Full Stack Development", description: "MERN, MEAN, Next.js, and modern full-stack web applications" },
      { name: "Frontend Engineering", description: "React.js, Vue, TypeScript, Tailwind CSS, UI/UX" },
      { name: "Backend & Cloud", description: "Node.js, Express, Microservices, MongoDB, PostgreSQL, AWS" },
      { name: "DevOps & SRE", description: "Docker, Kubernetes, CI/CD pipelines, Terraform, Linux" },
      { name: "Data Science & AI", description: "Python, Machine Learning, PyTorch, Big Data, LLMs" },
      { name: "Mobile App Development", description: "React Native, Flutter, iOS Swift, Android Kotlin" },
    ]);
    console.log(`Created ${categories.length} categories.`);

    // 2. Create Users (Admin, Employers, Job Seekers)
    const admin = await User.create({
      name: "Super Administrator",
      email: "admin@jobportal.com",
      password: "Password123",
      role: "admin",
      phone: "+91 9900112233",
      isActive: true,
    });

    const emp1 = await User.create({
      name: "Ananya Roy (Razorpay Talent)",
      email: "employer@techcorp.com",
      password: "Password123",
      role: "employer",
      phone: "+91 9811002233",
      isActive: true,
    });

    const emp2 = await User.create({
      name: "Vikram Malhotra (Flipkart Labs)",
      email: "employer@flipkart.com",
      password: "Password123",
      role: "employer",
      phone: "+91 9822113344",
      isActive: true,
    });

    const emp3 = await User.create({
      name: "Meera Sen (Zomato Engineering)",
      email: "employer@zomato.com",
      password: "Password123",
      role: "employer",
      phone: "+91 9833224455",
      isActive: true,
    });

    const seeker1 = await User.create({
      name: "Rahul Sharma",
      email: "rahul.seeker@gmail.com",
      password: "Password123",
      role: "jobseeker",
      phone: "+91 9711223344",
      isActive: true,
    });

    const seeker2 = await User.create({
      name: "Priya Patel",
      email: "priya.dev@gmail.com",
      password: "Password123",
      role: "jobseeker",
      phone: "+91 9722334455",
      isActive: true,
    });

    const seeker3 = await User.create({
      name: "Amit Deshmukh",
      email: "amit.deshmukh@gmail.com",
      password: "Password123",
      role: "jobseeker",
      phone: "+91 9733445566",
      isActive: true,
    });

    const seeker4 = await User.create({
      name: "Sneha Reddy",
      email: "sneha.reddy@gmail.com",
      password: "Password123",
      role: "jobseeker",
      phone: "+91 9744556677",
      isActive: true,
    });

    console.log("Users created.");

    // 3. Create Companies
    const company1 = await Company.create({
      name: "Razorpay Fintech",
      description: "India's premier payments and financial infrastructure platform powering millions of businesses.",
      location: "Bangalore, India",
      website: "https://razorpay.com",
      logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=160&h=160&fit=crop",
      employerId: emp1._id,
    });

    const company2 = await Company.create({
      name: "Flipkart Tech",
      description: "Pioneering e-commerce logistics, distributed supply chain, and hyper-scale cloud applications.",
      location: "Bangalore / Remote",
      website: "https://flipkart.com",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=160&h=160&fit=crop",
      employerId: emp2._id,
    });

    const company3 = await Company.create({
      name: "Zomato Platforms",
      description: "Connecting hungry customers with dining options through high-throughput real-time routing engines.",
      location: "Gurgaon / Pune",
      website: "https://zomato.com",
      logo: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=160&h=160&fit=crop",
      employerId: emp3._id,
    });

    console.log("Companies created.");

    // 4. Create Jobs (10 varied jobs)
    const jobsData = [
      {
        title: "Senior Full Stack Engineer (MERN & TypeScript)",
        description: "Join Razorpay's Core Checkout team! Architect and build payment flows handling 10,000+ transactions per second. You will design scalable React components, configure microservices in Node.js, and optimize MongoDB aggregations.",
        location: "Bangalore (Hybrid)",
        employmentType: "Full-time",
        salaryMin: 1800000,
        salaryMax: 2800000,
        skills: ["React.js", "TypeScript", "Node.js", "MongoDB", "Express.js", "Redis"],
        companyId: company1._id,
        employerId: emp1._id,
        categoryId: categories[0]._id, // Full Stack
        status: "approved",
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Frontend UI/UX Architect (React & Tailwind)",
        description: "Craft pixel-perfect, accessible, and ultra-fast user interfaces using React, TypeScript, and modern utility-first Tailwind CSS. Champion design consistency and responsive design across all screens.",
        location: "Remote",
        employmentType: "Full-time",
        salaryMin: 1400000,
        salaryMax: 2200000,
        skills: ["React.js", "Tailwind CSS", "TypeScript", "Next.js", "Jest"],
        companyId: company1._id,
        employerId: emp1._id,
        categoryId: categories[1]._id, // Frontend
        status: "approved",
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Backend Platform Engineer (Distributed Systems)",
        description: "Design and implement high-performance REST APIs, event-driven pipelines, secure JWT authentication with refresh rotation, and distributed database indexes for Flipkart's warehouse engine.",
        location: "Bangalore, India",
        employmentType: "Full-time",
        salaryMin: 1600000,
        salaryMax: 2600000,
        skills: ["Node.js", "Express.js", "MongoDB", "Kafka", "Docker", "RESTful APIs"],
        companyId: company2._id,
        employerId: emp2._id,
        categoryId: categories[2]._id, // Backend
        status: "approved",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        title: "DevOps & Cloud Infrastructure Specialist",
        description: "Manage AWS cloud infrastructure, Docker containerization, Kubernetes clusters, and automated CI/CD deployment pipelines. Ensure 99.99% system uptime and security hardening.",
        location: "Pune (Hybrid)",
        employmentType: "Full-time",
        salaryMin: 1500000,
        salaryMax: 2400000,
        skills: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD", "Terraform"],
        companyId: company2._id,
        employerId: emp2._id,
        categoryId: categories[3]._id, // DevOps
        status: "approved",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Junior React Developer (CDAC Graduates Welcome)",
        description: "Exciting entry-level position for enthusiastic developers with foundational knowledge of React, JavaScript ES6+, HTML5, and Tailwind CSS. Learn directly under seasoned technical leads.",
        location: "Remote",
        employmentType: "Internship",
        salaryMin: 400000,
        salaryMax: 650000,
        skills: ["React", "JavaScript", "Tailwind CSS", "Git"],
        companyId: company1._id,
        employerId: emp1._id,
        categoryId: categories[1]._id, // Frontend
        status: "approved",
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Real-time Backend Developer (Socket.io & Node)",
        description: "Work on live tracking algorithms for Zomato delivery partners and restaurant partners. Handle web sockets, high-speed MongoDB indexing, and geo-spatial queries.",
        location: "Gurgaon",
        employmentType: "Full-time",
        salaryMin: 1300000,
        salaryMax: 2100000,
        skills: ["Node.js", "Socket.io", "MongoDB", "Express.js", "TypeScript"],
        companyId: company3._id,
        employerId: emp3._id,
        categoryId: categories[2]._id, // Backend
        status: "approved",
        deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Mobile App Developer (React Native)",
        description: "Build cross-platform mobile experiences for both Android and iOS devices. Integrate REST APIs, handle offline state persistence, and implement smooth 60fps animations.",
        location: "Bangalore",
        employmentType: "Contract",
        salaryMin: 1000000,
        salaryMax: 1700000,
        skills: ["React Native", "TypeScript", "Redux", "REST APIs"],
        companyId: company3._id,
        employerId: emp3._id,
        categoryId: categories[5]._id, // Mobile
        status: "approved",
        deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Data Analyst & ML Pipeline Engineer",
        description: "Analyze user application metrics, build prediction models for job candidate matching, and visualize analytics using Python, MongoDB aggregation pipelines, and BI dashboards.",
        location: "Remote",
        employmentType: "Full-time",
        salaryMin: 1200000,
        salaryMax: 1900000,
        skills: ["Python", "Pandas", "MongoDB", "SQL", "Machine Learning"],
        companyId: company2._id,
        employerId: emp2._id,
        categoryId: categories[4]._id, // Data Science
        status: "approved",
        deadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
      },
      {
        title: "MERN Stack Technical Lead",
        description: "Lead an agile team of 6 engineers building enterprise SaaS products. Code reviews, architectural decisions, database modeling, and mentoring junior developers.",
        location: "Pune",
        employmentType: "Full-time",
        salaryMin: 2200000,
        salaryMax: 3200000,
        skills: ["MERN Stack", "System Design", "Microservices", "TypeScript"],
        companyId: company3._id,
        employerId: emp3._id,
        categoryId: categories[0]._id, // Full Stack
        status: "approved",
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Cloud Security & Compliance Associate",
        description: "Review security headers, audit JWT expiration policies, sanitize incoming inputs, and implement rate limiting across public endpoints.",
        location: "Bangalore",
        employmentType: "Part-time",
        salaryMin: 600000,
        salaryMax: 900000,
        skills: ["Cybersecurity", "JWT", "OAuth", "OWASP Top 10", "Linux"],
        companyId: company1._id,
        employerId: emp1._id,
        categoryId: categories[3]._id, // DevOps
        status: "approved",
        deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      },
    ];

    const jobs = await Job.insertMany(jobsData);
    console.log(`Created ${jobs.length} jobs.`);

    // 5. Create Applications with realistic statuses
    await Application.insertMany([
      {
        jobId: jobs[0]._id,
        applicantId: seeker1._id,
        resumeUrl: "/uploads/resumes/rahul-fullstack-resume.pdf",
        coverLetter: "Hi hiring team, I have 3 years of hands-on experience building MERN stack applications with TypeScript and MongoDB. I look forward to contributing to your checkout team.",
        status: "shortlisted",
        appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        jobId: jobs[1]._id,
        applicantId: seeker2._id,
        resumeUrl: "/uploads/resumes/priya-frontend-resume.pdf",
        coverLetter: "I specialize in clean, accessible UI design using React and Tailwind CSS. My portfolio showcases 10+ responsive web projects.",
        status: "selected",
        appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        jobId: jobs[2]._id,
        applicantId: seeker3._id,
        resumeUrl: "/uploads/resumes/amit-backend-resume.pdf",
        coverLetter: "Skilled in Node.js, Express, and distributed database modeling with Mongoose. Passionate about API latency optimization.",
        status: "pending",
        appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        jobId: jobs[0]._id,
        applicantId: seeker4._id,
        resumeUrl: "/uploads/resumes/sneha-dev-resume.pdf",
        coverLetter: "Recent CDAC graduate with top scores in Web Technologies. Proficient in TypeScript, React, and REST API development.",
        status: "pending",
        appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        jobId: jobs[4]._id,
        applicantId: seeker1._id,
        resumeUrl: "/uploads/resumes/rahul-junior-resume.pdf",
        coverLetter: "Interested in the React Junior opening to expand my frontend capabilities.",
        status: "rejected",
        appliedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
    ]);

    console.log("Applications created.");

    console.log("\n=======================================================");
    console.log("🎉 RICH DATA INJECTED SUCCESSFULLY!");
    console.log("=======================================================");
    console.log("Total: 6 Categories, 3 Companies, 10 Jobs, 5 Applications, 7 Users");
    console.log("=======================================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Rich seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
