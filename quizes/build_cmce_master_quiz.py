import json

with open("c:/Users/kanch/Desktop/cdac/quizes/cmce_master_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

questions_json = json.dumps(questions, ensure_ascii=False)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDAC CMCE All-5-Subjects Master High-Yield Exam Simulator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --primary-light: #eef2ff;
            --secondary: #0ea5e9;
            --accent: #f59e0b;
            --success: #10b981;
            --success-light: #ecfdf5;
            --danger: #ef4444;
            --danger-light: #fef2f2;
            --bg-page: #0b0f19;
            --surface-card: #151d30;
            --surface-hover: #1e293b;
            --text-light: #f8fafc;
            --text-muted: #94a3b8;
            --border: #22304d;
            --border-hover: #3b82f6;
            --radius-md: 10px;
            --radius-lg: 16px;
            --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
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
            padding-bottom: 80px;
        }}

        /* Navbar Header */
        .top-navbar {{
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
            padding: 12px 24px;
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
            border: 1px solid rgba(96, 165, 250, 0.25);
            transition: all 0.2s;
        }}

        .back-link:hover {{
            background: rgba(59, 130, 246, 0.3);
            transform: translateX(-2px);
        }}

        .quiz-title-badge {{
            display: flex;
            align-items: center;
            gap: 8px;
        }}

        .brand-text {{
            font-size: 15px;
            font-weight: 800;
            letter-spacing: -0.3px;
            color: #ffffff;
        }}

        .batch-pill {{
            font-size: 10.5px;
            font-weight: 800;
            padding: 3px 8px;
            border-radius: 9999px;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: #0f172a;
            text-transform: uppercase;
        }}

        .nav-center {{
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        .mode-toggle {{
            display: flex;
            background: #0f172a;
            padding: 3px;
            border-radius: 8px;
            border: 1px solid var(--border);
        }}

        .mode-btn {{
            border: none;
            background: transparent;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            color: var(--text-muted);
            transition: all 0.2s;
        }}

        .mode-btn.active {{
            background: var(--primary);
            color: #ffffff;
            box-shadow: 0 2px 6px rgba(79, 70, 229, 0.4);
        }}

        .timer-box {{
            display: none;
            align-items: center;
            gap: 6px;
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #f87171;
            padding: 6px 14px;
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            font-weight: 700;
        }}

        .timer-box.warning {{
            animation: pulse-red 1s infinite alternate;
        }}

        @keyframes pulse-red {{
            from {{ background: rgba(239, 68, 68, 0.15); }}
            to {{ background: rgba(239, 68, 68, 0.4); }}
        }}

        .nav-right {{
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        .score-pill {{
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid var(--border);
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 12.5px;
            font-weight: 700;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            gap: 6px;
        }}

        .score-val {{
            color: #38bdf8;
            font-family: 'JetBrains Mono', monospace;
        }}

        /* Hero Banner */
        .hero-banner {{
            background: linear-gradient(135deg, #1e1b4b 0%, #1e293b 50%, #0f172a 100%);
            border-bottom: 1px solid var(--border);
            padding: 36px 24px;
            position: relative;
            overflow: hidden;
        }}

        .hero-banner-inner {{
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
        }}

        .hero-tagline {{
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 11.5px;
            font-weight: 800;
            text-transform: uppercase;
            color: #f59e0b;
            letter-spacing: 0.6px;
            margin-bottom: 8px;
        }}

        .hero-banner h1 {{
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }}

        .hero-banner p {{
            font-size: 14.5px;
            color: #cbd5e1;
            max-width: 880px;
            line-height: 1.5;
            margin-bottom: 20px;
        }}

        .subject-strip {{
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }}

        .sub-chip {{
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid var(--border);
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 700;
            color: #e2e8f0;
            display: flex;
            align-items: center;
            gap: 6px;
        }}

        .sub-chip.c1 {{ border-left: 3px solid #6366f1; }}
        .sub-chip.c2 {{ border-left: 3px solid #10b981; }}
        .sub-chip.c3 {{ border-left: 3px solid #f59e0b; }}
        .sub-chip.c4 {{ border-left: 3px solid #a855f7; }}
        .sub-chip.c5 {{ border-left: 3px solid #0ea5e9; }}

        /* Filter Bar */
        .filter-section {{
            max-width: 1200px;
            margin: 20px auto 0;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
        }}

        .filter-tabs {{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }}

        .tab-btn {{
            background: #151d30;
            border: 1px solid var(--border);
            color: var(--text-muted);
            padding: 8px 14px;
            border-radius: 8px;
            font-size: 12.5px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }}

        .tab-btn:hover {{
            background: var(--surface-hover);
            color: #ffffff;
        }}

        .tab-btn.active {{
            background: #4f46e5;
            border-color: #6366f1;
            color: #ffffff;
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.35);
        }}

        /* Main Container */
        .main-container {{
            max-width: 1200px;
            margin: 20px auto 0;
            padding: 0 24px;
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 24px;
            align-items: start;
        }}

        /* Questions Area */
        .questions-area {{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }}

        .q-card {{
            background: var(--surface-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 24px 26px;
            box-shadow: var(--shadow);
            transition: border-color 0.25s, transform 0.2s;
            position: relative;
        }}

        .q-card:hover {{
            border-color: var(--border-hover);
        }}

        .q-card.flagged {{
            border-left: 4px solid var(--accent);
        }}

        .q-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
            flex-wrap: wrap;
            gap: 8px;
        }}

        .q-meta {{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
        }}

        .q-num-badge {{
            font-family: 'JetBrains Mono', monospace;
            background: rgba(99, 102, 241, 0.2);
            color: #c7d2fe;
            border: 1px solid rgba(129, 140, 248, 0.3);
            font-weight: 800;
            font-size: 12px;
            padding: 3px 8px;
            border-radius: 6px;
        }}

        .q-subj-badge {{
            font-size: 11.5px;
            font-weight: 700;
            padding: 3px 9px;
            border-radius: 6px;
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid var(--border);
            color: #e2e8f0;
        }}

        .q-diff-badge {{
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 9999px;
            text-transform: uppercase;
        }}

        .diff-Moderate {{ background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }}
        .diff-Hard {{ background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }}
        .diff-Advanced {{ background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }}

        .q-prob-badge {{
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 6px;
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }}

        .q-actions {{
            display: flex;
            align-items: center;
            gap: 8px;
        }}

        .btn-flag {{
            background: transparent;
            border: 1px solid transparent;
            cursor: pointer;
            font-size: 14px;
            padding: 4px 8px;
            border-radius: 6px;
            color: var(--text-muted);
            transition: all 0.2s;
        }}

        .btn-flag:hover {{
            background: rgba(245, 158, 11, 0.15);
            color: #fbbf24;
        }}

        .btn-flag.active {{
            background: rgba(245, 158, 11, 0.2);
            color: #f59e0b;
            border-color: rgba(245, 158, 11, 0.4);
        }}

        .q-title-concept {{
            font-size: 13px;
            font-weight: 700;
            color: #38bdf8;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }}

        .q-text {{
            font-size: 15.5px;
            font-weight: 600;
            color: #ffffff;
            line-height: 1.5;
            margin-bottom: 14px;
        }}

        /* Code Block */
        .q-code {{
            background: #090d16;
            border: 1px solid #1e293b;
            border-radius: 8px;
            padding: 14px 16px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            color: #e2e8f0;
            overflow-x: auto;
            margin-bottom: 16px;
            line-height: 1.45;
        }}

        /* Options Grid */
        .q-options {{
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 16px;
        }}

        .opt-btn {{
            background: #111827;
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 12px 16px;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            color: #e2e8f0;
            font-size: 14px;
            width: 100%;
        }}

        .opt-btn:hover:not(.locked) {{
            background: #1f293d;
            border-color: #6366f1;
            transform: translateX(2px);
        }}

        .opt-letter {{
            font-family: 'JetBrains Mono', monospace;
            font-weight: 800;
            font-size: 12.5px;
            min-width: 26px;
            height: 26px;
            border-radius: 6px;
            background: #1e293b;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #cbd5e1;
            flex-shrink: 0;
            margin-top: 1px;
        }}

        .opt-btn.selected-exam {{
            background: rgba(99, 102, 241, 0.2);
            border-color: #818cf8;
            color: #ffffff;
        }}

        .opt-btn.selected-exam .opt-letter {{
            background: #4f46e5;
            color: #ffffff;
        }}

        .opt-btn.correct-reveal {{
            background: rgba(16, 185, 129, 0.15) !important;
            border-color: #10b981 !important;
            color: #ffffff !important;
        }}

        .opt-btn.correct-reveal .opt-letter {{
            background: #10b981 !important;
            color: #ffffff !important;
        }}

        .opt-btn.wrong-reveal {{
            background: rgba(239, 68, 68, 0.15) !important;
            border-color: #ef4444 !important;
            color: #fca5a5 !important;
        }}

        .opt-btn.wrong-reveal .opt-letter {{
            background: #ef4444 !important;
            color: #ffffff !important;
        }}

        /* Explanation Box */
        .q-exp-box {{
            display: none;
            background: #0f172a;
            border: 1px solid #1e293b;
            border-left: 4px solid #38bdf8;
            border-radius: var(--radius-md);
            padding: 18px 20px;
            margin-top: 12px;
            font-size: 13.5px;
            color: #cbd5e1;
            line-height: 1.6;
        }}

        .q-exp-box.visible {{
            display: block;
            animation: fadeIn 0.3s ease;
        }}

        .q-exp-box h3, .q-exp-box h4 {{
            color: #ffffff;
            margin: 12px 0 6px;
            font-size: 14px;
        }}

        .q-exp-box p {{
            margin-bottom: 8px;
        }}

        .q-exp-box code {{
            font-family: 'JetBrains Mono', monospace;
            background: rgba(0, 0, 0, 0.4);
            padding: 2px 6px;
            border-radius: 4px;
            color: #93c5fd;
            font-size: 12.5px;
        }}

        .q-exp-box table {{
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            font-size: 12px;
        }}

        .q-exp-box th, .q-exp-box td {{
            border: 1px solid #334155;
            padding: 6px 10px;
            text-align: left;
        }}

        .q-exp-box th {{
            background: #1e293b;
            color: #ffffff;
        }}

        /* Sticky Sidebar */
        .sidebar {{
            position: sticky;
            top: 76px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }}

        .side-card {{
            background: var(--surface-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 20px;
            box-shadow: var(--shadow);
        }}

        .side-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;
        }}

        .side-title {{
            font-size: 14px;
            font-weight: 800;
            color: #ffffff;
        }}

        .side-stats {{
            font-size: 11.5px;
            color: var(--text-muted);
            font-family: 'JetBrains Mono', monospace;
        }}

        /* Nav Matrix Grid */
        .nav-grid {{
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 6px;
            margin-bottom: 14px;
            max-height: 280px;
            overflow-y: auto;
            padding-right: 4px;
        }}

        .grid-btn {{
            aspect-ratio: 1;
            border: 1px solid var(--border);
            background: #111827;
            border-radius: 8px;
            font-size: 11.5px;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
            cursor: pointer;
            color: var(--text-muted);
            transition: all 0.15s;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }}

        .grid-btn:hover {{
            border-color: #6366f1;
            color: #ffffff;
        }}

        .grid-btn.answered {{
            background: #312e81;
            border-color: #6366f1;
            color: #ffffff;
        }}

        .grid-btn.correct {{
            background: #064e3b;
            border-color: #10b981;
            color: #ffffff;
        }}

        .grid-btn.wrong {{
            background: #7f1d1d;
            border-color: #ef4444;
            color: #ffffff;
        }}

        .grid-btn.flagged::after {{
            content: "";
            position: absolute;
            top: 2px;
            right: 2px;
            width: 6px;
            height: 6px;
            background: #f59e0b;
            border-radius: 9999px;
        }}

        /* Action Buttons in Sidebar */
        .side-actions {{
            display: flex;
            flex-direction: column;
            gap: 8px;
        }}

        .btn-side {{
            width: 100%;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 12.5px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            border: 1px solid transparent;
        }}

        .btn-submit-exam {{
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }}

        .btn-submit-exam:hover {{
            background: #059669;
            transform: translateY(-1px);
        }}

        .btn-secondary-side {{
            background: #1e293b;
            border-color: var(--border);
            color: #cbd5e1;
        }}

        .btn-secondary-side:hover {{
            background: #334155;
            color: #ffffff;
        }}

        /* Modal */
        .modal-overlay {{
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(8px);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }}

        .modal-overlay.open {{
            display: flex;
            animation: fadeIn 0.2s ease;
        }}

        .modal-card {{
            background: #151d30;
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 620px;
            padding: 32px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
            max-height: 90vh;
            overflow-y: auto;
        }}

        .modal-header {{
            text-align: center;
            margin-bottom: 24px;
        }}

        .modal-badge {{
            display: inline-block;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 12px;
            border-radius: 9999px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }}

        .badge-distinction {{ background: #064e3b; color: #34d399; border: 1px solid #059669; }}
        .badge-first {{ background: #1e3a8a; color: #60a5fa; border: 1px solid #2563eb; }}
        .badge-pass {{ background: #78350f; color: #fbbf24; border: 1px solid #d97706; }}
        .badge-fail {{ background: #7f1d1d; color: #f87171; border: 1px solid #dc2626; }}

        .modal-score {{
            font-size: 44px;
            font-weight: 800;
            color: #ffffff;
            font-family: 'JetBrains Mono', monospace;
            line-height: 1.1;
        }}

        .modal-subtext {{
            font-size: 14px;
            color: var(--text-muted);
            margin-top: 6px;
        }}

        /* Subject Progress Bars in Modal */
        .subject-breakdown {{
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin: 20px 0;
            background: #0f172a;
            padding: 18px;
            border-radius: 12px;
            border: 1px solid var(--border);
        }}

        .sub-bar-item {{
            display: flex;
            flex-direction: column;
            gap: 4px;
        }}

        .sub-bar-header {{
            display: flex;
            justify-content: space-between;
            font-size: 12.5px;
            font-weight: 700;
        }}

        .sub-progress-track {{
            height: 8px;
            background: #1e293b;
            border-radius: 9999px;
            overflow: hidden;
        }}

        .sub-progress-fill {{
            height: 100%;
            border-radius: 9999px;
            transition: width 0.6s ease;
        }}

        .modal-actions {{
            display: flex;
            gap: 12px;
            margin-top: 24px;
        }}

        @keyframes fadeIn {{
            from {{ opacity: 0; transform: scale(0.98); }}
            to {{ opacity: 1; transform: scale(1); }}
        }}

        @media (max-width: 900px) {{
            .main-container {{
                grid-template-columns: 1fr;
            }}
            .sidebar {{
                position: static;
            }}
        }}
    </style>
</head>
<body>

    <!-- Sticky Navbar Header -->
    <header class="top-navbar">
        <div class="nav-left">
            <a href="index.html" class="back-link">← Hub Portal</a>
            <div class="quiz-title-badge">
                <span class="brand-text">CMCE All-5-Subjects Simulator</span>
                <span class="batch-pill">Guaranteed Repeat Bank</span>
            </div>
        </div>

        <div class="nav-center">
            <div class="mode-toggle">
                <button class="mode-btn active" id="btnInstant" onclick="setMode('instant')">⚡ Instant Feedback</button>
                <button class="mode-btn" id="btnExam" onclick="setMode('exam')">⏱️ Exam Simulation</button>
            </div>
            <div class="timer-box" id="timerBox">
                <span>⏳</span>
                <span id="timerText">60:00</span>
            </div>
        </div>

        <div class="nav-right">
            <div class="score-pill">
                <span>Progress:</span>
                <span class="score-val" id="answeredCount">0 / 50</span>
            </div>
            <div class="score-pill">
                <span>Score:</span>
                <span class="score-val" id="scoreCount">0 / 50</span>
            </div>
        </div>
    </header>

    <!-- Hero Banner -->
    <section class="hero-banner">
        <div class="hero-banner-inner">
            <div class="hero-tagline">
                🎓 CDAC PGCP-AC / PG-DAC Modular Exam Preparation · 5 Modular Papers Combined
            </div>
            <h1>CMCE All-5-Subjects Grand Master Simulator</h1>
            <p>Reverse-engineered from authentic CDAC mock examinations. 50 meticulously curated, top-frequency questions spanning all five examination papers. Test with active retrieval feedback or simulate actual 60-minute time conditions.</p>
            
            <div class="subject-strip">
                <div class="sub-chip c1">🟦 S1AC01: C++ (Q1-10)</div>
                <div class="sub-chip c2">🟩 S1AC02: Database Tech (Q11-20)</div>
                <div class="sub-chip c3">🟧 S1AC03: OOP with Java (Q21-30)</div>
                <div class="sub-chip c4">🟪 S1AC04: Algorithms & DS (Q31-40)</div>
                <div class="sub-chip c5">🟨 S1AC05: Web Tech (Q41-50)</div>
            </div>
        </div>
    </section>

    <!-- Filter Bar -->
    <div class="filter-section">
        <div class="filter-tabs">
            <button class="tab-btn active" onclick="filterSection('all')">🌟 All 5 Modules (50 Qs)</button>
            <button class="tab-btn" onclick="filterSection('AC01')">AC01 · C++</button>
            <button class="tab-btn" onclick="filterSection('AC02')">AC02 · Database</button>
            <button class="tab-btn" onclick="filterSection('AC03')">AC03 · Java OOP</button>
            <button class="tab-btn" onclick="filterSection('AC04')">AC04 · Algorithms & DS</button>
            <button class="tab-btn" onclick="filterSection('AC05')">AC05 · Web Tech</button>
        </div>
        <div style="font-size: 12.5px; color: var(--text-muted);" id="filterStatus">
            Showing all 50 questions
        </div>
    </div>

    <!-- Main Container -->
    <main class="main-container">
        <!-- Questions List Column -->
        <div class="questions-area" id="questionsContainer">
            <!-- Dynamically rendered via JS -->
        </div>

        <!-- Sticky Sidebar -->
        <aside class="sidebar">
            <!-- Navigator Card -->
            <div class="side-card">
                <div class="side-header">
                    <span class="side-title">Question Navigator</span>
                    <span class="side-stats" id="sideStats">0 answered</span>
                </div>
                <div class="nav-grid" id="navGrid">
                    <!-- Nav grid pills rendered via JS -->
                </div>
            </div>

            <!-- Controls Card -->
            <div class="side-card">
                <div class="side-header">
                    <span class="side-title">Exam Tools</span>
                </div>
                <div class="side-actions">
                    <button class="btn-side btn-submit-exam" id="btnSubmitExam" style="display: none;" onclick="submitExam()">📤 Submit Exam & Grade</button>
                    <button class="btn-side btn-secondary-side" onclick="toggleAllExplanations()">💡 Toggle All Explanations</button>
                    <button class="btn-side btn-secondary-side" id="btnShowFlagged" onclick="toggleFlaggedOnly()">🚩 Filter Flagged Questions</button>
                    <button class="btn-side btn-secondary-side" onclick="resetQuiz()">🔄 Reset Answers</button>
                    <button class="btn-side btn-secondary-side" onclick="window.scrollTo({{ top: 0, behavior: 'smooth' }})">⬆️ Back to Top</button>
                </div>
            </div>
        </aside>
    </main>

    <!-- Post-Exam Score Modal -->
    <div class="modal-overlay" id="scoreModal">
        <div class="modal-card">
            <div class="modal-header">
                <span class="modal-badge" id="modalBadge">Pass</span>
                <div class="modal-score" id="modalScore">0 / 50</div>
                <div class="modal-subtext" id="modalPercent">0% Score</div>
            </div>

            <div class="subject-breakdown">
                <div class="sub-bar-item">
                    <div class="sub-bar-header">
                        <span>🟦 C++ Programming (AC01)</span>
                        <span id="scoreAC01">0 / 10</span>
                    </div>
                    <div class="sub-progress-track">
                        <div class="sub-progress-fill" id="barAC01" style="width: 0%; background: #6366f1;"></div>
                    </div>
                </div>

                <div class="sub-bar-item">
                    <div class="sub-bar-header">
                        <span>🟩 Database Technologies (AC02)</span>
                        <span id="scoreAC02">0 / 10</span>
                    </div>
                    <div class="sub-progress-track">
                        <div class="sub-progress-fill" id="barAC02" style="width: 0%; background: #10b981;"></div>
                    </div>
                </div>

                <div class="sub-bar-item">
                    <div class="sub-bar-header">
                        <span>🟧 OOP with Java (AC03)</span>
                        <span id="scoreAC03">0 / 10</span>
                    </div>
                    <div class="sub-progress-track">
                        <div class="sub-progress-fill" id="barAC03" style="width: 0%; background: #f59e0b;"></div>
                    </div>
                </div>

                <div class="sub-bar-item">
                    <div class="sub-bar-header">
                        <span>🟪 Algorithms & Data Structures (AC04)</span>
                        <span id="scoreAC04">0 / 10</span>
                    </div>
                    <div class="sub-progress-track">
                        <div class="sub-progress-fill" id="barAC04" style="width: 0%; background: #a855f7;"></div>
                    </div>
                </div>

                <div class="sub-bar-item">
                    <div class="sub-bar-header">
                        <span>🟨 Web Programming Technologies (AC05)</span>
                        <span id="scoreAC05">0 / 10</span>
                    </div>
                    <div class="sub-progress-track">
                        <div class="sub-progress-fill" id="barAC05" style="width: 0%; background: #0ea5e9;"></div>
                    </div>
                </div>
            </div>

            <div class="modal-actions">
                <button class="btn-side btn-submit-exam" onclick="closeModalAndReview()">🔍 Review Detailed Explanations</button>
                <button class="btn-side btn-secondary-side" onclick="retakeExam()">🔄 Retake Simulator</button>
            </div>
        </div>
    </div>

    <!-- Questions Data & Engine Script -->
    <script>
        const QUESTIONS = {questions_json};
        const STORAGE_KEY = "cdac_cmce_master_all5_v1";

        let currentMode = "instant"; // 'instant' or 'exam'
        let currentSectionFilter = "all";
        let showOnlyFlagged = false;
        let examSubmitted = false;
        let timerInterval = null;
        let timeRemainingSeconds = 60 * 60; // 60 minutes

        let userState = {{
            answers: {{}},
            flags: {{}},
            allExpanded: false
        }};

        // Load saved state from LocalStorage
        function loadState() {{
            try {{
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {{
                    const parsed = JSON.parse(saved);
                    userState.answers = parsed.answers || {{}};
                    userState.flags = parsed.flags || {{}};
                }}
            }} catch(e) {{
                console.error("Storage load failed", e);
            }}
        }}

        function saveState() {{
            try {{
                localStorage.setItem(STORAGE_KEY, JSON.stringify({{
                    answers: userState.answers,
                    flags: userState.flags
                }}));
            }} catch(e) {{
                console.error("Storage save failed", e);
            }}
        }}

        // Mode Switching
        function setMode(mode) {{
            currentMode = mode;
            document.getElementById("btnInstant").classList.toggle("active", mode === "instant");
            document.getElementById("btnExam").classList.toggle("active", mode === "exam");

            const timerBox = document.getElementById("timerBox");
            const btnSubmit = document.getElementById("btnSubmitExam");

            if (mode === "exam") {{
                timerBox.style.display = "flex";
                btnSubmit.style.display = "flex";
                startTimer();
            }} else {{
                timerBox.style.display = "none";
                btnSubmit.style.display = "none";
                stopTimer();
            }}

            renderAll();
        }}

        // Timer
        function startTimer() {{
            stopTimer();
            updateTimerDisplay();
            timerInterval = setInterval(() => {{
                if (timeRemainingSeconds > 0) {{
                    timeRemainingSeconds--;
                    updateTimerDisplay();
                }} else {{
                    stopTimer();
                    alert("⏱️ Time is up! Submitting exam automatically.");
                    submitExam();
                }}
            }}, 1000);
        }}

        function stopTimer() {{
            if (timerInterval) {{
                clearInterval(timerInterval);
                timerInterval = null;
            }}
        }}

        function updateTimerDisplay() {{
            const mins = Math.floor(timeRemainingSeconds / 60);
            const secs = timeRemainingSeconds % 60;
            const str = `${{String(mins).padStart(2, '0')}}:${{String(secs).padStart(2, '0')}}`;
            const box = document.getElementById("timerBox");
            document.getElementById("timerText").textContent = str;
            if (timeRemainingSeconds < 300) {{
                box.classList.add("warning");
            }} else {{
                box.classList.remove("warning");
            }}
        }}

        // Section Filtering
        function filterSection(sec) {{
            currentSectionFilter = sec;
            showOnlyFlagged = false;
            document.querySelectorAll(".tab-btn").forEach(btn => {{
                btn.classList.remove("active");
            }});
            event.target.classList.add("active");

            const status = document.getElementById("filterStatus");
            if (sec === "all") {{
                status.textContent = "Showing all 50 questions";
            }} else {{
                const map = {{
                    "AC01": "AC01 · C++ Programming (Q1-10)",
                    "AC02": "AC02 · Database Technologies (Q11-20)",
                    "AC03": "AC03 · OOP with Java (Q21-30)",
                    "AC04": "AC04 · Algorithms & Data Structures (Q31-40)",
                    "AC05": "AC05 · Web Programming Technologies (Q41-50)"
                }};
                status.textContent = `Showing ${{map[sec] || sec}}`;
            }}

            renderQuestions();
        }}

        function toggleFlaggedOnly() {{
            showOnlyFlagged = !showOnlyFlagged;
            const btn = document.getElementById("btnShowFlagged");
            btn.style.borderColor = showOnlyFlagged ? "#f59e0b" : "var(--border)";
            btn.style.color = showOnlyFlagged ? "#f59e0b" : "#cbd5e1";
            renderQuestions();
        }}

        // Toggle Flag
        function toggleFlag(qId) {{
            userState.flags[qId] = !userState.flags[qId];
            saveState();
            renderAll();
        }}

        // Select Option
        function selectOption(qId, letter) {{
            if (currentMode === "exam" && examSubmitted) return;

            userState.answers[qId] = letter;
            saveState();

            // Re-render this question card and navigator
            renderQuestionCard(qId);
            updateNavPills();
            updateScores();
        }}

        // Convert Markdown-style syntax to HTML
        function formatExplanation(text) {{
            if (!text) return "";
            let html = text
                .replace(/### (.*?)\\n/g, '<h4>$1</h4>')
                .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\\n/g, '<br>');
            return html;
        }}

        function escapeHtml(str) {{
            if (!str) return "";
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }}

        // Render Questions
        function renderQuestions() {{
            const container = document.getElementById("questionsContainer");
            container.innerHTML = "";

            const visibleQuestions = QUESTIONS.filter(q => {{
                if (showOnlyFlagged && !userState.flags[q.id]) return false;
                if (currentSectionFilter !== "all" && q.subjectCode !== currentSectionFilter) return false;
                return true;
            }});

            if (visibleQuestions.length === 0) {{
                container.innerHTML = `
                    <div style="background: var(--surface-card); padding: 40px; border-radius: var(--radius-lg); text-align: center; border: 1px solid var(--border);">
                        <h3>No questions match this filter</h3>
                        <p style="color: var(--text-muted); font-size: 13.5px; margin-top: 6px;">Clear filters or remove flagged status to view questions.</p>
                    </div>
                `;
                return;
            }}

            visibleQuestions.forEach(q => {{
                const card = document.createElement("div");
                card.id = `qCard_${{q.id}}`;
                card.className = `q-card ${{userState.flags[q.id] ? "flagged" : ""}}`;
                card.innerHTML = buildQuestionCardHtml(q);
                container.appendChild(card);
            }});
        }}

        function buildQuestionCardHtml(q) {{
            const userChoice = userState.answers[q.id];
            const isFlagged = !!userState.flags[q.id];
            const isInstant = currentMode === "instant";
            const showAnswers = isInstant ? !!userChoice : examSubmitted;

            let codeHtml = "";
            if (q.code && q.code.trim()) {{
                codeHtml = `<pre class="q-code"><code>${{escapeHtml(q.code)}}</code></pre>`;
            }}

            let optionsHtml = '<div class="q-options">';
            for (const [letter, optText] of Object.entries(q.options)) {{
                let optClass = "opt-btn";
                if (currentMode === "exam") {{
                    if (userChoice === letter) optClass += " selected-exam";
                    if (examSubmitted) {{
                        optClass += " locked";
                        if (letter === q.answer) optClass += " correct-reveal";
                        else if (userChoice === letter && letter !== q.answer) optClass += " wrong-reveal";
                    }}
                }} else {{ // instant mode
                    if (showAnswers) {{
                        optClass += " locked";
                        if (letter === q.answer) optClass += " correct-reveal";
                        else if (userChoice === letter && letter !== q.answer) optClass += " wrong-reveal";
                    }}
                }}

                optionsHtml += `
                    <button class="${{optClass}}" onclick="selectOption(${{q.id}}, '${{letter}}')">
                        <span class="opt-letter">${{letter}}</span>
                        <span>${{optText}}</span>
                    </button>
                `;
            }}
            optionsHtml += '</div>';

            const expVisible = showAnswers || userState.allExpanded;
            const expHtml = `
                <div class="q-exp-box ${{expVisible ? 'visible' : ''}}" id="exp_${{q.id}}">
                    <div style="font-weight: 800; color: #38bdf8; margin-bottom: 6px; font-size: 14px;">
                        📘 Concept & Diagnostic Breakdown
                    </div>
                    <div>${{formatExplanation(q.explanation)}}</div>
                </div>
            `;

            return `
                <div class="q-header">
                    <div class="q-meta">
                        <span class="q-num-badge">Q${{q.id}}</span>
                        <span class="q-subj-badge">${{q.section}}</span>
                        <span class="q-diff-badge diff-${{q.difficulty}}">${{q.difficulty}}</span>
                        <span class="q-prob-badge">🔥 ${{q.probability}}</span>
                    </div>
                    <div class="q-actions">
                        <button class="btn-flag ${{isFlagged ? 'active' : ''}}" onclick="toggleFlag(${{q.id}})">
                            ${{isFlagged ? '🚩 Flagged' : '🏳️ Flag'}}
                        </button>
                    </div>
                </div>
                <div class="q-title-concept">🎯 ${{q.concept}}</div>
                <div class="q-text">${{q.question}}</div>
                ${{codeHtml}}
                ${{optionsHtml}}
                ${{expHtml}}
            `;
        }}

        function renderQuestionCard(qId) {{
            const card = document.getElementById(`qCard_${{qId}}`);
            if (!card) return;
            const q = QUESTIONS.find(item => item.id === qId);
            if (!q) return;

            card.className = `q-card ${{userState.flags[q.id] ? "flagged" : ""}}`;
            card.innerHTML = buildQuestionCardHtml(q);
        }}

        // Sidebar Navigation Matrix
        function renderNavGrid() {{
            const grid = document.getElementById("navGrid");
            grid.innerHTML = "";

            QUESTIONS.forEach(q => {{
                const btn = document.createElement("button");
                btn.id = `navBtn_${{q.id}}`;
                btn.className = "grid-btn";
                btn.textContent = q.id;
                btn.onclick = () => scrollToQuestion(q.id);
                grid.appendChild(btn);
            }});

            updateNavPills();
        }}

        function updateNavPills() {{
            QUESTIONS.forEach(q => {{
                const btn = document.getElementById(`navBtn_${{q.id}}`);
                if (!btn) return;

                btn.className = "grid-btn";
                const userChoice = userState.answers[q.id];
                const isFlagged = userState.flags[q.id];

                if (isFlagged) btn.classList.add("flagged");

                if (userChoice) {{
                    if (currentMode === "exam") {{
                        if (examSubmitted) {{
                            if (userChoice === q.answer) btn.classList.add("correct");
                            else btn.classList.add("wrong");
                        }} else {{
                            btn.classList.add("answered");
                        }}
                    }} else {{ // Instant
                        if (userChoice === q.answer) btn.classList.add("correct");
                        else btn.classList.add("wrong");
                    }}
                }}
            }});

            const answered = Object.keys(userState.answers).length;
            document.getElementById("sideStats").textContent = `${{answered}} of ${{QUESTIONS.length}} answered`;
            document.getElementById("answeredCount").textContent = `${{answered}} / ${{QUESTIONS.length}}`;
        }}

        function scrollToQuestion(qId) {{
            // Ensure question is visible in current filter
            const q = QUESTIONS.find(item => item.id === qId);
            if (currentSectionFilter !== "all" && q.subjectCode !== currentSectionFilter) {{
                filterSection("all");
            }}
            setTimeout(() => {{
                const el = document.getElementById(`qCard_${{qId}}`);
                if (el) el.scrollIntoView({{ behavior: "smooth", block: "center" }});
            }}, 50);
        }}

        // Scores update
        function updateScores() {{
            let score = 0;
            QUESTIONS.forEach(q => {{
                if (userState.answers[q.id] === q.answer) {{
                    score++;
                }}
            }});
            document.getElementById("scoreCount").textContent = `${{score}} / ${{QUESTIONS.length}}`;
        }}

        // Toggle all explanations
        function toggleAllExplanations() {{
            userState.allExpanded = !userState.allExpanded;
            document.querySelectorAll(".q-exp-box").forEach(box => {{
                if (userState.allExpanded) {{
                    box.classList.add("visible");
                }} else {{
                    box.classList.remove("visible");
                }}
            }});
        }}

        // Reset Quiz
        function resetQuiz() {{
            if (confirm("Reset all your answers and progress for this quiz?")) {{
                userState.answers = {{}};
                userState.flags = {{}};
                examSubmitted = false;
                timeRemainingSeconds = 60 * 60;
                saveState();
                renderAll();
                if (currentMode === "exam") startTimer();
            }}
        }}

        // Submit Exam
        function submitExam() {{
            stopTimer();
            examSubmitted = true;

            let totalCorrect = 0;
            const subjectStats = {{
                "AC01": {{ correct: 0, total: 10 }},
                "AC02": {{ correct: 0, total: 10 }},
                "AC03": {{ correct: 0, total: 10 }},
                "AC04": {{ correct: 0, total: 10 }},
                "AC05": {{ correct: 0, total: 10 }}
            }};

            QUESTIONS.forEach(q => {{
                const userAns = userState.answers[q.id];
                if (userAns === q.answer) {{
                    totalCorrect++;
                    if (subjectStats[q.subjectCode]) subjectStats[q.subjectCode].correct++;
                }}
            }});

            const pct = Math.round((totalCorrect / QUESTIONS.length) * 100);

            // Populate Modal
            document.getElementById("modalScore").textContent = `${{totalCorrect}} / ${{QUESTIONS.length}}`;
            document.getElementById("modalPercent").textContent = `${{pct}}% Combined Score (${{totalCorrect * 2}} / 100 Marks)`;

            const badge = document.getElementById("modalBadge");
            if (pct >= 80) {{
                badge.className = "modal-badge badge-distinction";
                badge.textContent = "🏆 Distinction (Ready to Excel)";
            }} else if (pct >= 65) {{
                badge.className = "modal-badge badge-first";
                badge.textContent = "🥇 First Class (Strong Mastery)";
            }} else if (pct >= 50) {{
                badge.className = "modal-badge badge-pass";
                badge.textContent = "🥈 Pass (Needs Targeted Drills)";
            }} else {{
                badge.className = "modal-badge badge-fail";
                badge.textContent = "⚠️ Critical Revision Required (<50%)";
            }}

            // Progress bars
            for (const [code, data] of Object.entries(subjectStats)) {{
                const elScore = document.getElementById(`score${{code}}`);
                const elBar = document.getElementById(`bar${{code}}`);
                if (elScore && elBar) {{
                    elScore.textContent = `${{data.correct}} / ${{data.total}}`;
                    elBar.style.width = `${{(data.correct / data.total) * 100}}%`;
                }}
            }}

            document.getElementById("scoreModal").classList.add("open");
            renderAll();
        }}

        function closeModalAndReview() {{
            document.getElementById("scoreModal").classList.remove("open");
            userState.allExpanded = true;
            renderAll();
        }}

        function retakeExam() {{
            document.getElementById("scoreModal").classList.remove("open");
            resetQuiz();
        }}

        function renderAll() {{
            renderQuestions();
            updateNavPills();
            updateScores();
        }}

        // Initialize
        loadState();
        renderNavGrid();
        renderAll();
    </script>
</body>
</html>
"""

output_html_path = "c:/Users/kanch/Desktop/cdac/quizes/cmce_master_quiz.html"
with open(output_html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated complete interactive quiz simulator at {output_html_path}")
