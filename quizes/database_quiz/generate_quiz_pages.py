import json
import os

with open("all_database_questions.json", "r", encoding="utf-8") as f:
    all_questions = json.load(f)

# High Yield Questions
high_yield_qs = [q for q in all_questions if q.get("highYield", False)]

# Section groupings
part1_qs = [q for q in all_questions if 1 <= q["num"] <= 25]
part2_qs = [q for q in all_questions if 26 <= q["num"] <= 50]
part3_qs = [q for q in all_questions if 51 <= q["num"] <= 90]
part4_qs = [q for q in all_questions if 91 <= q["num"] <= 110]
part5_qs = [q for q in all_questions if 111 <= q["num"] <= 140]
part6_qs = [q for q in all_questions if 141 <= q["num"] <= 147]

def generate_quiz_html(title, subtitle, badge_text, quiz_questions, filename, is_booster=False):
    questions_json = json.dumps(quiz_questions, ensure_ascii=False)
    storage_key = f"cdac_db_{filename.replace('.html', '')}"

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | CDAC CCME Database Technologies</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
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
            --warning-light: #fffbeb;
            --bg-page: #f8fafc;
            --card-bg: #ffffff;
            --text-dark: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            --radius-md: 10px;
            --radius-lg: 16px;
        }}

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }}

        body {{
            background-color: var(--bg-page);
            color: var(--text-dark);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            line-height: 1.5;
        }}

        /* Navbar */
        .navbar {{
            background: #ffffff;
            border-bottom: 1px solid var(--border);
            padding: 14px 24px;
            position: sticky;
            top: 0;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: var(--shadow-sm);
        }}

        .nav-brand {{
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: var(--text-dark);
        }}

        .nav-logo-icon {{
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 16px;
            box-shadow: 0 2px 4px rgba(79, 70, 229, 0.3);
        }}

        .nav-title-group h1 {{
            font-size: 16px;
            font-weight: 700;
            line-height: 1.2;
        }}

        .nav-title-group p {{
            font-size: 12px;
            color: var(--text-muted);
            font-weight: 500;
        }}

        .nav-stats {{
            display: flex;
            align-items: center;
            gap: 20px;
        }}

        .stat-badge {{
            display: flex;
            align-items: center;
            gap: 6px;
            background: var(--primary-light);
            color: var(--primary);
            padding: 6px 12px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
        }}

        .stat-badge.timer {{
            background: #f1f5f9;
            color: var(--text-dark);
            font-family: 'JetBrains Mono', monospace;
        }}

        .nav-actions {{
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .btn {{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 8px 16px;
            border-radius: var(--radius-md);
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid transparent;
            text-decoration: none;
        }}

        .btn-outline {{
            background: white;
            border-color: var(--border);
            color: var(--text-dark);
        }}

        .btn-outline:hover {{
            background: #f8fafc;
            border-color: #cbd5e1;
        }}

        .btn-primary {{
            background: var(--primary);
            color: white;
        }}

        .btn-primary:hover {{
            background: var(--primary-hover);
            box-shadow: 0 2px 4px rgba(79, 70, 229, 0.25);
        }}

        .btn-warning {{
            background: #fef3c7;
            color: #92400e;
            border-color: #fde68a;
        }}

        .btn-warning:hover {{
            background: #fde68a;
        }}

        /* Container Layout */
        .layout {{
            max-width: 1100px;
            margin: 0 auto;
            width: 100%;
            padding: 24px 20px 80px;
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 24px;
            align-items: start;
        }}

        @media (max-width: 900px) {{
            .layout {{
                grid-template-columns: 1fr;
            }}
            .sidebar {{
                order: 2;
            }}
        }}

        /* Header Banner */
        .quiz-hero {{
            grid-column: 1 / -1;
            background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 24px 28px;
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
        }}

        .hero-info h2 {{
            font-size: 24px;
            font-weight: 800;
            color: var(--text-dark);
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .hero-badge {{
            font-size: 12px;
            font-weight: 700;
            background: {"#fef3c7; color: #b45309;" if is_booster else "var(--primary-light); color: var(--primary);"}
            padding: 4px 10px;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}

        .hero-info p {{
            color: var(--text-muted);
            font-size: 14px;
        }}

        .hero-controls {{
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .mode-toggle {{
            display: flex;
            background: #e2e8f0;
            padding: 3px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
        }}

        .mode-option {{
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            color: var(--text-muted);
        }}

        .mode-option.active {{
            background: white;
            color: var(--text-dark);
            box-shadow: var(--shadow-sm);
        }}

        /* Progress Bar */
        .progress-bar-wrap {{
            grid-column: 1 / -1;
            background: white;
            padding: 14px 20px;
            border-radius: var(--radius-md);
            border: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }}

        .progress-meta {{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
        }}

        .progress-track {{
            height: 10px;
            background: #e2e8f0;
            border-radius: 9999px;
            overflow: hidden;
        }}

        .progress-fill {{
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 9999px;
        }}

        /* Filter Controls */
        .filter-tabs {{
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
            flex-wrap: wrap;
        }}

        .filter-tab {{
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
            background: white;
            border: 1px solid var(--border);
            color: var(--text-muted);
            cursor: pointer;
            transition: all 0.15s;
        }}

        .filter-tab:hover {{
            border-color: #cbd5e1;
            color: var(--text-dark);
        }}

        .filter-tab.active {{
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }}

        /* Question Cards Area */
        .questions-flow {{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }}

        .q-card {{
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 24px;
            box-shadow: var(--shadow-sm);
            transition: box-shadow 0.2s, border-color 0.2s;
            position: relative;
        }}

        .q-card:hover {{
            box-shadow: var(--shadow);
        }}

        .q-card.status-correct {{
            border-left: 5px solid var(--success);
        }}

        .q-card.status-incorrect {{
            border-left: 5px solid var(--danger);
        }}

        .q-header {{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 14px;
            gap: 12px;
        }}

        .q-meta-left {{
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }}

        .q-number {{
            font-weight: 800;
            font-size: 14px;
            color: var(--primary);
            background: var(--primary-light);
            padding: 4px 10px;
            border-radius: 6px;
        }}

        .q-topic {{
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
            background: #f1f5f9;
            padding: 4px 10px;
            border-radius: 6px;
        }}

        .q-highyield-pill {{
            font-size: 11px;
            font-weight: 700;
            background: #fef3c7;
            color: #b45309;
            padding: 4px 8px;
            border-radius: 6px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }}

        .btn-flag {{
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 18px;
            cursor: pointer;
            transition: color 0.2s, transform 0.15s;
            padding: 4px;
        }}

        .btn-flag:hover {{
            transform: scale(1.15);
            color: var(--accent);
        }}

        .btn-flag.active {{
            color: var(--accent);
        }}

        .q-text {{
            font-size: 16px;
            font-weight: 600;
            color: var(--text-dark);
            line-height: 1.5;
            margin-bottom: 18px;
        }}

        .q-options {{
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 16px;
        }}

        .opt-item {{
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border: 1.5px solid var(--border);
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all 0.15s ease;
            background: white;
            user-select: none;
            gap: 12px;
        }}

        .opt-item:hover:not(.disabled) {{
            border-color: #94a3b8;
            background: #f8fafc;
        }}

        .opt-item.selected {{
            border-color: var(--primary);
            background: var(--primary-light);
        }}

        .opt-letter {{
            width: 28px;
            height: 28px;
            border-radius: 6px;
            background: #f1f5f9;
            color: var(--text-muted);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 13px;
            flex-shrink: 0;
            transition: all 0.15s;
        }}

        .opt-item.selected .opt-letter {{
            background: var(--primary);
            color: white;
        }}

        .opt-text {{
            font-size: 14px;
            font-weight: 500;
            color: var(--text-dark);
            flex-grow: 1;
        }}

        /* Feedback Styling in Instant Mode */
        .opt-item.correct {{
            background: var(--success-light) !important;
            border-color: var(--success) !important;
        }}

        .opt-item.correct .opt-letter {{
            background: var(--success) !important;
            color: white !important;
        }}

        .opt-item.wrong {{
            background: var(--danger-light) !important;
            border-color: var(--danger) !important;
        }}

        .opt-item.wrong .opt-letter {{
            background: var(--danger) !important;
            color: white !important;
        }}

        /* Explanation Box */
        .explanation-box {{
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: var(--radius-md);
            padding: 18px;
            margin-top: 16px;
            display: none;
            animation: fadeIn 0.3s ease-in-out;
        }}

        .explanation-box.show {{
            display: block;
        }}

        .exp-header {{
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 8px;
        }}

        .exp-text {{
            font-size: 13.5px;
            color: #334155;
            line-height: 1.6;
            margin-bottom: 12px;
        }}

        .exam-tip-box {{
            background: var(--warning-light);
            border-left: 4px solid var(--accent);
            padding: 10px 14px;
            border-radius: 4px;
            margin-top: 10px;
        }}

        .tip-title {{
            font-size: 12px;
            font-weight: 700;
            color: #b45309;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 3px;
            display: flex;
            align-items: center;
            gap: 6px;
        }}

        .tip-content {{
            font-size: 13px;
            color: #92400e;
            font-weight: 500;
            line-height: 1.45;
        }}

        /* Sidebar Question Palette */
        .sidebar {{
            position: sticky;
            top: 86px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }}

        .sidebar-card {{
            background: white;
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 20px;
            box-shadow: var(--shadow-sm);
        }}

        .sidebar-title {{
            font-size: 14px;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }}

        .palette-grid {{
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
            max-height: 280px;
            overflow-y: auto;
            padding-right: 4px;
        }}

        .pal-btn {{
            width: 100%;
            aspect-ratio: 1;
            border: 1px solid var(--border);
            background: white;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            color: var(--text-muted);
            cursor: pointer;
            transition: all 0.15s;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }}

        .pal-btn:hover {{
            border-color: var(--primary);
            color: var(--primary);
        }}

        .pal-btn.answered {{
            background: var(--primary-light);
            border-color: var(--primary);
            color: var(--primary);
        }}

        .pal-btn.correct {{
            background: var(--success);
            border-color: var(--success);
            color: white;
        }}

        .pal-btn.wrong {{
            background: var(--danger);
            border-color: var(--danger);
            color: white;
        }}

        .pal-btn.flagged::after {{
            content: '★';
            position: absolute;
            top: 1px;
            right: 2px;
            font-size: 8px;
            color: var(--accent);
        }}

        .palette-legend {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            font-size: 11px;
            font-weight: 600;
            color: var(--text-muted);
            margin-top: 14px;
            padding-top: 12px;
            border-top: 1px solid var(--border);
        }}

        .legend-item {{
            display: flex;
            align-items: center;
            gap: 6px;
        }}

        .legend-dot {{
            width: 10px;
            height: 10px;
            border-radius: 2px;
        }}

        /* Floating / Bottom Finish Bar */
        .bottom-bar {{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid var(--border);
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
            z-index: 40;
        }}

        .bottom-bar-content {{
            max-width: 1100px;
            margin: 0 auto;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        /* Score Modal */
        .modal-overlay {{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(4px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 100;
            padding: 20px;
        }}

        .modal-overlay.show {{
            display: flex;
        }}

        .modal-content {{
            background: white;
            border-radius: var(--radius-lg);
            max-width: 520px;
            width: 100%;
            padding: 32px;
            box-shadow: var(--shadow-lg);
            text-align: center;
            animation: modalPop 0.25s ease-out;
        }}

        .score-circle {{
            width: 110px;
            height: 110px;
            border-radius: 50%;
            background: conic-gradient(var(--success) calc(var(--percent, 0) * 1%), #e2e8f0 0);
            margin: 0 auto 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }}

        .score-circle::before {{
            content: '';
            position: absolute;
            width: 86px;
            height: 86px;
            background: white;
            border-radius: 50%;
        }}

        .score-text {{
            position: relative;
            font-size: 26px;
            font-weight: 800;
            color: var(--text-dark);
        }}

        .score-headline {{
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 6px;
        }}

        .score-desc {{
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 24px;
        }}

        .modal-stats {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            background: #f8fafc;
            padding: 14px;
            border-radius: var(--radius-md);
            margin-bottom: 24px;
        }}

        .m-stat-val {{
            font-size: 18px;
            font-weight: 800;
            color: var(--text-dark);
        }}

        .m-stat-lbl {{
            font-size: 11px;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
        }}

        .modal-actions {{
            display: flex;
            gap: 12px;
            justify-content: center;
        }}

        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(-4px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        @keyframes modalPop {{
            from {{ opacity: 0; transform: scale(0.95); }}
            to {{ opacity: 1; transform: scale(1); }}
        }}
    </style>
</head>
<body>

    <!-- Sticky Navbar -->
    <nav class="navbar">
        <a href="index.html" class="nav-brand">
            <div class="nav-logo-icon">DB</div>
            <div class="nav-title-group">
                <h1>CDAC CCME Database Tech</h1>
                <p>{title}</p>
            </div>
        </a>

        <div class="nav-stats">
            <div class="stat-badge timer" id="timerBadge">⏱️ 00:00</div>
            <div class="stat-badge" id="scoreBadge">🎯 Score: 0/{len(quiz_questions)}</div>
        </div>

        <div class="nav-actions">
            <a href="index.html" class="btn btn-outline">← All Quizzes</a>
            <button class="btn btn-primary" onclick="showResultsModal()">Submit & Score</button>
        </div>
    </nav>

    <!-- Main Content Layout -->
    <div class="layout">
        
        <!-- Hero Header -->
        <div class="quiz-hero">
            <div class="hero-info">
                <h2>
                    {title}
                    <span class="hero-badge">{badge_text}</span>
                </h2>
                <p>{subtitle}</p>
            </div>
            <div class="hero-controls">
                <div class="mode-toggle">
                    <div class="mode-option active" id="modePractice" onclick="setMode('practice')">Study Mode (Instant Key)</div>
                    <div class="mode-option" id="modeExam" onclick="setMode('exam')">Mock Exam Mode</div>
                </div>
            </div>
        </div>

        <!-- Progress Tracker -->
        <div class="progress-bar-wrap">
            <div class="progress-meta">
                <span id="progressCount">Answered 0 of {len(quiz_questions)} questions</span>
                <span id="progressPercent">0%</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>

        <!-- Left: Question Flow -->
        <div class="questions-area">
            
            <!-- Filters -->
            <div class="filter-tabs">
                <button class="filter-tab active" onclick="setFilter('all', this)">All Questions ({len(quiz_questions)})</button>
                <button class="filter-tab" onclick="setFilter('unanswered', this)">Unanswered</button>
                <button class="filter-tab" onclick="setFilter('incorrect', this)">Incorrect ❌</button>
                <button class="filter-tab" onclick="setFilter('flagged', this)">Flagged ⭐</button>
            </div>

            <!-- Dynamic Question Cards -->
            <div class="questions-flow" id="questionsFlow"></div>
        </div>

        <!-- Right: Question Palette Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-card">
                <div class="sidebar-title">
                    <span>Question Palette</span>
                    <span id="paletteAnsweredCount" style="font-size: 12px; color: var(--text-muted);">0/{len(quiz_questions)}</span>
                </div>
                <div class="palette-grid" id="paletteGrid"></div>
                <div class="palette-legend">
                    <div class="legend-item"><span class="legend-dot" style="background:#e2e8f0;"></span> Unanswered</div>
                    <div class="legend-item"><span class="legend-dot" style="background:var(--primary-light); border: 1px solid var(--primary);"></span> Answered</div>
                    <div class="legend-item"><span class="legend-dot" style="background:var(--success);"></span> Correct</div>
                    <div class="legend-item"><span class="legend-dot" style="background:var(--danger);"></span> Wrong</div>
                </div>
            </div>

            <div class="sidebar-card">
                <div class="sidebar-title">Exam Day Strategies</div>
                <ul style="font-size: 12.5px; color: #475569; padding-left: 18px; line-height: 1.6;">
                    <li><strong>TRUNCATE vs DELETE:</strong> TRUNCATE is DDL, resets AUTO_INCREMENT, and cannot be rolled back in MySQL.</li>
                    <li><strong>WHERE vs HAVING:</strong> WHERE filters individual rows before grouping; HAVING filters groups after.</li>
                    <li><strong>NULL Checks:</strong> Never use <code>= NULL</code>. Always use <code>IS NULL</code>.</li>
                    <li><strong>Window Functions:</strong> <code>RANK()</code> leaves gaps on ties (1,1,3); <code>DENSE_RANK()</code> does not (1,1,2).</li>
                </ul>
            </div>
        </aside>

    </div>

    <!-- Bottom Action Bar -->
    <div class="bottom-bar">
        <div class="bottom-bar-content">
            <div style="font-size: 13px; font-weight: 600; color: var(--text-muted);" id="bottomStatus">
                Ready to review. Select your answers above.
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-outline" onclick="resetAll()">Reset Quiz</button>
                <button class="btn btn-primary" onclick="showResultsModal()">Finish & View Report</button>
            </div>
        </div>
    </div>

    <!-- Results Modal -->
    <div class="modal-overlay" id="resultsModal">
        <div class="modal-content">
            <div class="score-circle" id="modalScoreCircle">
                <span class="score-text" id="modalScoreText">0%</span>
            </div>
            <h3 class="score-headline" id="modalHeadline">Great Effort!</h3>
            <p class="score-desc" id="modalSubheadline">Here is your CDAC CCME performance breakdown.</p>
            
            <div class="modal-stats">
                <div>
                    <div class="m-stat-val" id="statCorrect" style="color: var(--success);">0</div>
                    <div class="m-stat-lbl">Correct</div>
                </div>
                <div>
                    <div class="m-stat-val" id="statWrong" style="color: var(--danger);">0</div>
                    <div class="m-stat-lbl">Wrong</div>
                </div>
                <div>
                    <div class="m-stat-val" id="statUnanswered" style="color: #64748b;">0</div>
                    <div class="m-stat-lbl">Skipped</div>
                </div>
            </div>

            <div class="modal-actions">
                <button class="btn btn-outline" onclick="closeResultsModal()">Review Questions</button>
                <button class="btn btn-warning" onclick="filterOnlyMissed()">Review Missed (❌)</button>
                <a href="index.html" class="btn btn-primary">Back to Dashboard</a>
            </div>
        </div>
    </div>

    <script>
        const questions = {questions_json};
        const STORAGE_KEY = "{storage_key}";
        let currentMode = "practice"; // 'practice' or 'exam'
        let currentFilter = "all";
        let userAnswers = {{}}; // {{ qIndex: "A" }}
        let flagged = {{}};     // {{ qIndex: true }}
        let secondsElapsed = 0;
        let timerInterval = null;

        // Initialize state from localStorage
        function loadSavedState() {{
            try {{
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {{
                    const parsed = JSON.parse(saved);
                    userAnswers = parsed.answers || {{}};
                    flagged = parsed.flagged || {{}};
                    secondsElapsed = parsed.seconds || 0;
                }}
            }} catch(e) {{
                console.error("Failed to load saved state", e);
            }}
        }}

        function saveState() {{
            try {{
                localStorage.setItem(STORAGE_KEY, JSON.stringify({{
                    answers: userAnswers,
                    flagged: flagged,
                    seconds: secondsElapsed
                }}));
            }} catch(e) {{}}
        }}

        function startTimer() {{
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {{
                secondsElapsed++;
                const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
                const secs = String(secondsElapsed % 60).padStart(2, '0');
                document.getElementById('timerBadge').innerText = `⏱️ ${{mins}}:${{secs}}`;
                if (secondsElapsed % 5 === 0) saveState();
            }}, 1000);
        }}

        function renderQuestions() {{
            const container = document.getElementById('questionsFlow');
            container.innerHTML = '';

            questions.forEach((q, idx) => {{
                const isAnswered = userAnswers[idx] !== undefined;
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.correctAnswer;
                const isFlagged = !!flagged[idx];

                // Filtering logic
                let visible = true;
                if (currentFilter === 'unanswered' && isAnswered) visible = false;
                if (currentFilter === 'incorrect' && (!isAnswered || isCorrect)) visible = false;
                if (currentFilter === 'flagged' && !isFlagged) visible = false;

                if (!visible) return;

                const card = document.createElement('div');
                card.className = `q-card ${{currentMode === 'practice' && isAnswered ? (isCorrect ? 'status-correct' : 'status-incorrect') : ''}}`;
                card.id = `qCard_${{idx}}`;

                let highYieldBadge = q.highYield ? `<span class="q-highyield-pill">⭐ High-Yield</span>` : '';

                let optionsHtml = '';
                for (const [letter, text] of Object.entries(q.options)) {{
                    let itemClass = 'opt-item';
                    if (userChoice === letter) itemClass += ' selected';
                    
                    if (currentMode === 'practice' && isAnswered) {{
                        if (letter === q.correctAnswer) {{
                            itemClass += ' correct';
                        }} else if (userChoice === letter && !isCorrect) {{
                            itemClass += ' wrong';
                        }}
                    }}

                    optionsHtml += `
                        <div class="${{itemClass}}" onclick="selectOption(${{idx}}, '${{letter}}')">
                            <span class="opt-letter">${{letter}}</span>
                            <span class="opt-text">${{text}}</span>
                        </div>
                    `;
                }}

                let explanationClass = (currentMode === 'practice' && isAnswered) ? 'explanation-box show' : 'explanation-box';

                card.innerHTML = `
                    <div class="q-header">
                        <div class="q-meta-left">
                            <span class="q-number">Q${{q.num}}</span>
                            <span class="q-topic">${{q.topic || 'Database'}}</span>
                            ${{highYieldBadge}}
                        </div>
                        <button class="btn-flag ${{isFlagged ? 'active' : ''}}" onclick="toggleFlag(${{idx}})" title="Flag for review">
                            ★
                        </button>
                    </div>

                    <div class="q-text">${{q.question}}</div>

                    <div class="q-options">${{optionsHtml}}</div>

                    <div class="${{explanationClass}}" id="exp_${{idx}}">
                        <div class="exp-header">
                            <span>💡 Detailed Explanation:</span>
                            <span style="color: var(--success); font-weight: 700;">(Correct Answer: ${{q.correctAnswer}})</span>
                        </div>
                        <div class="exp-text">${{q.correctExplanation}}</div>
                        <div class="exam-tip-box">
                            <div class="tip-title">⚡ CDAC CCME Key Takeaway / Exam Trap:</div>
                            <div class="tip-content">${{q.examTip || 'Focus on correct syntax and relational semantics.'}}</div>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            }});

            renderPalette();
            updateStats();
        }}

        function selectOption(qIdx, letter) {{
            userAnswers[qIdx] = letter;
            saveState();
            renderQuestions();
        }}

        function toggleFlag(qIdx) {{
            flagged[qIdx] = !flagged[qIdx];
            saveState();
            renderQuestions();
        }}

        function renderPalette() {{
            const grid = document.getElementById('paletteGrid');
            grid.innerHTML = '';

            questions.forEach((q, idx) => {{
                const btn = document.createElement('button');
                btn.className = 'pal-btn';
                btn.innerText = idx + 1;

                const isAnswered = userAnswers[idx] !== undefined;
                const isCorrect = userAnswers[idx] === q.correctAnswer;

                if (isAnswered) {{
                    if (currentMode === 'practice') {{
                        btn.classList.add(isCorrect ? 'correct' : 'wrong');
                    }} else {{
                        btn.classList.add('answered');
                    }}
                }}

                if (flagged[idx]) {{
                    btn.classList.add('flagged');
                }}

                btn.onclick = () => {{
                    // Switch to 'all' filter if question is hidden
                    if (currentFilter !== 'all') {{
                        setFilter('all', document.querySelector('.filter-tab'));
                    }}
                    setTimeout(() => {{
                        const el = document.getElementById(`qCard_${{idx}}`);
                        if (el) {{
                            el.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
                            el.style.boxShadow = '0 0 0 3px #4f46e5';
                            setTimeout(() => el.style.boxShadow = '', 1500);
                        }}
                    }}, 50);
                }};

                grid.appendChild(btn);
            }});
        }}

        function updateStats() {{
            const total = questions.length;
            const answeredCount = Object.keys(userAnswers).length;
            let correctCount = 0;

            for (const [idx, ans] of Object.entries(userAnswers)) {{
                if (questions[idx] && ans === questions[idx].correctAnswer) {{
                    correctCount++;
                }}
            }}

            const percent = Math.round((answeredCount / total) * 100);
            document.getElementById('progressFill').style.width = percent + '%';
            document.getElementById('progressCount').innerText = `Answered ${{answeredCount}} of ${{total}} questions`;
            document.getElementById('progressPercent').innerText = `${{percent}}%`;
            document.getElementById('paletteAnsweredCount').innerText = `${{answeredCount}}/${{total}}`;
            document.getElementById('scoreBadge').innerText = `🎯 Score: ${{correctCount}}/${{total}}`;
            document.getElementById('bottomStatus').innerText = `Answered ${{answeredCount}}/${{total}} questions. Current score: ${{correctCount}} points.`;
        }}

        function setMode(mode) {{
            currentMode = mode;
            document.getElementById('modePractice').classList.toggle('active', mode === 'practice');
            document.getElementById('modeExam').classList.toggle('active', mode === 'exam');
            renderQuestions();
        }}

        function setFilter(filterType, element) {{
            currentFilter = filterType;
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            if (element) element.classList.add('active');
            renderQuestions();
        }}

        function filterOnlyMissed() {{
            closeResultsModal();
            setMode('practice');
            const incTab = document.querySelectorAll('.filter-tab')[2];
            setFilter('incorrect', incTab);
        }}

        function showResultsModal() {{
            const total = questions.length;
            let correct = 0;
            let answered = 0;

            for (const [idx, ans] of Object.entries(userAnswers)) {{
                answered++;
                if (questions[idx] && ans === questions[idx].correctAnswer) {{
                    correct++;
                }}
            }}

            const wrong = answered - correct;
            const unanswered = total - answered;
            const scorePercent = Math.round((correct / total) * 100);

            document.getElementById('statCorrect').innerText = correct;
            document.getElementById('statWrong').innerText = wrong;
            document.getElementById('statUnanswered').innerText = unanswered;

            document.getElementById('modalScoreText').innerText = `${{scorePercent}}%`;
            document.getElementById('modalScoreCircle').style.setProperty('--percent', scorePercent);

            let headline = "Good Effort!";
            let subheadline = "Keep drilling down on tricky normalization and joins to secure an A+ grade in CDAC CCME.";

            if (scorePercent >= 85) {{
                headline = "🌟 CDAC Exam Topper Grade!";
                subheadline = "Outstanding! You demonstrate exceptional mastery of Database Technologies concepts.";
            }} else if (scorePercent >= 70) {{
                headline = "👍 Strong CCME Foundation!";
                subheadline = "Well done! Review the missed questions below to solidify your full score.";
            }}

            document.getElementById('modalHeadline').innerText = headline;
            document.getElementById('modalSubheadline').innerText = subheadline;

            document.getElementById('resultsModal').classList.add('show');
        }}

        function closeResultsModal() {{
            document.getElementById('resultsModal').classList.remove('show');
        }}

        function resetAll() {{
            if (confirm("Are you sure you want to reset all answers and progress for this quiz?")) {{
                userAnswers = {{}};
                flagged = {{}};
                secondsElapsed = 0;
                localStorage.removeItem(STORAGE_KEY);
                renderQuestions();
            }}
        }}

        // Startup
        loadSavedState();
        startTimer();
        renderQuestions();
    </script>
</body>
</html>"""
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Generated {filename} with {len(quiz_questions)} questions.")

# Generate High-Yield Booster Quiz (Highest exam weightage)
generate_quiz_html(
    title="High-Yield CDAC CCME Exam Booster",
    subtitle="Curated 60+ most frequently tested questions with tricky traps, normalization invariants, window functions & MongoDB queries",
    badge_text="Highest Yield (80/20 Rule)",
    quiz_questions=high_yield_qs,
    filename="Quiz_High_Yield_CDAC_Booster.html",
    is_booster=True
)

# Generate Section Quizzes
generate_quiz_html(
    title="Part 1: Database Fundamentals, ER Model & SQL Basics",
    subtitle="Covers Entity Sets, Weak Entities, ER Symbols, Attributes, DDL vs DML commands and basic SELECT queries",
    badge_text="Questions 1 - 25",
    quiz_questions=part1_qs,
    filename="Quiz_Full_Part_1_Fundamentals_ER_SQLBasics.html"
)

generate_quiz_html(
    title="Part 2: SQL Joins, Constraints, Normalization & Transactions",
    subtitle="Deep dive into INNER/LEFT/CROSS/Self Joins, 1NF to 4NF, Referential Integrity, and ACID transaction rules",
    badge_text="Questions 26 - 50",
    quiz_questions=part2_qs,
    filename="Quiz_Full_Part_2_Joins_Normalization_Transactions.html"
)

generate_quiz_html(
    title="Part 3: MySQL Architecture, Relational Algebra, CTEs & Window Functions",
    subtitle="Indexes (B+ Tree), BCNF, Relational Algebra (σ & π), Subqueries, WITH CTEs, ROW_NUMBER vs RANK vs DENSE_RANK",
    badge_text="Questions 51 - 90",
    quiz_questions=part3_qs,
    filename="Quiz_Full_Part_3_MySQL_AdvancedSQL_WindowFunctions.html"
)

generate_quiz_html(
    title="Part 4: PL/SQL Stored Procedures, Functions, Cursors & Triggers",
    subtitle="PL/SQL block lifecycle, IN/OUT modes, Implicit vs Explicit Cursors, Packages, :OLD vs :NEW, MySQL SIGNAL & Handlers",
    badge_text="Questions 91 - 110",
    quiz_questions=part4_qs,
    filename="Quiz_Full_Part_4_PLSQL_Stored_Procedures_Triggers.html"
)

generate_quiz_html(
    title="Part 5: NoSQL & MongoDB CRUD, Operators & Aggregation Pipeline",
    subtitle="Document databases, BSON, Collections, update operators ($set, $inc, $push), and aggregation ($match, $group, $unwind)",
    badge_text="Questions 111 - 140",
    quiz_questions=part5_qs,
    filename="Quiz_Full_Part_5_NoSQL_MongoDB_Aggregation.html"
)

generate_quiz_html(
    title="Part 6: DBT Exam Question Paper Review & Rebuild Drills",
    subtitle="MySQL cursor properties (asensitive), index rebuild vs reorganize, session temporary tables, complex views, and key differences",
    badge_text="Questions 141 - 147",
    quiz_questions=part6_qs,
    filename="Quiz_Full_Part_6_DBT_Paper_Drill.html"
)

# Master All 147 Questions
generate_quiz_html(
    title="Master CDAC CCME 147-Question Exam Simulator",
    subtitle="Complete timed simulation across all 6 sections with full diagnostic score analysis and comprehensive explanations",
    badge_text="Full Bank (147 Qs)",
    quiz_questions=all_questions,
    filename="Quiz_Master_CDAC_147_Exam_Simulator.html",
    is_booster=True
)
