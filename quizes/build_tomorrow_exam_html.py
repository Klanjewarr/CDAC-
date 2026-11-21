import json

with open("tomorrow_exam_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDAC CCEE/CMCE Tomorrow War Room: OOP with Java & ADS</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --primary-light: #eef2ff;
            --secondary: #0ea5e9;
            --java-color: #f97316;
            --ads-color: #10b981;
            --accent: #f59e0b;
            --danger: #ef4444;
            --danger-bg: rgba(239, 68, 68, 0.12);
            --success-bg: rgba(16, 185, 129, 0.12);
            --bg-page: #090d16;
            --surface-card: #131b2e;
            --surface-hover: #1c2742;
            --text-light: #f8fafc;
            --text-muted: #94a3b8;
            --border: #22304d;
            --border-hover: #3b82f6;
            --radius-md: 10px;
            --radius-lg: 16px;
            --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
        }}

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }}

        body {{
            background-color: var(--bg-page);
            color: var(--text-light);
            line-height: 1.6;
            padding-bottom: 90px;
        }}

        /* Navbar Header */
        .top-navbar {{
            background: rgba(11, 15, 25, 0.96);
            backdrop-filter: blur(14px);
            border-bottom: 1px solid var(--border);
            padding: 12px 28px;
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }}

        .nav-left {{
            display: flex;
            align-items: center;
            gap: 14px;
        }}

        .back-link {{
            text-decoration: none;
            color: #93c5fd;
            font-weight: 700;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 8px;
            background: rgba(59, 130, 246, 0.15);
            border: 1px solid rgba(96, 165, 250, 0.3);
            transition: all 0.2s;
        }}
        .back-link:hover {{
            background: rgba(59, 130, 246, 0.28);
            transform: translateY(-1px);
        }}

        .portal-title {{
            font-size: 16.5px;
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.02em;
            display: flex;
            align-items: center;
            gap: 8px;
        }}

        .nav-badge {{
            font-size: 10.5px;
            padding: 3px 8px;
            border-radius: 6px;
            font-weight: 700;
            background: #ef4444;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }}

        .nav-stats {{
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 13px;
        }}

        .stat-item {{
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--text-muted);
        }}

        .stat-item strong {{
            color: var(--text-light);
            font-size: 14px;
        }}

        .mode-toggle {{
            display: flex;
            align-items: center;
            background: #1e293b;
            padding: 3px;
            border-radius: 8px;
            border: 1px solid var(--border);
            gap: 4px;
        }}

        .mode-btn {{
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 11.5px;
            font-weight: 700;
            padding: 5px 11px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
        }}

        .mode-btn.active {{
            background: var(--primary);
            color: #fff;
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }}

        /* Hero Alert Header */
        .hero-banner {{
            max-width: 1300px;
            margin: 20px auto 0;
            padding: 0 24px;
        }}

        .hero-card {{
            background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%);
            border: 1px solid #4338ca;
            border-radius: var(--radius-lg);
            padding: 22px 28px;
            position: relative;
            box-shadow: var(--shadow);
        }}

        .hero-card h1 {{
            font-size: 22px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .hero-card p {{
            color: #cbd5e1;
            font-size: 13.5px;
            max-width: 950px;
            line-height: 1.5;
        }}

        .hero-highlights {{
            display: flex;
            gap: 12px;
            margin-top: 14px;
            flex-wrap: wrap;
        }}

        .pill-highlight {{
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: #e2e8f0;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }}

        /* Layout Grid */
        .main-container {{
            max-width: 1300px;
            margin: 20px auto;
            padding: 0 24px;
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 24px;
            align-items: start;
        }}

        /* Filter Bar */
        .filter-bar {{
            background: var(--surface-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 12px 16px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }}

        .filter-btn {{
            background: #1a233a;
            border: 1px solid var(--border);
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 700;
            padding: 6px 12px;
            border-radius: 7px;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }}

        .filter-btn:hover {{
            color: #fff;
            border-color: #3b82f6;
        }}

        .filter-btn.active {{
            background: var(--primary);
            color: #fff;
            border-color: var(--primary);
        }}

        .filter-btn.java-active {{
            background: var(--java-color);
            border-color: var(--java-color);
            color: #fff;
        }}

        .filter-btn.ads-active {{
            background: var(--ads-color);
            border-color: var(--ads-color);
            color: #fff;
        }}

        .view-mode-pill {{
            margin-left: auto;
            background: #1e293b;
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 3px;
            display: flex;
            gap: 4px;
        }}

        .view-btn {{
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 11.5px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.15s;
        }}

        .view-btn.active {{
            background: #334155;
            color: #38bdf8;
        }}

        /* Stepper progress */
        .q-stepper-progress {{
            width: 100%;
            height: 6px;
            background: #1e293b;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 16px;
        }}

        .q-stepper-fill {{
            height: 100%;
            background: linear-gradient(90deg, #6366f1, #38bdf8);
            transition: width 0.25s ease;
        }}

        /* Question Cards */
        .q-card {{
            background: var(--surface-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 26px 28px;
            margin-bottom: 18px;
            box-shadow: var(--shadow);
            position: relative;
        }}

        .q-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;
            flex-wrap: wrap;
            gap: 10px;
        }}

        .q-meta {{
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }}

        .q-number {{
            font-weight: 800;
            font-size: 16px;
            color: #fff;
            background: rgba(99, 102, 241, 0.2);
            padding: 3px 10px;
            border-radius: 6px;
            border: 1px solid rgba(99, 102, 241, 0.4);
        }}

        .badge-section {{
            font-size: 11.5px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 6px;
        }}

        .badge-java {{
            background: rgba(249, 115, 22, 0.15);
            color: #fb923c;
            border: 1px solid rgba(249, 115, 22, 0.3);
        }}

        .badge-ads {{
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }}

        .badge-diff {{
            font-size: 11px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 5px;
        }}

        .diff-Hard {{ background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }}
        .diff-Moderate {{ background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }}
        .diff-Easy {{ background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }}

        .badge-prob {{
            font-size: 11px;
            font-weight: 700;
            background: rgba(147, 51, 234, 0.18);
            color: #c084fc;
            padding: 2px 8px;
            border-radius: 5px;
            border: 1px solid rgba(147, 51, 234, 0.3);
        }}

        .btn-bookmark {{
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-muted);
            border-radius: 6px;
            padding: 5px 10px;
            font-size: 12.5px;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .btn-bookmark:hover, .btn-bookmark.active {{
            color: #fbbf24;
            border-color: #fbbf24;
            background: rgba(251, 191, 36, 0.1);
        }}

        .q-concept {{
            font-size: 13px;
            color: #93c5fd;
            font-weight: 600;
            margin-bottom: 10px;
        }}

        .q-text {{
            font-size: 16px;
            font-weight: 600;
            color: #f8fafc;
            margin-bottom: 16px;
            line-height: 1.5;
        }}

        /* Code block */
        .q-code-container {{
            background: #090d16;
            border: 1px solid #1e293b;
            border-radius: 8px;
            padding: 14px 18px;
            margin-bottom: 18px;
            overflow-x: auto;
        }}

        .q-code {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 13.5px;
            color: #38bdf8;
            line-height: 1.5;
            white-space: pre;
        }}

        /* Options */
        .options-list {{
            display: flex;
            flex-direction: column;
            gap: 11px;
            margin-bottom: 18px;
        }}

        .option-btn {{
            background: #182238;
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 13px 18px;
            text-align: left;
            color: #e2e8f0;
            font-size: 14.5px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            position: relative;
        }}

        .option-btn:hover:not(.locked) {{
            background: #233152;
            border-color: #60a5fa;
            transform: translateX(2px);
        }}

        .opt-letter {{
            font-weight: 800;
            font-size: 13px;
            color: #93c5fd;
            background: rgba(59, 130, 246, 0.15);
            padding: 3px 8px;
            border-radius: 4px;
            min-width: 26px;
            text-align: center;
        }}

        .option-btn.selected {{
            border-color: var(--primary);
            background: rgba(99, 102, 241, 0.2);
        }}

        .option-btn.correct {{
            background: rgba(16, 185, 129, 0.2) !important;
            border-color: #10b981 !important;
            color: #a7f3d0 !important;
        }}

        .option-btn.wrong {{
            background: rgba(239, 68, 68, 0.2) !important;
            border-color: #ef4444 !important;
            color: #fecaca !important;
        }}

        /* Navigation Controls Bar */
        .q-nav-bar {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: var(--surface-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 14px 20px;
            margin-top: 14px;
            margin-bottom: 24px;
            gap: 12px;
            flex-wrap: wrap;
        }}

        .btn-nav {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 11px 22px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            border: 1px solid var(--border);
            transition: all 0.2s;
            background: #182238;
            color: #e2e8f0;
        }}

        .btn-nav:hover:not(:disabled) {{
            background: #233152;
            border-color: #60a5fa;
            transform: translateY(-1px);
        }}

        .btn-nav:disabled {{
            opacity: 0.35;
            cursor: not-allowed;
            transform: none !important;
        }}

        .btn-nav-primary {{
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            color: #fff;
            border: 1px solid #818cf8;
            box-shadow: 0 4px 14px rgba(99, 102, 241, 0.45);
        }}

        .btn-nav-primary:hover:not(:disabled) {{
            background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.65);
        }}

        .q-counter-pill {{
            font-size: 13.5px;
            font-weight: 700;
            color: #93c5fd;
            background: rgba(59, 130, 246, 0.12);
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid rgba(96, 165, 250, 0.25);
        }}

        /* Explanation Box */
        .explanation-box {{
            background: #0f172a;
            border: 1px solid #334155;
            border-left: 4px solid var(--primary);
            border-radius: 8px;
            padding: 18px 22px;
            margin-top: 16px;
            display: none;
            font-size: 14px;
            color: #cbd5e1;
            line-height: 1.6;
        }}

        .explanation-box.visible {{
            display: block;
            animation: fadeIn 0.3s ease;
        }}

        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(-4px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        .exp-header {{
            font-weight: 800;
            font-size: 14.5px;
            color: #38bdf8;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }}

        /* Sticky Sidebar */
        .sidebar {{
            position: sticky;
            top: 76px;
            background: var(--surface-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 20px;
            box-shadow: var(--shadow);
        }}

        .sidebar h3 {{
            font-size: 15.5px;
            font-weight: 800;
            margin-bottom: 14px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }}

        .score-box {{
            background: #0f172a;
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 14px;
            margin-bottom: 16px;
            text-align: center;
        }}

        .score-big {{
            font-size: 30px;
            font-weight: 800;
            color: #38bdf8;
        }}

        .score-sub {{
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 4px;
        }}

        .subject-progress {{
            margin-bottom: 16px;
        }}

        .subj-bar-row {{
            margin-bottom: 10px;
        }}

        .subj-bar-label {{
            display: flex;
            justify-content: space-between;
            font-size: 11.5px;
            font-weight: 700;
            margin-bottom: 4px;
        }}

        .progress-track {{
            height: 7px;
            background: #1e293b;
            border-radius: 4px;
            overflow: hidden;
        }}

        .progress-fill {{
            height: 100%;
            transition: width 0.3s;
        }}

        .grid-header {{
            font-size: 12.5px;
            font-weight: 700;
            color: var(--text-muted);
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
        }}

        .nav-grid {{
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 5px;
            max-height: 270px;
            overflow-y: auto;
            padding-right: 4px;
            margin-bottom: 16px;
        }}

        .grid-btn {{
            background: #182238;
            border: 1px solid var(--border);
            color: var(--text-muted);
            font-size: 11px;
            font-weight: 700;
            padding: 6px 0;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            transition: all 0.15s;
        }}

        .grid-btn:hover {{
            background: #233152;
            color: #fff;
        }}

        .grid-btn.answered {{
            background: var(--primary);
            color: #fff;
            border-color: var(--primary);
        }}

        .grid-btn.correct {{
            background: #059669;
            color: #fff;
            border-color: #10b981;
        }}

        .grid-btn.wrong {{
            background: #dc2626;
            color: #fff;
            border-color: #ef4444;
        }}

        .grid-btn.active-current {{
            outline: 2px solid #60a5fa;
            box-shadow: 0 0 10px rgba(96, 165, 250, 0.9);
            transform: scale(1.12);
            z-index: 2;
            color: #fff;
            background: #3b82f6;
        }}

        .grid-btn.is-bookmarked::after {{
            content: "★";
            display: block;
            font-size: 8px;
            color: #fbbf24;
            line-height: 0.8;
            margin-top: 1px;
        }}

        .action-btns {{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }}

        .btn-full {{
            width: 100%;
            padding: 10px 16px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }}

        .btn-submit {{
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #fff;
        }}
        .btn-submit:hover {{
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }}

        .btn-reset {{
            background: #1e293b;
            color: var(--text-muted);
            border: 1px solid var(--border);
        }}
        .btn-reset:hover {{
            background: #334155;
            color: #fff;
        }}

        /* Keyboard tips */
        .keyboard-hint {{
            font-size: 11.5px;
            color: #64748b;
            text-align: center;
            margin-top: 12px;
            line-height: 1.4;
        }}

        .keyboard-hint kbd {{
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 3px;
            padding: 1px 5px;
            font-size: 10.5px;
            color: #94a3b8;
            font-family: monospace;
        }}

        /* Modal */
        .modal-overlay {{
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(8px);
            z-index: 2000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }}

        .modal-overlay.open {{
            display: flex;
        }}

        .modal-card {{
            background: var(--surface-card);
            border: 1px solid #3730a3;
            border-radius: var(--radius-lg);
            max-width: 560px;
            width: 100%;
            padding: 32px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
            text-align: center;
        }}

        .modal-card h2 {{
            font-size: 24px;
            font-weight: 800;
            color: #fff;
            margin-bottom: 8px;
        }}

        .modal-score {{
            font-size: 48px;
            font-weight: 800;
            color: #38bdf8;
            margin: 16px 0 6px;
        }}

        .modal-pct {{
            font-size: 16px;
            font-weight: 700;
            color: #a5b4fc;
            margin-bottom: 20px;
        }}

        .modal-badge {{
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 800;
            font-size: 13px;
            margin-bottom: 24px;
        }}

        .badge-distinction {{ background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #10b981; }}
        .badge-first {{ background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid #3b82f6; }}
        .badge-pass {{ background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #f59e0b; }}
        .badge-fail {{ background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; }}

        .modal-btns {{
            display: flex;
            gap: 12px;
            justify-content: center;
        }}

        @media (max-width: 900px) {{
            .main-container {{
                grid-template-columns: 1fr;
            }}
            .sidebar {{
                order: -1;
                position: static;
                margin-bottom: 24px;
            }}
        }}
    </style>
</head>
<body>

    <!-- Sticky Navbar -->
    <header class="top-navbar">
        <div class="nav-left">
            <a href="index.html" class="back-link">← Master Hub</a>
            <div class="portal-title">
                <span>⚡ Tomorrow War Room</span>
                <span class="nav-badge">HIGH PRIORITY</span>
            </div>
        </div>
        <div class="nav-stats">
            <div class="stat-item">
                <span>Progress:</span>
                <strong id="headerProgress">0 / 100</strong>
            </div>
            <div class="stat-item">
                <span>Accuracy:</span>
                <strong id="headerAccuracy">0%</strong>
            </div>
            <div class="mode-toggle">
                <button class="mode-btn active" id="btnModePractice" onclick="setMode('practice')">🎯 Practice</button>
                <button class="mode-btn" id="btnModeExam" onclick="setMode('exam')">⏱️ Exam (60m)</button>
            </div>
        </div>
    </header>

    <!-- Hero Card -->
    <section class="hero-banner">
        <div class="hero-card">
            <h1>🚨 OOP in Java & ADS: Scenario & Code Snippet War Room</h1>
            <p>
                Engineered specifically after today's tough C++ and Database exam experience. Real CDAC CCEE/CMCE papers skip trivial theory and test <strong>code execution traces, compilation traps, exception flows, and tricky edge cases</strong>. 1 question at a time with instant in-depth feedback.
            </p>
            <div class="hero-highlights">
                <span class="pill-highlight">📜 40 Questions from Real CCEE Exam Paper</span>
                <span class="pill-highlight">☕ 50 Java OOP Code Scenarios</span>
                <span class="pill-highlight">🌲 50 ADS Code & Complexity Drills</span>
                <span class="pill-highlight">💡 Step-by-Step Traps & CDAC Rules Explained</span>
            </div>
        </div>
    </section>

    <!-- Main Layout -->
    <main class="main-container">
        <!-- Question Stream Column -->
        <div class="stream-column">
            <!-- Filter Bar & View Toggle -->
            <div class="filter-bar">
                <button class="filter-btn active" id="fAll" onclick="setFilter('all')">All Questions (100)</button>
                <button class="filter-btn" id="fJava" onclick="setFilter('JAVA')">☕ OOP Java (50)</button>
                <button class="filter-btn" id="fAds" onclick="setFilter('ADS')">🌲 ADS (50)</button>
                <button class="filter-btn" id="fHard" onclick="setFilter('hard')">🔥 Hard Traps</button>
                <button class="filter-btn" id="fMistakes" onclick="setFilter('mistakes')">❌ Mistakes</button>
                <button class="filter-btn" id="fBookmarked" onclick="setFilter('bookmarked')">⭐ Bookmarked</button>

                <div class="view-mode-pill">
                    <button class="view-btn active" id="btnViewSingle" onclick="setViewMode('single')">📄 One-by-One</button>
                    <button class="view-btn" id="btnViewAll" onclick="setViewMode('all')">📜 All at Once</button>
                </div>
            </div>

            <!-- Stepper Progress Bar (Single view only) -->
            <div class="q-stepper-progress" id="stepperContainer">
                <div class="q-stepper-fill" id="stepperFill" style="width: 1%;"></div>
            </div>

            <!-- Container where questions are injected -->
            <div id="questionsContainer"></div>

            <!-- Single Question Navigation Bar (Shown in single view) -->
            <div class="q-nav-bar" id="singleNavBar">
                <button class="btn-nav" id="btnPrev" onclick="prevQuestion()">
                    <span>← Previous</span>
                </button>

                <div class="q-counter-pill" id="counterPill">
                    Question 1 of 100
                </div>

                <div style="display: flex; gap: 8px;">
                    <button class="btn-nav" id="btnClearAns" onclick="clearCurrentAnswer()" style="font-size: 13px; padding: 10px 14px;">
                        <span>Clear</span>
                    </button>
                    <button class="btn-nav btn-nav-primary" id="btnNext" onclick="nextQuestion()">
                        <span>Next Question →</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Sticky Sidebar Navigation & Analytics -->
        <aside class="sidebar">
            <h3>
                <span>Session Summary</span>
                <span id="timerDisplay" style="font-size: 13px; color: #f59e0b; display: none;">⏳ 60:00</span>
            </h3>

            <div class="score-box">
                <div class="score-big" id="scoreDisplay">0 / 100</div>
                <div class="score-sub" id="scoreSub">Answered 0 of 100 questions</div>
            </div>

            <div class="subject-progress">
                <div class="subj-bar-row">
                    <div class="subj-bar-label">
                        <span style="color: #fb923c;">☕ OOP Java Mastery</span>
                        <span id="lblJavaScore">0 / 50</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" id="barJava" style="width: 0%; background: #f97316;"></div>
                    </div>
                </div>
                <div class="subj-bar-row">
                    <div class="subj-bar-label">
                        <span style="color: #34d399;">🌲 ADS Mastery</span>
                        <span id="lblAdsScore">0 / 50</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" id="barAds" style="width: 0%; background: #10b981;"></div>
                    </div>
                </div>
            </div>

            <div class="grid-header">
                <span>QUESTION JUMP GRID</span>
                <span id="gridAnsweredCount">0 answered</span>
            </div>

            <div class="nav-grid" id="navGrid"></div>

            <div class="action-btns">
                <button class="btn-full btn-submit" id="btnSubmitExam" onclick="submitExam()">🏁 Submit & Evaluate Exam</button>
                <button class="btn-full btn-reset" onclick="resetQuiz()">🔄 Reset Session</button>
            </div>

            <div class="keyboard-hint">
                💡 Keyboard: <kbd>→</kbd> Next, <kbd>←</kbd> Prev, <kbd>A</kbd>/<kbd>B</kbd>/<kbd>C</kbd>/<kbd>D</kbd> Select Option
            </div>
        </aside>
    </main>

    <!-- Score Evaluation Modal -->
    <div class="modal-overlay" id="scoreModal">
        <div class="modal-card">
            <h2>🏆 Evaluation Complete</h2>
            <p style="color: var(--text-muted); font-size: 14px;">Your readiness evaluation for tomorrow's exam</p>
            <div class="modal-score" id="modalScore">0 / 100</div>
            <div class="modal-pct" id="modalPct">0% Score</div>
            <div>
                <span class="modal-badge" id="modalBadge">Pass</span>
            </div>
            <div style="text-align: left; background: #0f172a; padding: 14px; border-radius: 8px; margin-bottom: 20px; font-size: 13.5px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span>☕ OOP Java:</span>
                    <strong id="modalJavaScore" style="color: #fb923c;">0 / 50</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>🌲 ADS:</span>
                    <strong id="modalAdsScore" style="color: #34d399;">0 / 50</strong>
                </div>
            </div>
            <div class="modal-btns">
                <button class="btn-full btn-submit" onclick="closeModal()">Review Answers & Traps</button>
                <button class="btn-full btn-reset" onclick="retakeExam()">Retake Exam</button>
            </div>
        </div>
    </div>

    <!-- Question Data and JavaScript Engine -->
    <script>
        const QUESTIONS = {json.dumps(questions)};
        const STORAGE_KEY = "cdac_tomorrow_exam_prep_state_v1";

        let userState = {{
            answers: {{}},
            bookmarks: {{}},
            allExpanded: false
        }};

        let currentMode = "practice"; // practice | exam
        let currentFilter = "all";    // all | JAVA | ADS | hard | mistakes | bookmarked
        let viewMode = "single";      // single | all
        let currentIndex = 0;         // index within the filtered questions list
        let examSubmitted = false;
        let timerInterval = null;
        let timeRemainingSeconds = 60 * 60;

        function loadState() {{
            try {{
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {{
                    const parsed = JSON.parse(saved);
                    userState.answers = parsed.answers || {{}};
                    userState.bookmarks = parsed.bookmarks || {{}};
                }}
            }} catch(e) {{
                console.error("Failed to load state", e);
            }}
        }}

        function saveState() {{
            try {{
                localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
            }} catch(e) {{
                console.error("Failed to save state", e);
            }}
        }}

        function getFilteredQuestions() {{
            return QUESTIONS.filter(q => {{
                if (currentFilter === "JAVA") return q.subjectCode === "JAVA";
                if (currentFilter === "ADS") return q.subjectCode === "ADS";
                if (currentFilter === "hard") return q.difficulty === "Hard";
                if (currentFilter === "mistakes") return userState.answers[q.id] && userState.answers[q.id] !== q.answer;
                if (currentFilter === "bookmarked") return !!userState.bookmarks[q.id];
                return true;
            }});
        }}

        function setViewMode(mode) {{
            viewMode = mode;
            document.getElementById("btnViewSingle").classList.toggle("active", mode === "single");
            document.getElementById("btnViewAll").classList.toggle("active", mode === "all");
            document.getElementById("singleNavBar").style.display = mode === "single" ? "flex" : "none";
            document.getElementById("stepperContainer").style.display = mode === "single" ? "block" : "none";
            renderQuestions();
        }}

        function setMode(mode) {{
            currentMode = mode;
            document.getElementById("btnModePractice").classList.toggle("active", mode === "practice");
            document.getElementById("btnModeExam").classList.toggle("active", mode === "exam");
            const timerEl = document.getElementById("timerDisplay");
            if (mode === "exam") {{
                timerEl.style.display = "inline-block";
                startTimer();
            }} else {{
                timerEl.style.display = "none";
                stopTimer();
            }}
            renderQuestions();
            updateStats();
        }}

        function startTimer() {{
            stopTimer();
            timerInterval = setInterval(() => {{
                timeRemainingSeconds--;
                if (timeRemainingSeconds <= 0) {{
                    stopTimer();
                    alert("⏰ Time is up! Submitting exam automatically.");
                    submitExam();
                }} else {{
                    const m = Math.floor(timeRemainingSeconds / 60);
                    const s = timeRemainingSeconds % 60;
                    document.getElementById("timerDisplay").textContent = `⏳ ${{m.toString().padStart(2, '0')}}:${{s.toString().padStart(2, '0')}}`;
                }}
            }}, 1000);
        }}

        function stopTimer() {{
            if (timerInterval) clearInterval(timerInterval);
        }}

        function setFilter(filter) {{
            currentFilter = filter;
            currentIndex = 0;
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active", "java-active", "ads-active"));
            if (filter === "all") document.getElementById("fAll").classList.add("active");
            else if (filter === "JAVA") document.getElementById("fJava").classList.add("java-active");
            else if (filter === "ADS") document.getElementById("fAds").classList.add("ads-active");
            else if (filter === "hard") document.getElementById("fHard").classList.add("active");
            else if (filter === "mistakes") document.getElementById("fMistakes").classList.add("active");
            else if (filter === "bookmarked") document.getElementById("fBookmarked").classList.add("active");
            renderQuestions();
            updateStats();
        }}

        function toggleBookmark(qId, e) {{
            if (e) e.stopPropagation();
            if (userState.bookmarks[qId]) delete userState.bookmarks[qId];
            else userState.bookmarks[qId] = true;
            saveState();
            renderQuestions();
            updateStats();
        }}

        function handleOptionClick(qId, selectedOption) {{
            if (currentMode === "exam" && examSubmitted) return;
            userState.answers[qId] = selectedOption;
            saveState();
            renderQuestions();
            updateStats();
        }}

        function clearCurrentAnswer() {{
            const list = getFilteredQuestions();
            if (list.length === 0) return;
            const q = list[currentIndex];
            if (userState.answers[q.id]) {{
                delete userState.answers[q.id];
                saveState();
                renderQuestions();
                updateStats();
            }}
        }}

        function nextQuestion() {{
            const list = getFilteredQuestions();
            if (currentIndex < list.length - 1) {{
                currentIndex++;
                renderQuestions();
                updateStats();
                window.scrollTo({{ top: 120, behavior: "smooth" }});
            }} else if (currentMode === "exam" && !examSubmitted) {{
                if (confirm("You have reached the end of the question set. Do you want to submit your exam now?")) {{
                    submitExam();
                }}
            }}
        }}

        function prevQuestion() {{
            if (currentIndex > 0) {{
                currentIndex--;
                renderQuestions();
                updateStats();
                window.scrollTo({{ top: 120, behavior: "smooth" }});
            }}
        }}

        function renderQuestionCard(q, idx, total) {{
            const userChoice = userState.answers[q.id];
            const isBookmarked = !!userState.bookmarks[q.id];
            const isJava = q.subjectCode === "JAVA";
            const isAnswered = !!userChoice;
            const isCorrect = userChoice === q.answer;
            const showExplanation = (currentMode === "practice" && isAnswered) || examSubmitted || userState.allExpanded;

            return `
            <div class="q-card" id="qCard_${{q.id}}">
                <div class="q-header">
                    <div class="q-meta">
                        <span class="q-number">Q${{q.id}}</span>
                        <span class="badge-section ${{isJava ? 'badge-java' : 'badge-ads'}}">${{q.subjectName}}</span>
                        <span class="badge-diff diff-${{q.difficulty}}">${{q.difficulty}}</span>
                        <span class="badge-prob">${{q.probability}}</span>
                    </div>
                    <button class="btn-bookmark ${{isBookmarked ? 'active' : ''}}" onclick="toggleBookmark(${{q.id}}, event)">
                        ${{isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}}
                    </button>
                </div>

                <div class="q-concept">🎯 Concept: ${{q.concept}}</div>
                <div class="q-text">${{q.question}}</div>

                ${{q.code ? `<div class="q-code-container"><div class="q-code">${{escapeHtml(q.code)}}</div></div>` : ''}}

                <div class="options-list">
                    ${{Object.entries(q.options).map(([optKey, optVal]) => {{
                        let optClass = "option-btn";
                        if (userChoice === optKey) optClass += " selected";
                        if (currentMode === "practice" && isAnswered) {{
                            if (optKey === q.answer) optClass += " correct";
                            else if (userChoice === optKey) optClass += " wrong";
                        }} else if (currentMode === "exam" && examSubmitted) {{
                            if (optKey === q.answer) optClass += " correct";
                            else if (userChoice === optKey) optClass += " wrong";
                        }}

                        return `
                        <button class="${{optClass}}" onclick="handleOptionClick(${{q.id}}, '${{optKey}}')">
                            <span class="opt-letter">${{optKey}}</span>
                            <span>${{escapeHtml(optVal)}}</span>
                        </button>
                        `;
                    }}).join('')}}
                </div>

                <div class="explanation-box ${{showExplanation ? 'visible' : ''}}" id="exp_${{q.id}}">
                    <div class="exp-header">
                        <span>💡 Detailed CDAC Solution & Trap Analysis</span>
                        <span style="margin-left: auto; font-size: 12px; color: #10b981; font-weight: 700;">Correct Answer: ${{q.answer}}</span>
                    </div>
                    <div>${{formatExplanation(q.explanation)}}</div>
                </div>
            </div>
            `;
        }}

        function renderQuestions() {{
            const container = document.getElementById("questionsContainer");
            const filtered = getFilteredQuestions();

            if (filtered.length === 0) {{
                container.innerHTML = `<div style="text-align: center; padding: 48px; background: var(--surface-card); border-radius: var(--radius-lg); border: 1px solid var(--border);">
                    <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
                    <h3 style="color: #fff; margin-bottom: 6px;">No questions match this filter</h3>
                    <p style="color: var(--text-muted); font-size: 14px;">Select 'All Questions' or choose another category.</p>
                </div>`;
                document.getElementById("singleNavBar").style.display = "none";
                document.getElementById("stepperContainer").style.display = "none";
                return;
            }}

            if (viewMode === "single") {{
                document.getElementById("singleNavBar").style.display = "flex";
                document.getElementById("stepperContainer").style.display = "block";

                // Ensure currentIndex in range
                if (currentIndex >= filtered.length) currentIndex = filtered.length - 1;
                if (currentIndex < 0) currentIndex = 0;

                const currentQ = filtered[currentIndex];
                container.innerHTML = renderQuestionCard(currentQ, currentIndex, filtered.length);

                // Update stepper and nav buttons
                const pct = Math.round(((currentIndex + 1) / filtered.length) * 100);
                document.getElementById("stepperFill").style.width = `${{pct}}%`;
                document.getElementById("counterPill").textContent = `Question ${{currentIndex + 1}} of ${{filtered.length}} (Q${{currentQ.id}})`;
                document.getElementById("btnPrev").disabled = (currentIndex === 0);

                const btnNext = document.getElementById("btnNext");
                if (currentIndex === filtered.length - 1) {{
                    btnNext.innerHTML = currentMode === "exam" ? "<span>Finish Exam 🏁</span>" : "<span>At Last Question ✓</span>";
                }} else {{
                    btnNext.innerHTML = "<span>Next Question →</span>";
                }}
            }} else {{
                // All at once
                document.getElementById("singleNavBar").style.display = "none";
                document.getElementById("stepperContainer").style.display = "none";
                container.innerHTML = filtered.map((q, idx) => renderQuestionCard(q, idx, filtered.length)).join('');
            }}
        }}

        function escapeHtml(str) {{
            if (!str) return "";
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }}

        function formatExplanation(text) {{
            if (!text) return "";
            return text
                .replace(/### (.*?)\\n/g, '<h4 style="color: #60a5fa; margin: 12px 0 6px 0; font-size: 13.5px;">$1</h4>')
                .replace(/\\*\\*(.*?)\\*\\*/g, '<strong style="color: #fff;">$1</strong>')
                .replace(/`(.*?)`/g, '<code style="background: rgba(59, 130, 246, 0.15); color: #93c5fd; padding: 2px 5px; border-radius: 4px; font-family: monospace;">$1</code>')
                .replace(/\\n/g, '<br>');
        }}

        function renderNavGrid() {{
            const grid = document.getElementById("navGrid");
            grid.innerHTML = QUESTIONS.map(q => `
                <button class="grid-btn" id="gridBtn_${{q.id}}" onclick="scrollToQuestion(${{q.id}})">${{q.id}}</button>
            `).join('');
        }}

        function updateStats() {{
            let correct = 0;
            let answered = 0;
            let javaCorrect = 0, javaTotal = 50;
            let adsCorrect = 0, adsTotal = 50;

            const filtered = getFilteredQuestions();
            const currentActiveQ = (viewMode === "single" && filtered.length > 0) ? filtered[currentIndex] : null;

            QUESTIONS.forEach(q => {{
                const userChoice = userState.answers[q.id];
                const btn = document.getElementById(`gridBtn_${{q.id}}`);
                if (btn) {{
                    btn.className = "grid-btn";
                    if (userState.bookmarks[q.id]) btn.classList.add("is-bookmarked");
                    if (currentActiveQ && q.id === currentActiveQ.id) btn.classList.add("active-current");
                }}

                if (userChoice) {{
                    answered++;
                    const isCorrect = userChoice === q.answer;
                    if (isCorrect) {{
                        correct++;
                        if (q.subjectCode === "JAVA") javaCorrect++;
                        else adsCorrect++;
                    }}

                    if (btn) {{
                        if (currentMode === "practice" || examSubmitted) {{
                            if (isCorrect) btn.classList.add("correct");
                            else btn.classList.add("wrong");
                        }} else {{
                            btn.classList.add("answered");
                        }}
                    }}
                }}
            }});

            const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;
            document.getElementById("scoreDisplay").textContent = `${{correct}} / ${{QUESTIONS.length}}`;
            document.getElementById("scoreSub").textContent = `Answered ${{answered}} of ${{QUESTIONS.length}} questions`;
            document.getElementById("headerProgress").textContent = `${{answered}} / ${{QUESTIONS.length}}`;
            document.getElementById("headerAccuracy").textContent = `${{pct}}%`;
            document.getElementById("gridAnsweredCount").textContent = `${{answered}} answered`;

            // Subject progress
            document.getElementById("lblJavaScore").textContent = `${{javaCorrect}} / ${{javaTotal}}`;
            document.getElementById("barJava").style.width = `${{(javaCorrect / javaTotal) * 100}}%`;

            document.getElementById("lblAdsScore").textContent = `${{adsCorrect}} / ${{adsTotal}}`;
            document.getElementById("barAds").style.width = `${{(adsCorrect / adsTotal) * 100}}%`;
        }}

        function scrollToQuestion(qId) {{
            const list = getFilteredQuestions();
            let idx = list.findIndex(item => item.id === qId);

            if (idx === -1) {{
                // If question is not in current filter, reset filter to 'all'
                setFilter("all");
                const allList = getFilteredQuestions();
                idx = allList.findIndex(item => item.id === qId);
            }}

            if (idx !== -1) {{
                currentIndex = idx;
                renderQuestions();
                updateStats();
                if (viewMode === "single") {{
                    window.scrollTo({{ top: 120, behavior: "smooth" }});
                }} else {{
                    setTimeout(() => {{
                        const el = document.getElementById(`qCard_${{qId}}`);
                        if (el) el.scrollIntoView({{ behavior: "smooth", block: "center" }});
                    }}, 50);
                }}
            }}
        }}

        function submitExam() {{
            stopTimer();
            examSubmitted = true;
            let correct = 0;
            let javaCorrect = 0;
            let adsCorrect = 0;

            QUESTIONS.forEach(q => {{
                const userChoice = userState.answers[q.id];
                if (userChoice === q.answer) {{
                    correct++;
                    if (q.subjectCode === "JAVA") javaCorrect++;
                    else adsCorrect++;
                }}
            }});

            const pct = Math.round((correct / QUESTIONS.length) * 100);
            document.getElementById("modalScore").textContent = `${{correct}} / ${{QUESTIONS.length}}`;
            document.getElementById("modalPct").textContent = `${{pct}}% Overall Score (${{correct * 2}} / 200 Marks)`;
            document.getElementById("modalJavaScore").textContent = `${{javaCorrect}} / 50 (${{javaCorrect * 2}} Marks)`;
            document.getElementById("modalAdsScore").textContent = `${{adsCorrect}} / 50 (${{adsCorrect * 2}} Marks)`;

            const badge = document.getElementById("modalBadge");
            if (pct >= 80) {{
                badge.className = "modal-badge badge-distinction";
                badge.textContent = "🏆 Distinction Grade (Ready to Ace Tomorrow!)";
            }} else if (pct >= 65) {{
                badge.className = "modal-badge badge-first";
                badge.textContent = "🥇 First Class Grade (Solid Preparation)";
            }} else if (pct >= 50) {{
                badge.className = "modal-badge badge-pass";
                badge.textContent = "🥈 Pass Grade (Target Weaker Topics Tonight)";
            }} else {{
                badge.className = "modal-badge badge-fail";
                badge.textContent = "⚠️ Critical Review Needed (<50%)";
            }}

            document.getElementById("scoreModal").classList.add("open");
            renderQuestions();
            updateStats();
        }}

        function closeModal() {{
            document.getElementById("scoreModal").classList.remove("open");
            renderQuestions();
        }}

        function retakeExam() {{
            document.getElementById("scoreModal").classList.remove("open");
            resetQuiz();
        }}

        function resetQuiz() {{
            if (confirm("Reset all your answers and progress for this session?")) {{
                userState.answers = {{}};
                userState.bookmarks = {{}};
                examSubmitted = false;
                currentIndex = 0;
                timeRemainingSeconds = 60 * 60;
                saveState();
                renderQuestions();
                updateStats();
            }}
        }}

        // Keyboard navigation listener
        window.addEventListener("keydown", function(e) {{
            // Ignore if active in input
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

            if (e.key === "ArrowRight") {{
                nextQuestion();
            }} else if (e.key === "ArrowLeft") {{
                prevQuestion();
            }} else if (["a", "b", "c", "d", "A", "B", "C", "D"].includes(e.key)) {{
                const list = getFilteredQuestions();
                if (list.length > 0 && viewMode === "single") {{
                    const q = list[currentIndex];
                    handleOptionClick(q.id, e.key.toUpperCase());
                }}
            }}
        }});

        // Initialize
        loadState();
        renderNavGrid();
        renderQuestions();
        updateStats();
    </script>
</body>
</html>
"""

with open("tomorrow_exam_prep.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("tomorrow_exam_prep.html rebuilt with one-by-one question view successfully!")
