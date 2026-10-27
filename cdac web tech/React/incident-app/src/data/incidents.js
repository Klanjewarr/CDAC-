export const mockIncidents = [
  {
    _id: "#INC001",
    user: "user001",
    title: "Server not working",
    category: "server_error",
    status: "open",
    severity: "high",
    description: "Login server returning 500 internal error on load.",
    createdAt: "22-10-2026 11:00",
    updatedAt: "22-10-2026 11:00"
  },
  {
    _id: "#INC002",
    user: "user002",
    title: "Suspicious Email Received",
    category: "phishing",
    status: "investigating",
    severity: "critical",
    description: "Multiple employees received emails impersonating HR requesting password reset.",
    createdAt: "22-10-2026 10:15",
    updatedAt: "22-10-2026 10:45"
  },
  {
    _id: "#INC003",
    user: "user003",
    title: "Database Connection Timeout",
    category: "db_error",
    status: "open",
    severity: "high",
    description: "Primary PostgreSQL instance rejecting new connections.",
    createdAt: "22-10-2026 09:30",
    updatedAt: "22-10-2026 09:30"
  },
  {
    _id: "#INC004",
    user: "user004",
    title: "Malware Alert on Workstation 12",
    category: "malware",
    status: "investigating",
    severity: "critical",
    description: "Antivirus flagged Trojan.Win32 in download directory.",
    createdAt: "22-10-2026 08:45",
    updatedAt: "22-10-2026 09:10"
  },
  {
    _id: "#INC005",
    user: "user005",
    title: "API Gateway High Latency",
    category: "server_error",
    status: "resolved",
    severity: "medium",
    description: "Response times spiked above 3000ms due to unindexed query.",
    createdAt: "21-10-2026 16:20",
    updatedAt: "21-10-2026 18:00"
  },
  {
    _id: "#INC006",
    user: "user006",
    title: "Slow Query Execution on Analytics DB",
    category: "db_error",
    status: "open",
    severity: "low",
    description: "Daily reporting queries taking twice as long to execute.",
    createdAt: "21-10-2026 14:10",
    updatedAt: "21-10-2026 14:10"
  },
  {
    _id: "#INC007",
    user: "user007",
    title: "Fake Login Page Spoofing",
    category: "phishing",
    status: "resolved",
    severity: "high",
    description: "External domain detected mimicking company portal UI.",
    createdAt: "21-10-2026 11:00",
    updatedAt: "21-10-2026 15:30"
  },
  {
    _id: "#INC008",
    user: "user008",
    title: "Ransomware Script Blocked",
    category: "malware",
    status: "investigating",
    severity: "critical",
    description: "PowerShell script attempted unauthorized encryption in local temp directory.",
    createdAt: "21-10-2026 09:15",
    updatedAt: "21-10-2026 10:00"
  },
  {
    _id: "#INC009",
    user: "user009",
    title: "Payment Gateway 502 Bad Gateway",
    category: "server_error",
    status: "resolved",
    severity: "high",
    description: "Users unable to complete checkout process.",
    createdAt: "20-10-2026 17:40",
    updatedAt: "20-10-2026 18:15"
  },
  {
    _id: "#INC010",
    user: "user010",
    title: "DB Replica Out of Sync",
    category: "db_error",
    status: "investigating",
    severity: "medium",
    description: "Read replica lagging behind master database by over 120 seconds.",
    createdAt: "20-10-2026 15:00",
    updatedAt: "20-10-2026 15:20"
  },
  {
    _id: "#INC011",
    user: "user011",
    title: "Adware Popup on Marketing PC",
    category: "malware",
    status: "resolved",
    severity: "low",
    description: "Browser extension injecting unwanted ads during browsing.",
    createdAt: "20-10-2026 12:30",
    updatedAt: "20-10-2026 13:00"
  },
  {
    _id: "#INC012",
    user: "user012",
    title: "Credential Harvesting Attempt via SMS",
    category: "phishing",
    status: "open",
    severity: "medium",
    description: "Smishing attack reported targeting sales team mobile phones.",
    createdAt: "20-10-2026 10:05",
    updatedAt: "20-10-2026 10:05"
  },
  {
    _id: "#INC013",
    user: "user013",
    title: "SSL Certificate Expired",
    category: "server_error",
    status: "resolved",
    severity: "critical",
    description: "Staging server throwing SSL error due to expired certificate.",
    createdAt: "19-10-2026 16:00",
    updatedAt: "19-10-2026 16:35"
  },
  {
    _id: "#INC014",
    user: "user014",
    title: "Database Deadlock Detected",
    category: "db_error",
    status: "resolved",
    severity: "medium",
    description: "Concurrent updates on user_sessions table caused lock contention.",
    createdAt: "19-10-2026 11:20",
    updatedAt: "19-10-2026 12:10"
  },
  {
    _id: "#INC015",
    user: "user015",
    title: "Unauthorized USB Device Plugged In",
    category: "malware",
    status: "open",
    severity: "low",
    description: "Unregistered storage device attached to finance station.",
    createdAt: "19-10-2026 09:00",
    updatedAt: "19-10-2026 09:00"
  }
];