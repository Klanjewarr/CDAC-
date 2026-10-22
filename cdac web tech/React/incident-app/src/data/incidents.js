export const mockIncidents = [
  {
    _id: "#INC001",
    user: "user001",
    title: "Server Not Working",
    category: "server_error",
    status: "open",
    severity: "high",
    description: "Login authentication server is not responding to requests.",
    createdAt: "22-10-2026 11:00",
    updatedAt: "22-10-2026 11:00"
  },
  {
    _id: "#INC002",
    user: "user002",
    title: "Suspicious HR Email Link",
    category: "phising",
    status: "investigating",
    severity: "medium",
    description: "Multiple employees received a fake password reset email claiming to be from HR.",
    createdAt: "22-10-2026 11:15",
    updatedAt: "22-10-2026 11:30"
  },
  {
    _id: "#INC003",
    user: "user003",
    title: "Ransomware Alert on Workstation 14",
    category: "malware",
    status: "investigating",
    severity: "critical",
    description: "Endpoint protection flagged unauthorized file encryption activity on finance PC.",
    createdAt: "22-10-2026 11:45",
    updatedAt: "22-10-2026 12:10"
  },
  {
    _id: "#INC004",
    user: "user001",
    title: "Customer Table Connection Timeout",
    category: "db_error",
    status: "open",
    severity: "high",
    description: "Primary PostgreSQL database is throwing max connection pool errors.",
    createdAt: "22-10-2026 12:05",
    updatedAt: "22-10-2026 12:05"
  },
  {
    _id: "#INC005",
    user: "user004",
    title: "API Gateway 502 Bad Gateway",
    category: "server_error",
    status: "resolved",
    severity: "critical",
    description: "Load balancer failed to route traffic to backend microservices after deployment.",
    createdAt: "22-10-2026 12:30",
    updatedAt: "22-10-2026 13:15"
  },
  {
    _id: "#INC006",
    user: "user002",
    title: "Fake Invoice Attachment",
    category: "phising",
    status: "resolved",
    severity: "low",
    description: "External vendor spoofed email detected and quarantined by mail filter.",
    createdAt: "22-10-2026 13:00",
    updatedAt: "22-10-2026 13:20"
  },
  {
    _id: "#INC007",
    user: "user005",
    title: "Trojan Detected in Downloaded Utility",
    category: "malware",
    status: "open",
    severity: "high",
    description: "Antivirus blocked a suspicious background process attempting outbound traffic.",
    createdAt: "22-10-2026 13:40",
    updatedAt: "22-10-2026 13:40"
  },
  {
    _id: "#INC008",
    user: "user003",
    title: "Slow Query on Order History",
    category: "db_error",
    status: "investigating",
    severity: "medium",
    description: "Missing index on orders table causing dashboard load times over 30 seconds.",
    createdAt: "22-10-2026 14:10",
    updatedAt: "22-10-2026 14:45"
  },
  {
    _id: "#INC009",
    user: "user001",
    title: "High CPU Usage on Worker Node 3",
    category: "server_error",
    status: "investigating",
    severity: "medium",
    description: "Memory leak in background job processor causing CPU spikes to 99%.",
    createdAt: "22-10-2026 15:00",
    updatedAt: "22-10-2026 15:20"
  },
  {
    _id: "#INC010",
    user: "user006",
    title: "CEO Fraud Wire Transfer Request",
    category: "phising",
    status: "open",
    severity: "critical",
    description: "Spoofed executive domain requesting urgent wire transfer from accounting team.",
    createdAt: "22-10-2026 15:35",
    updatedAt: "22-10-2026 15:35"
  },
  {
    _id: "#INC011",
    user: "user004",
    title: "Database Replica Out of Sync",
    category: "db_error",
    status: "resolved",
    severity: "high",
    description: "Read replica lag reached 15 minutes due to heavy batch migration script.",
    createdAt: "22-10-2026 16:00",
    updatedAt: "22-10-2026 16:50"
  },
  {
    _id: "#INC012",
    user: "user002",
    title: "Adware Browser Extension Installed",
    category: "malware",
    status: "resolved",
    severity: "low",
    description: "Unauthorized browser extension injecting popups on marketing machine removed.",
    createdAt: "22-10-2026 16:25",
    updatedAt: "22-10-2026 17:00"
  },
  {
    _id: "#INC013",
    user: "user005",
    title: "SSL Certificate Expired on Staging",
    category: "server_error",
    status: "open",
    severity: "low",
    description: "Auto-renewal cron job failed for staging environment HTTPS certificate.",
    createdAt: "22-10-2026 17:15",
    updatedAt: "22-10-2026 17:15"
  },
  {
    _id: "#INC014",
    user: "user001",
    title: "Deadlock in Inventory Transaction",
    category: "db_error",
    status: "open",
    severity: "critical",
    description: "Concurrent checkout requests locking inventory rows and failing orders.",
    createdAt: "22-10-2026 17:40",
    updatedAt: "22-10-2026 17:40"
  },
  {
    _id: "#INC015",
    user: "user003",
    title: "Keylogger Found on Shared Kiosk",
    category: "malware",
    status: "investigating",
    severity: "critical",
    description: "Unauthorized USB device and background capture script discovered in lobby terminal.",
    createdAt: "22-10-2026 18:05",
    updatedAt: "22-10-2026 18:20"
  }
];