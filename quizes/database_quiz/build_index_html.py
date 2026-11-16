import json

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDAC CCME Database Technologies Mastery | High-Yield Quiz Portal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --primary-light: #eef2ff;
            --secondary: #0ea5e9;
            --accent: #f59e0b;
            --accent-light: #fef3c7;
            --success: #10b981;
            --success-light: #ecfdf5;
            --danger: #ef4444;
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
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        body {
            background-color: var(--bg-page);
            color: var(--text-dark);
            min-height: 100vh;
            line-height: 1.5;
            padding-bottom: 80px;
        }

        /* Top Header */
        header {
            background: white;
            border-bottom: 1px solid var(--border);
            padding: 30px 24px;
            box-shadow: var(--shadow-sm);
        }

        .header-container {
            max-width: 1140px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }

        .brand-box {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .brand-icon {
            width: 52px;
            height: 52px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 800;
            box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
        }

        .brand-titles h1 {
            font-size: 24px;
            font-weight: 800;
            color: var(--text-dark);
            letter-spacing: -0.5px;
        }

        .brand-titles p {
            font-size: 14px;
            color: var(--text-muted);
            font-weight: 500;
        }

        .header-stats {
            display: flex;
            gap: 12px;
        }

        .stat-pill {
            background: #f1f5f9;
            border: 1px solid var(--border);
            padding: 8px 16px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 700;
            color: var(--text-dark);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .stat-pill.high-yield {
            background: var(--accent-light);
            border-color: #fde68a;
            color: #92400e;
        }

        /* Main Container */
        .container {
            max-width: 1140px;
            margin: 32px auto 0;
            padding: 0 20px;
        }

        /* Hero Booster Card */
        .hero-banner {
            background: linear-gradient(135deg, #312e81 0%, #4338ca 50%, #1e1b4b 100%);
            border-radius: var(--radius-lg);
            padding: 36px;
            color: white;
            margin-bottom: 36px;
            box-shadow: var(--shadow-lg);
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 30px;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .hero-banner::after {
            content: '🗄️';
            position: absolute;
            right: 40px;
            bottom: -20px;
            font-size: 140px;
            opacity: 0.12;
            pointer-events: none;
        }

        .hero-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(245, 158, 11, 0.25);
            border: 1px solid #f59e0b;
            color: #fde68a;
            font-size: 12px;
            font-weight: 700;
            padding: 5px 12px;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
        }

        .hero-title {
            font-size: 30px;
            font-weight: 800;
            line-height: 1.25;
            margin-bottom: 10px;
        }

        .hero-desc {
            font-size: 15px;
            color: #c7d2fe;
            max-width: 650px;
            line-height: 1.6;
            margin-bottom: 22px;
        }

        .hero-actions {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 24px;
            border-radius: var(--radius-md);
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid transparent;
        }

        .btn-gold {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
        }

        .btn-gold:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(217, 119, 6, 0.45);
        }

        .btn-white {
            background: white;
            color: var(--primary);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .btn-white:hover {
            background: #f8fafc;
            transform: translateY(-2px);
        }

        /* Section Headings */
        .section-header {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .section-header h2 {
            font-size: 20px;
            font-weight: 800;
            color: var(--text-dark);
            letter-spacing: -0.3px;
        }

        .section-header p {
            font-size: 13px;
            color: var(--text-muted);
            margin-top: 2px;
        }

        /* Cards Grid */
        .quiz-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
            gap: 20px;
            margin-bottom: 48px;
        }

        .quiz-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 24px;
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
            position: relative;
        }

        .quiz-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow);
            border-color: #cbd5e1;
        }

        .quiz-card.highlight {
            border: 2px solid #f59e0b;
            background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);
        }

        .card-top {
            margin-bottom: 16px;
        }

        .card-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }

        .card-tag {
            font-size: 11px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: var(--primary-light);
            color: var(--primary);
        }

        .card-tag.gold {
            background: #fef3c7;
            color: #b45309;
        }

        .card-count {
            font-size: 12px;
            font-weight: 700;
            color: var(--text-muted);
            background: #f1f5f9;
            padding: 3px 8px;
            border-radius: 6px;
        }

        .card-title {
            font-size: 17px;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 8px;
            line-height: 1.35;
        }

        .card-desc {
            font-size: 13.5px;
            color: var(--text-muted);
            line-height: 1.5;
        }

        .card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 16px;
            border-top: 1px solid var(--border);
            margin-top: 16px;
        }

        .card-features {
            font-size: 12px;
            color: #64748b;
            font-weight: 600;
        }

        .btn-card {
            padding: 8px 18px;
            border-radius: var(--radius-md);
            font-size: 13px;
            font-weight: 700;
            background: var(--primary);
            color: white;
            text-decoration: none;
            transition: all 0.15s;
        }

        .btn-card:hover {
            background: var(--primary-hover);
        }

        .btn-card.gold {
            background: #d97706;
        }

        .btn-card.gold:hover {
            background: #b45309;
        }

        /* Cheat Sheets & High-Yield Summary Tables */
        .cheatsheet-section {
            background: white;
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 32px;
            box-shadow: var(--shadow-sm);
            margin-bottom: 40px;
        }

        .cheatsheet-title {
            font-size: 22px;
            font-weight: 800;
            color: var(--text-dark);
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .cheatsheet-sub {
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 24px;
        }

        .cheat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
        }

        .cheat-box {
            background: #f8fafc;
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 20px;
        }

        .cheat-box-title {
            font-size: 15px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 2px solid var(--primary-light);
            padding-bottom: 8px;
        }

        .cheat-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12.5px;
        }

        .cheat-table th {
            text-align: left;
            padding: 8px 6px;
            color: var(--text-muted);
            font-weight: 700;
            border-bottom: 1px solid var(--border);
        }

        .cheat-table td {
            padding: 8px 6px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
            vertical-align: top;
        }

        .cheat-table code {
            font-family: 'JetBrains Mono', monospace;
            background: #e2e8f0;
            padding: 2px 5px;
            border-radius: 4px;
            font-size: 11.5px;
            color: #0f172a;
        }

        /* Footer */
        footer {
            text-align: center;
            font-size: 13px;
            color: var(--text-muted);
            margin-top: 40px;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <header>
        <div class="header-container">
            <div class="brand-box">
                <div class="brand-icon">DB</div>
                <div class="brand-titles">
                    <h1>CDAC CCME Database Technologies Mastery</h1>
                    <p>Official Question Bank, High-Yield Booster & Exam Simulator</p>
                </div>
            </div>
            <div class="header-stats">
                <div class="stat-pill">📚 147 Questions</div>
                <div class="stat-pill high-yield">⭐ 108 High-Yield</div>
                <div class="stat-pill">🎯 6 Modules</div>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <main class="container">
        
        <!-- Hero Card: High-Yield Booster -->
        <section class="hero-banner">
            <div>
                <span class="hero-tag">🔥 Maximum Score Strategy (80/20 Rule)</span>
                <h2 class="hero-title">High-Yield CDAC CCME Exam Booster</h2>
                <p class="hero-desc">
                    Targeted study quiz containing the 108 highest-frequency, trap-heavy questions. Covers DDL vs DML, NULL traps, BCNF vs 3NF invariants, Window functions (RANK vs DENSE_RANK), PL/SQL cursors, and MongoDB aggregation pipelines.
                </p>
                <div class="hero-actions">
                    <a href="Quiz_High_Yield_CDAC_Booster.html" class="btn btn-gold">
                        🚀 Launch High-Yield Booster (108 Qs)
                    </a>
                    <a href="Quiz_Master_CDAC_147_Exam_Simulator.html" class="btn btn-white">
                        ⏱️ Full 147 Mock Simulator
                    </a>
                </div>
            </div>
        </section>

        <!-- Section 1: Core Topic Quizzes -->
        <div class="section-header">
            <div>
                <h2>Topic-Wise Modular Quizzes</h2>
                <p>Systematic step-by-step preparation with instant solution explanations and exam trap alerts</p>
            </div>
        </div>

        <div class="quiz-grid">
            
            <!-- Card 1 -->
            <div class="quiz-card">
                <div class="card-top">
                    <div class="card-meta">
                        <span class="card-tag">Section A & B</span>
                        <span class="card-count">25 Questions</span>
                    </div>
                    <h3 class="card-title">Part 1: Database Fundamentals, ER Model & SQL Basics</h3>
                    <p class="card-desc">Entity sets, weak entities, ER symbols (Rectangle, Diamond, Oval), DDL vs DML commands, and SELECT filters.</p>
                </div>
                <div class="card-footer">
                    <span class="card-features">Q1 – Q25</span>
                    <a href="Quiz_Full_Part_1_Fundamentals_ER_SQLBasics.html" class="btn-card">Start Quiz →</a>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="quiz-card">
                <div class="card-top">
                    <div class="card-meta">
                        <span class="card-tag">Section B</span>
                        <span class="card-count">25 Questions</span>
                    </div>
                    <h3 class="card-title">Part 2: SQL Joins, Constraints, Normalization & ACID</h3>
                    <p class="card-desc">INNER/LEFT/CROSS/Self Joins, LIKE wildcards (% vs _), 1NF to 4NF, Referential Integrity, and ACID transaction boundaries.</p>
                </div>
                <div class="card-footer">
                    <span class="card-features">Q26 – Q50</span>
                    <a href="Quiz_Full_Part_2_Joins_Normalization_Transactions.html" class="btn-card">Start Quiz →</a>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="quiz-card">
                <div class="card-top">
                    <div class="card-meta">
                        <span class="card-tag">Section C</span>
                        <span class="card-count">40 Questions</span>
                    </div>
                    <h3 class="card-title">Part 3: MySQL Architecture, Relational Algebra, CTEs & Windows</h3>
                    <p class="card-desc">B+ Tree indexing, BCNF, Relational Algebra (σ & π), WITH CTEs, and Window Functions (ROW_NUMBER, RANK, DENSE_RANK).</p>
                </div>
                <div class="card-footer">
                    <span class="card-features">Q51 – Q90</span>
                    <a href="Quiz_Full_Part_3_MySQL_AdvancedSQL_WindowFunctions.html" class="btn-card">Start Quiz →</a>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="quiz-card">
                <div class="card-top">
                    <div class="card-meta">
                        <span class="card-tag">Section D</span>
                        <span class="card-count">20 Questions</span>
                    </div>
                    <h3 class="card-title">Part 4: PL/SQL Stored Programs, Cursors & Triggers</h3>
                    <p class="card-desc">PL/SQL block structure, IN/OUT parameter modes, Implicit vs Explicit Cursors, :OLD vs :NEW triggers, and MySQL SIGNAL.</p>
                </div>
                <div class="card-footer">
                    <span class="card-features">Q91 – Q110</span>
                    <a href="Quiz_Full_Part_4_PLSQL_Stored_Procedures_Triggers.html" class="btn-card">Start Quiz →</a>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="quiz-card">
                <div class="card-top">
                    <div class="card-meta">
                        <span class="card-tag">Section E</span>
                        <span class="card-count">30 Questions</span>
                    </div>
                    <h3 class="card-title">Part 5: NoSQL & MongoDB CRUD, Operators & Pipelines</h3>
                    <p class="card-desc">Document databases, BSON, Collections vs Tables, Update operators ($set, $inc, $push), and Aggregation ($match, $group, $unwind).</p>
                </div>
                <div class="card-footer">
                    <span class="card-features">Q111 – Q140</span>
                    <a href="Quiz_Full_Part_5_NoSQL_MongoDB_Aggregation.html" class="btn-card">Start Quiz →</a>
                </div>
            </div>

            <!-- Card 6 -->
            <div class="quiz-card highlight">
                <div class="card-top">
                    <div class="card-meta">
                        <span class="card-tag gold">Section F - CCME Paper</span>
                        <span class="card-count">7 Questions</span>
                    </div>
                    <h3 class="card-title">Part 6: DBT Exam Question Paper Review</h3>
                    <p class="card-desc">Direct questions from previous DBT papers: MySQL cursor asensitivity, index Rebuild vs Reorganize, session temporary tables, and views.</p>
                </div>
                <div class="card-footer">
                    <span class="card-features">Q141 – Q147</span>
                    <a href="Quiz_Full_Part_6_DBT_Paper_Drill.html" class="btn-card gold">Practice Drill →</a>
                </div>
            </div>

        </div>

        <!-- Section 2: CDAC CCME High-Yield Invariant Cheat Sheets -->
        <section class="cheatsheet-section">
            <h2 class="cheatsheet-title">📋 High-Yield CDAC Exam Revision Cheat Sheets</h2>
            <p class="cheatsheet-sub">Essential memory anchors and distinctions heavily tested in C-DAC CCME / DBT examinations.</p>

            <div class="cheat-grid">
                
                <!-- Cheat Box 1: SQL Commands Taxonomy -->
                <div class="cheat-box">
                    <h4 class="cheat-box-title">⚡ 1. SQL Commands Classification</h4>
                    <table class="cheat-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Commands</th>
                                <th>Rollback?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>DDL</strong></td>
                                <td><code>CREATE, ALTER, DROP, TRUNCATE, RENAME</code></td>
                                <td>❌ No (Auto-commit)</td>
                            </tr>
                            <tr>
                                <td><strong>DML</strong></td>
                                <td><code>INSERT, UPDATE, DELETE</code></td>
                                <td>✅ Yes</td>
                            </tr>
                            <tr>
                                <td><strong>DQL</strong></td>
                                <td><code>SELECT</code></td>
                                <td>N/A (Read-only)</td>
                            </tr>
                            <tr>
                                <td><strong>DCL</strong></td>
                                <td><code>GRANT, REVOKE</code></td>
                                <td>❌ Security control</td>
                            </tr>
                            <tr>
                                <td><strong>TCL</strong></td>
                                <td><code>COMMIT, ROLLBACK, SAVEPOINT</code></td>
                                <td>N/A (Manages states)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Cheat Box 2: Normalization Hierarchy -->
                <div class="cheat-box">
                    <h4 class="cheat-box-title">📐 2. Normal Forms Quick Rules</h4>
                    <table class="cheat-table">
                        <thead>
                            <tr>
                                <th>Form</th>
                                <th>Core Requirement & What it Eliminates</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>1NF</strong></td>
                                <td>Values must be <strong>Atomic</strong>; eliminates repeating groups/arrays.</td>
                            </tr>
                            <tr>
                                <td><strong>2NF</strong></td>
                                <td>1NF + Eliminates <strong>Partial Dependency</strong> on composite candidate key.</td>
                            </tr>
                            <tr>
                                <td><strong>3NF</strong></td>
                                <td>2NF + Eliminates <strong>Transitive Dependency</strong> (non-key -> non-key).</td>
                            </tr>
                            <tr>
                                <td><strong>BCNF</strong></td>
                                <td>Every determinant X in non-trivial X → Y must be a <strong>Superkey</strong>.</td>
                            </tr>
                            <tr>
                                <td><strong>4NF</strong></td>
                                <td>Eliminates <strong>Multivalued Dependencies</strong> (MVD: X →→ Y).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Cheat Box 3: Window Ranking Functions -->
                <div class="cheat-box">
                    <h4 class="cheat-box-title">🔢 3. Window Ranking Differences</h4>
                    <table class="cheat-table">
                        <thead>
                            <tr>
                                <th>Function</th>
                                <th>Behavior on Ties (e.g. 100, 100, 90)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>ROW_NUMBER()</code></td>
                                <td>Strict sequential integers: <strong>1, 2, 3</strong> (no ties, no gaps).</td>
                            </tr>
                            <tr>
                                <td><code>RANK()</code></td>
                                <td>Tied ranks with gap: <strong>1, 1, 3</strong> (leaves gap after tie).</td>
                            </tr>
                            <tr>
                                <td><code>DENSE_RANK()</code></td>
                                <td>Tied ranks with NO gap: <strong>1, 1, 2</strong> (continuous sequence).</td>
                            </tr>
                            <tr>
                                <td><code>PARTITION BY</code></td>
                                <td>Divides rows into groups without collapsing rows like <code>GROUP BY</code>.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Cheat Box 4: MongoDB vs SQL Mapping -->
                <div class="cheat-box">
                    <h4 class="cheat-box-title">🍃 4. MongoDB vs Relational Concepts</h4>
                    <table class="cheat-table">
                        <thead>
                            <tr>
                                <th>RDBMS</th>
                                <th>MongoDB</th>
                                <th>Key Operation/Operator</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Table</td>
                                <td>Collection</td>
                                <td><code>db.collection.drop()</code></td>
                            </tr>
                            <tr>
                                <td>Row</td>
                                <td>BSON Document</td>
                                <td>Default primary key: <code>_id</code> (ObjectId)</td>
                            </tr>
                            <tr>
                                <td>WHERE clause</td>
                                <td><code>$match</code> stage</td>
                                <td><code>{$match: {age: {$gt: 25}}}</code></td>
                            </tr>
                            <tr>
                                <td>GROUP BY</td>
                                <td><code>$group</code> stage</td>
                                <td><code>{$group: {_id: "$dept", total: {$sum: 1}}}</code></td>
                            </tr>
                            <tr>
                                <td>Unnest Array</td>
                                <td><code>$unwind</code> stage</td>
                                <td>Deconstructs array into separate documents</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section>

    </main>

    <footer>
        <p>CDAC CCME Database Technologies Study Suite | Built for Exam Preparation & Score Maximization</p>
    </footer>

</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated index.html dashboard successfully.")
