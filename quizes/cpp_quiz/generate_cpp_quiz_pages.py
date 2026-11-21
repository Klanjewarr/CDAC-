import json
import os

with open("c:/Users/kanch/Desktop/cdac/quizes/cpp_quiz/all_cpp_questions.json", "r", encoding="utf-8") as f:
    all_questions = json.load(f)

# High Yield Questions
high_yield_qs = [q for q in all_questions if q.get("highYield", False)]

# Part 1: Q1 - Q20 (Fundamentals, Struct vs Class, Access, Constructors, References vs Pointers, Const, Static, Namespaces, Overloading rules, Stack vs Heap)
part1_qs = [q for q in all_questions if 1 <= q["num"] <= 20]

# Part 2: Q21 - Q30 (Code Tracing: Copy Constructor, Static Scope, Reference Swap, Default Arguments, LIFO Destruction, Pointer Modifiers, Operator+, Namespace resolution, Virtual vs Non-Virtual Binding, Tail Recursion)
part2_qs = [q for q in all_questions if 21 <= q["num"] <= 30]

# Part 3: Q31 - Q40 (Advanced Diagnostics: RVO, Rule of Three/Double Free, Pointer Arithmetic, Prefix/Postfix ++, Stack LIFO, Virtual Destructors, Static Recursion, Matrix Class, Linked List Recursion)
part3_qs = [q for q in all_questions if 31 <= q["num"] <= 40]

# Part 4: Q41 - Q65 (Sunbeam CCEE Core & Tricky Code Drills: sizeof empty class, protected inheritance, copy constructors, operator precedence, indirection, dynamic_cast, diamond problem)
part4_qs = [q for q in all_questions if 41 <= q["num"] <= 65]

def generate_quiz_html(title, subtitle, badge_text, quiz_questions, filename, is_booster=False):
    questions_json = json.dumps(quiz_questions, ensure_ascii=False)
    storage_key = f"cdac_cpp_{filename.replace('.html', '')}"

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | CDAC CCME C++ Programming</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --primary-light: #eff6ff;
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
            --radius-lg: 14px;
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }}

        body {{
            background: var(--bg-page);
            color: var(--text-dark);
            line-height: 1.5;
            padding-bottom: 80px;
        }}

        /* Header Bar */
        .top-navbar {{
            background: #ffffff;
            border-bottom: 1px solid var(--border);
            padding: 14px 28px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: var(--shadow-sm);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }}

        .nav-left {{
            display: flex;
            align-items: center;
            gap: 16px;
        }}

        .back-link {{
            text-decoration: none;
            color: var(--text-muted);
            font-weight: 600;
            font-size: 13.5px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.2s;
            background: var(--primary-light);
            color: var(--primary);
        }}

        .back-link:hover {{
            background: #dbeafe;
        }}

        .quiz-title-nav {{
            font-size: 16px;
            font-weight: 700;
            color: var(--text-dark);
        }}

        .badge-nav {{
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 9999px;
            background: {"#fef3c7; color: #b45309;" if is_booster else "var(--primary-light); color: var(--primary);"}
            text-transform: uppercase;
        }}

        .nav-controls {{
            display: flex;
            align-items: center;
            gap: 14px;
        }}

        .mode-toggle {{
            display: flex;
            align-items: center;
            background: #f1f5f9;
            padding: 4px;
            border-radius: 8px;
            gap: 4px;
        }}

        .mode-btn {{
            border: none;
            background: transparent;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            color: var(--text-muted);
            transition: all 0.2s;
        }}

        .mode-btn.active {{
            background: #ffffff;
            color: var(--primary);
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }}

        .score-pill {{
            background: #f1f5f9;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 700;
            color: var(--text-dark);
            display: flex;
            align-items: center;
            gap: 6px;
        }}

        .score-val {{
            color: var(--primary);
        }}

        /* Container Layout */
        .main-container {{
            max-width: 1100px;
            margin: 24px auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: 1fr 310px;
            gap: 24px;
        }}

        /* Header Info Card */
        .info-card {{
            grid-column: 1 / -1;
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            border-radius: var(--radius-lg);
            padding: 24px 28px;
            color: white;
            box-shadow: var(--shadow);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        .info-card h1 {{
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 6px;
        }}

        .info-card p {{
            font-size: 14px;
            color: #dbeafe;
        }}

        .stats-strip {{
            display: flex;
            gap: 20px;
        }}

        .stat-box {{
            text-align: center;
            background: rgba(255, 255, 255, 0.15);
            padding: 10px 16px;
            border-radius: 10px;
            backdrop-filter: blur(4px);
        }}

        .stat-num {{
            font-size: 20px;
            font-weight: 800;
        }}

        .stat-lbl {{
            font-size: 11px;
            color: #dbeafe;
            text-transform: uppercase;
        }}

        /* Question Cards Area */
        .questions-area {{
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
            transition: border-color 0.2s, box-shadow 0.2s;
            position: relative;
        }}

        .q-card:hover {{
            box-shadow: var(--shadow);
        }}

        .q-card.flagged {{
            border-left: 5px solid var(--accent);
        }}

        .q-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;
        }}

        .q-meta {{
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .q-number {{
            background: #f1f5f9;
            color: var(--text-dark);
            font-weight: 800;
            font-size: 13px;
            padding: 4px 10px;
            border-radius: 6px;
        }}

        .q-section-tag {{
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
            background: #f8fafc;
            border: 1px solid var(--border);
            padding: 3px 8px;
            border-radius: 4px;
        }}

        .diff-badge {{
            font-size: 11px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 9999px;
            text-transform: uppercase;
        }}

        .diff-Easy {{ background: #dcfce7; color: #15803d; }}
        .diff-Moderate {{ background: #fef3c7; color: #b45309; }}
        .diff-Hard {{ background: #fee2e2; color: #b91c1c; }}
        .diff-Advanced {{ background: #f3e8ff; color: #7e22ce; }}
        .diff-Expert {{ background: #ffe4e6; color: #be123c; }}

        .q-actions {{
            display: flex;
            align-items: center;
            gap: 8px;
        }}

        .flag-btn {{
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: #cbd5e1;
            transition: color 0.2s;
        }}

        .flag-btn.active {{
            color: var(--accent);
        }}

        .q-text {{
            font-size: 15.5px;
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 16px;
            line-height: 1.6;
        }}

        /* Code Block Styling */
        .code-box {{
            background: #0d1117;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 18px;
            overflow-x: auto;
            position: relative;
        }}

        .code-lang-tag {{
            position: absolute;
            top: 8px;
            right: 12px;
            font-size: 10px;
            font-weight: 700;
            color: #8b949e;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: rgba(255,255,255,0.1);
            padding: 2px 6px;
            border-radius: 4px;
        }}

        .code-snippet {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 13.5px;
            color: #e6edf3;
            line-height: 1.6;
            white-space: pre;
        }}

        /* Options Grid */
        .options-list {{
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 16px;
        }}

        .opt-item {{
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: var(--radius-md);
            border: 1.5px solid var(--border);
            background: #ffffff;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
        }}

        .opt-item:hover:not(.locked) {{
            border-color: var(--primary);
            background: var(--primary-light);
        }}

        .opt-letter {{
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12.5px;
            font-weight: 700;
            background: #f1f5f9;
            color: var(--text-muted);
            flex-shrink: 0;
            transition: all 0.2s;
        }}

        .opt-text {{
            font-size: 14.5px;
            font-weight: 500;
            color: var(--text-dark);
            flex-grow: 1;
        }}

        /* Correct / Wrong States */
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

        .opt-item.selected {{
            border-color: var(--primary);
            background: var(--primary-light);
        }}

        /* Explanation Box */
        .explanation-box {{
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-left: 4px solid var(--primary);
            border-radius: var(--radius-md);
            padding: 18px 20px;
            margin-top: 14px;
            display: none;
            animation: fadeIn 0.25s ease-in-out;
        }}

        .explanation-box.show {{
            display: block;
        }}

        .exp-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }}

        .exp-title {{
            font-size: 13.5px;
            font-weight: 800;
            color: #1e3a8a;
            display: flex;
            align-items: center;
            gap: 6px;
        }}

        .concept-tag {{
            font-size: 11px;
            font-weight: 700;
            background: #dbeafe;
            color: #1d4ed8;
            padding: 2px 8px;
            border-radius: 4px;
        }}

        .exp-text {{
            font-size: 13.5px;
            color: #334155;
            line-height: 1.65;
            white-space: pre-line;
        }}

        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(-4px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        /* Sidebar Navigation */
        .sidebar {{
            position: sticky;
            top: 86px;
            display: flex;
            flex-direction: column;
            gap: 18px;
            height: fit-content;
        }}

        .side-card {{
            background: #ffffff;
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 20px;
            box-shadow: var(--shadow-sm);
        }}

        .side-card h3 {{
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 14px;
            color: var(--text-dark);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        .q-grid {{
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
            max-height: 260px;
            overflow-y: auto;
            padding-right: 4px;
        }}

        .grid-num {{
            width: 100%;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            border-radius: 8px;
            border: 1px solid var(--border);
            background: #f8fafc;
            color: var(--text-dark);
            cursor: pointer;
            text-decoration: none;
            transition: all 0.2s;
        }}

        .grid-num:hover {{
            border-color: var(--primary);
            background: var(--primary-light);
        }}

        .grid-num.correct {{
            background: var(--success);
            color: white;
            border-color: var(--success);
        }}

        .grid-num.wrong {{
            background: var(--danger);
            color: white;
            border-color: var(--danger);
        }}

        .grid-num.flagged {{
            border: 2px solid var(--accent);
        }}

        .side-actions {{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }}

        .btn {{
            width: 100%;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }}

        .btn-primary {{
            background: var(--primary);
            color: white;
        }}

        .btn-primary:hover {{
            background: var(--primary-hover);
        }}

        .btn-secondary {{
            background: #f1f5f9;
            color: var(--text-dark);
        }}

        .btn-secondary:hover {{
            background: #e2e8f0;
        }}

        /* Responsiveness */
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

    <!-- Sticky Navigation Bar -->
    <header class="top-navbar">
        <div class="nav-left">
            <a href="index.html" class="back-link">← Hub Dashboard</a>
            <span class="quiz-title-nav">{title}</span>
            <span class="badge-nav">{badge_text}</span>
        </div>
        <div class="nav-controls">
            <div class="mode-toggle">
                <button class="mode-btn active" id="btnModeInstant" onclick="setMode('instant')">⚡ Instant Feedback</button>
                <button class="mode-btn" id="btnModeExam" onclick="setMode('exam')">⏱️ Exam Simulation</button>
            </div>
            <div class="score-pill">
                <span>Score:</span>
                <span class="score-val" id="scoreDisplay">0 / {len(quiz_questions)}</span>
            </div>
        </div>
    </header>

    <div class="main-container">
        <!-- Header Banner -->
        <div class="info-card">
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
            <div class="stats-strip">
                <div class="stat-box">
                    <div class="stat-num">{len(quiz_questions)}</div>
                    <div class="stat-lbl">Questions</div>
                </div>
                <div class="stat-box">
                    <div class="stat-num">{len([q for q in quiz_questions if q.get("code")])}</div>
                    <div class="stat-lbl">Code Tracing</div>
                </div>
                <div class="stat-box">
                    <div class="stat-num">60m</div>
                    <div class="stat-lbl">Target Time</div>
                </div>
            </div>
        </div>

        <!-- Question Cards Column -->
        <div class="questions-area" id="questionsContainer">
            <!-- Questions rendered via JS -->
        </div>

        <!-- Sticky Sidebar Navigation & Analytics -->
        <div class="sidebar">
            <div class="side-card">
                <h3>
                    <span>Question Navigator</span>
                    <span id="answeredCount" style="font-size: 11px; color: var(--text-muted);">0 Answered</span>
                </h3>
                <div class="q-grid" id="questionGrid">
                    <!-- Nav pills rendered via JS -->
                </div>
            </div>

            <div class="side-card">
                <h3>Quick Actions</h3>
                <div class="side-actions">
                    <button class="btn btn-secondary" onclick="toggleAllExplanations()">💡 Toggle All Explanations</button>
                    <button class="btn btn-secondary" onclick="resetQuiz()">🔄 Reset My Answers</button>
                    <button class="btn btn-primary" onclick="window.scrollTo({{ top: 0, behavior: 'smooth' }})">⬆️ Back to Top</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const QUESTIONS = {questions_json};
        const STORAGE_KEY = "{storage_key}";
        let currentMode = "instant"; // 'instant' or 'exam'
        let userState = {{
            answers: {{}},
            flagged: {{}}
        }};

        // Initialize from localStorage if exists
        function loadState() {{
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {{
                try {{
                    userState = JSON.parse(saved);
                }} catch (e) {{
                    console.error("Failed to load saved state", e);
                }}
            }}
        }}

        function saveState() {{
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
        }}

        function renderQuiz() {{
            const container = document.getElementById("questionsContainer");
            const grid = document.getElementById("questionGrid");
            container.innerHTML = "";
            grid.innerHTML = "";

            let answered = 0;
            let correctCount = 0;

            QUESTIONS.forEach((q, idx) => {{
                const qNum = idx + 1;
                const userAnswer = userState.answers[qNum];
                const isAnswered = userAnswer !== undefined;
                const isFlagged = !!userState.flagged[qNum];
                if (isAnswered) answered++;
                if (isAnswered && userAnswer === q.answer) correctCount++;

                // Build Card
                const card = document.createElement("div");
                card.className = `q-card ${{isFlagged ? "flagged" : ""}}`;
                card.id = `q_${{qNum}}`;

                let codeHtml = "";
                if (q.code && q.code.trim().length > 0) {{
                    codeHtml = `
                    <div class="code-box">
                        <span class="code-lang-tag">C++17</span>
                        <pre class="code-snippet">${{escapeHtml(q.code)}}</pre>
                    </div>`;
                }}

                let optionsHtml = "";
                for (const [key, val] of Object.entries(q.options)) {{
                    let optClass = "opt-item";
                    let suffixIcon = "";
                    if (isAnswered) {{
                        optClass += " locked";
                        if (currentMode === "instant") {{
                            if (key === q.answer) {{
                                optClass += " correct";
                                suffixIcon = ' <span style="margin-left:auto; font-weight:700; color:var(--success);">✓ Correct</span>';
                            }} else if (key === userAnswer) {{
                                optClass += " wrong";
                                suffixIcon = ' <span style="margin-left:auto; font-weight:700; color:var(--danger);">✗ Your Choice</span>';
                            }}
                        }} else {{
                            if (key === userAnswer) optClass += " selected";
                        }}
                    }}

                    optionsHtml += `
                    <div class="${{optClass}}" onclick="selectOption(${{qNum}}, '${{key}}')">
                        <div class="opt-letter">${{key}}</div>
                        <div class="opt-text">${{escapeHtml(val)}}</div>
                        ${{suffixIcon}}
                    </div>`;
                }}

                const showExp = (isAnswered && currentMode === "instant") || card.getAttribute("data-force-exp") === "true";

                card.innerHTML = `
                    <div class="q-header">
                        <div class="q-meta">
                            <span class="q-number">Q${{qNum}}</span>
                            <span class="q-section-tag">${{q.section}}</span>
                            <span class="diff-badge diff-${{q.difficulty}}">${{q.difficulty}}</span>
                        </div>
                        <div class="q-actions">
                            <button class="flag-btn ${{isFlagged ? "active" : ""}}" onclick="toggleFlag(${{qNum}})" title="Flag for Review">★</button>
                        </div>
                    </div>
                    <div class="q-text">${{escapeHtml(q.question)}}</div>
                    ${{codeHtml}}
                    <div class="options-list">${{optionsHtml}}</div>
                    <div class="explanation-box ${{showExp ? "show" : ""}}" id="exp_${{qNum}}">
                        <div class="exp-header">
                            <div class="exp-title">
                                <span>💡 Concept Deep Dive:</span>
                                <span class="concept-tag">${{q.concept || "Core Mechanism"}}</span>
                            </div>
                            <span style="font-size:12px; font-weight:700; color:var(--success);">Correct Key: Option ${{q.answer}}</span>
                        </div>
                        <div class="exp-text">${{escapeHtml(q.explanation)}}</div>
                    </div>
                `;
                container.appendChild(card);

                // Grid Pill
                const pill = document.createElement("a");
                pill.className = `grid-num ${{isFlagged ? "flagged" : ""}}`;
                pill.href = `#q_${{qNum}}`;
                pill.innerText = qNum;
                if (isAnswered && currentMode === "instant") {{
                    if (userAnswer === q.answer) pill.classList.add("correct");
                    else pill.classList.add("wrong");
                }}
                grid.appendChild(pill);
            }});

            document.getElementById("scoreDisplay").innerText = `${{correctCount}} / ${{QUESTIONS.length}}`;
            document.getElementById("answeredCount").innerText = `${{answered}} / ${{QUESTIONS.length}} Done`;
        }}

        function selectOption(qNum, selectedKey) {{
            if (userState.answers[qNum]) return; // locked once clicked in instant mode
            userState.answers[qNum] = selectedKey;
            saveState();
            renderQuiz();
        }}

        function toggleFlag(qNum) {{
            userState.flagged[qNum] = !userState.flagged[qNum];
            saveState();
            renderQuiz();
        }}

        function setMode(mode) {{
            currentMode = mode;
            document.getElementById("btnModeInstant").classList.toggle("active", mode === "instant");
            document.getElementById("btnModeExam").classList.toggle("active", mode === "exam");
            renderQuiz();
        }}

        let allExpanded = false;
        function toggleAllExplanations() {{
            allExpanded = !allExpanded;
            document.querySelectorAll(".explanation-box").forEach(el => {{
                if (allExpanded) el.classList.add("show");
                else if (currentMode !== "instant") el.classList.remove("show");
            }});
        }}

        function resetQuiz() {{
            if (confirm("Reset all your answers and progress for this quiz?")) {{
                userState = {{ answers: {{}}, flagged: {{}} }};
                localStorage.removeItem(STORAGE_KEY);
                renderQuiz();
            }}
        }}

        function escapeHtml(text) {{
            if (!text) return "";
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }}

        loadState();
        renderQuiz();
    </script>
</body>
</html>
"""
    with open(f"c:/Users/kanch/Desktop/cdac/quizes/cpp_quiz/{filename}", "w", encoding="utf-8") as out:
        out.write(html)
    print(f"Generated {filename}")

# Generate all pages
generate_quiz_html(
    title="C++ Master 40 Mock Exam Simulator",
    subtitle="Full 40-question authentic mock exam covering C++17 OOP, memory models, operator overloading, and runtime polymorphism.",
    badge_text="CDAC CCME Pattern",
    quiz_questions=all_questions,
    filename="Quiz_Master_CDAC_CPP_Exam_Simulator.html"
)

generate_quiz_html(
    title="Part 1: Fundamentals, Pointers & Memory Architecture",
    subtitle="Questions 1 to 20: Classes vs structs, access specifiers, constructors, this pointer, references vs pointers, const correctness, namespaces, and stack vs heap.",
    badge_text="Module 1 · Q1-20",
    quiz_questions=part1_qs,
    filename="Quiz_Part1_Fundamentals_Pointers_Memory.html"
)

generate_quiz_html(
    title="Part 2: Code Tracing, Lifecycle & Operator Overloading",
    subtitle="Questions 21 to 30: Code tracing, default arguments, LIFO destructor order, pointer pass-by-value vs dereference, operator+, and static vs dynamic binding.",
    badge_text="Module 2 · Q21-30",
    quiz_questions=part2_qs,
    filename="Quiz_Part2_CodeTracing_Lifecycle_Operators.html"
)

generate_quiz_html(
    title="Part 3: Advanced Diagnostics, Virtual Destructors & Algorithms",
    subtitle="Questions 31 to 40: Return Value Optimization (RVO), Rule of Three, double-free bugs, pointer arithmetic, prefix/postfix ++, virtual destructors, static recursion, and linked lists.",
    badge_text="Module 3 · Q31-40",
    quiz_questions=part3_qs,
    filename="Quiz_Part3_Advanced_Destructors_Pointers_Recursion.html"
)

generate_quiz_html(
    title="Part 4: Sunbeam CCEE Core & Tricky Code Drills",
    subtitle="Questions 41 to 65: sizeof empty class, protected inheritance, copy constructors, operator precedence, indirection, dynamic_cast, and diamond problem.",
    badge_text="Module 4 · Q41-65",
    quiz_questions=part4_qs,
    filename="Quiz_Part4_Sunbeam_Tricky_Exam_Traps.html"
)

generate_quiz_html(
    title="C++ High-Yield Concept Booster",
    subtitle="Curated 44 most critical code-tracing and trap questions that CDAC evaluators love testing.",
    badge_text="High Yield Drill",
    quiz_questions=high_yield_qs,
    filename="Quiz_High_Yield_Booster.html",
    is_booster=True
)

generate_quiz_html(
    title="Master CDAC C++ 65-Question Exam Simulator",
    subtitle="Complete timed simulation across all 4 modules with active diagnostics, timer, code-tracing, and memory models.",
    badge_text="Master Simulator",
    quiz_questions=all_questions,
    filename="Quiz_Master_CDAC_CPP_Exam_Simulator.html",
    is_booster=True
)

# Now generate C++ Index Hub Dashboard
index_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDAC CCME C++ Programming Mastery Portal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --primary-light: #eff6ff;
            --secondary: #0ea5e9;
            --accent: #f59e0b;
            --accent-light: #fef3c7;
            --success: #10b981;
            --success-light: #ecfdf5;
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
            font-family: 'Plus Jakarta Sans', sans-serif;
        }}

        body {{
            background: var(--bg-page);
            color: var(--text-dark);
            line-height: 1.5;
            padding-bottom: 60px;
        }}

        header {{
            background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%);
            color: white;
            padding: 48px 20px 40px;
            box-shadow: var(--shadow);
        }}

        .header-content {{
            max-width: 1100px;
            margin: 0 auto;
        }}

        .top-nav-row {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }}

        .btn-hub-back {{
            text-decoration: none;
            color: white;
            background: rgba(255,255,255,0.2);
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            backdrop-filter: blur(4px);
        }}

        .badge-pill {{
            background: rgba(255,255,255,0.2);
            padding: 5px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }}

        h1 {{
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 10px;
        }}

        p.lead {{
            font-size: 16px;
            color: #dbeafe;
            max-width: 780px;
            line-height: 1.6;
            margin-bottom: 24px;
        }}

        .btn-row {{
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }}

        .btn-hero {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 22px;
            border-radius: 10px;
            font-size: 14.5px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.2s;
        }}

        .btn-gold {{
            background: #f59e0b;
            color: #0f172a;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }}

        .btn-gold:hover {{
            background: #d97706;
            transform: translateY(-2px);
        }}

        .btn-white {{
            background: #ffffff;
            color: var(--primary);
        }}

        .btn-white:hover {{
            background: #f1f5f9;
            transform: translateY(-2px);
        }}

        main {{
            max-width: 1100px;
            margin: -24px auto 0;
            padding: 0 20px;
        }}

        .grid-cards {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
            margin-bottom: 36px;
        }}

        .quiz-card {{
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 24px;
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.2s;
        }}

        .quiz-card:hover {{
            transform: translateY(-3px);
            box-shadow: var(--shadow);
            border-color: #93c5fd;
        }}

        .card-tag {{
            font-size: 11px;
            font-weight: 700;
            color: var(--primary);
            background: var(--primary-light);
            padding: 4px 10px;
            border-radius: 6px;
            display: inline-block;
            margin-bottom: 12px;
            text-transform: uppercase;
        }}

        .quiz-card h3 {{
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 8px;
            color: var(--text-dark);
        }}

        .quiz-card p {{
            font-size: 13.5px;
            color: var(--text-muted);
            line-height: 1.5;
            margin-bottom: 20px;
        }}

        .card-footer {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #f1f5f9;
            padding-top: 14px;
        }}

        .q-count {{
            font-size: 13px;
            font-weight: 700;
            color: var(--text-muted);
        }}

        .btn-start {{
            background: var(--primary-light);
            color: var(--primary);
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            transition: all 0.2s;
        }}

        .btn-start:hover {{
            background: var(--primary);
            color: white;
        }}

        /* Concept Guide Box */
        .guide-box {{
            background: white;
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 28px;
            box-shadow: var(--shadow-sm);
            margin-top: 24px;
        }}

        .guide-box h2 {{
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        .pillars-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }}

        .pillar-item {{
            background: #f8fafc;
            border: 1px solid var(--border);
            padding: 16px;
            border-radius: 10px;
        }}

        .pillar-item h4 {{
            font-size: 14.5px;
            font-weight: 700;
            margin-bottom: 6px;
            color: var(--primary);
        }}

        .pillar-item p {{
            font-size: 12.5px;
            color: #475569;
            line-height: 1.5;
        }}
    </style>
</head>
<body>
    <header>
        <div class="header-content">
            <div class="top-nav-row">
                <a href="../index.html" class="btn-hub-back">← Back to Master CDAC Portal</a>
                <span class="badge-pill">Paper Code: S1AC01 · 18-Nov-26 (9-10 AM)</span>
            </div>
            <h1>C++ Programming Concept Mastery Portal</h1>
            <p class="lead">Built directly from official CDAC & Sunbeam mock exam questions. Every question teaches you underlying memory mechanics, constructor/destructor execution order, operator overloading, and runtime polymorphism.</p>
            <div class="btn-row">
                <a href="Quiz_High_Yield_Booster.html" class="btn-hero btn-gold">
                    🚀 Launch High-Yield Booster (44 Tricky Qs)
                </a>
                <a href="Quiz_Master_CDAC_CPP_Exam_Simulator.html" class="btn-hero btn-white">
                    ⏱️ Full 65-Question Mock Simulator
                </a>
            </div>
        </div>
    </header>

    <main>
        <div class="grid-cards">
            <!-- Part 1 -->
            <div class="quiz-card">
                <div>
                    <span class="card-tag">Module 1 · Theory & Foundations</span>
                    <h3>Part 1: Fundamentals, Pointers & Memory</h3>
                    <p>Struct vs Class, access specifiers, constructor types, this pointer, references vs pointers, const correctness, namespaces, inline & friend functions, and stack vs heap.</p>
                </div>
                <div class="card-footer">
                    <span class="q-count">Q1 - Q20 (20 Questions)</span>
                    <a href="Quiz_Part1_Fundamentals_Pointers_Memory.html" class="btn-start">Start Drill →</a>
                </div>
            </div>

            <!-- Part 2 -->
            <div class="quiz-card">
                <div>
                    <span class="card-tag">Module 2 · Code Tracing</span>
                    <h3>Part 2: Lifecycle & Operator Overloading</h3>
                    <p>Tracing copy constructors, static counter in nested scopes, pass-by-reference swap, default constructor arguments, LIFO destruction, and non-virtual dispatch.</p>
                </div>
                <div class="card-footer">
                    <span class="q-count">Q21 - Q30 (10 Questions)</span>
                    <a href="Quiz_Part2_CodeTracing_Lifecycle_Operators.html" class="btn-start">Start Drill →</a>
                </div>
            </div>

            <!-- Part 3 -->
            <div class="quiz-card">
                <div>
                    <span class="card-tag">Module 3 · Diagnostics & Advanced</span>
                    <h3>Part 3: Advanced Diagnostics & Pointers</h3>
                    <p>Return Value Optimization (RVO), Rule of Three & double-free bugs, pointer arithmetic offsets, prefix vs postfix ++, virtual destructors, and static recursion.</p>
                </div>
                <div class="card-footer">
                    <span class="q-count">Q31 - Q40 (10 Questions)</span>
                    <a href="Quiz_Part3_Advanced_Destructors_Pointers_Recursion.html" class="btn-start">Start Drill →</a>
                </div>
            </div>

            <!-- Part 4 -->
            <div class="quiz-card" style="border: 1.5px solid #f59e0b; background: #fffdf5;">
                <div>
                    <span class="card-tag" style="background: #fef3c7; color: #b45309;">Module 4 · Sunbeam Core Traps</span>
                    <h3 style="color: #92400e;">Part 4: Sunbeam CCEE Core & Tricky Code Drills</h3>
                    <p>Direct authentic Sunbeam questions: sizeof empty class (1 byte), protected inheritance, operator+ vs =, indirection, dynamic_cast failure modes, diamond inheritance, and non-overloadable operators.</p>
                </div>
                <div class="card-footer">
                    <span class="q-count">Q41 - Q65 (25 Questions)</span>
                    <a href="Quiz_Part4_Sunbeam_Tricky_Exam_Traps.html" class="btn-start" style="background: #f59e0b; color: #0f172a; font-weight: 800;">Start Drill →</a>
                </div>
            </div>
        </div>

        <div class="guide-box">
            <h2>🧠 The 6 Foundational Pillars of C++ Exam Success</h2>
            <p style="font-size: 14px; color: var(--text-muted);">Master these core principles that CDAC questions repeatedly test across all 65 questions:</p>
            <div class="pillars-grid">
                <div class="pillar-item">
                    <h4>1. LIFO Stack Destruction Order</h4>
                    <p>Stack objects are destroyed in the <strong>exact reverse order</strong> of their construction. At block exit or return, the most recently constructed object is cleaned up first.</p>
                </div>
                <div class="pillar-item">
                    <h4>2. Non-Virtual Static Dispatch</h4>
                    <p>Without the <code>virtual</code> keyword on a base member function, C++ binds the call at compile time based strictly on the <strong>pointer type</strong>, not the runtime object!</p>
                </div>
                <div class="pillar-item">
                    <h4>3. The Virtual Destructor Mandate</h4>
                    <p>Deleting a derived object via a base pointer (<code>delete pBase;</code>) without a <code>virtual ~Base()</code> skips the derived destructor, leaking resources!</p>
                </div>
                <div class="pillar-item">
                    <h4>4. Rule of Three & Double-Free</h4>
                    <p>If a class manages dynamic memory (raw pointer), a default compiler copy constructor causes a shallow copy, leading to an immediate double-free crash when both objects delete the same address.</p>
                </div>
                <div class="pillar-item">
                    <h4>5. Virtual Base Classes & Diamond Problem</h4>
                    <p>When two derived classes inherit from a common base, inheriting via <code>virtual public Base</code> prevents duplicate subobjects and ambiguity in the leaf class.</p>
                </div>
                <div class="pillar-item">
                    <h4>6. Size of Empty Class & Indirection</h4>
                    <p>An empty class in C++ has <code>sizeof = 1 byte</code> to ensure distinct object addresses. Accessing objects via pointers is called <strong>indirection</strong>.</p>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
"""

with open("c:/Users/kanch/Desktop/cdac/quizes/cpp_quiz/index.html", "w", encoding="utf-8") as f:
    f.write(index_html)
print("Generated c++ index.html")
