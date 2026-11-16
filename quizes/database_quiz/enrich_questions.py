import json
import re

# Load parsed questions
with open("parsed_database_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

# Define high-yield numbers based on CDAC CCME/DBT exam frequency
high_yield_nums = {
    2, 3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 28, 29, 30, 31, 32, 33, 34, 35, 
    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 51, 52, 53, 54, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 
    71, 73, 74, 76, 77, 78, 79, 80, 81, 83, 84, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 102, 104, 105, 
    106, 107, 111, 112, 113, 114, 115, 118, 122, 123, 124, 125, 126, 127, 128, 129, 130, 133, 134, 135, 139, 140, 
    141, 142, 143, 144, 146, 147
}

# CDAC Exam Tips and Traps mapping for questions
exam_tips = {
    1: "In ER modeling: Entity set is a collection of similar entities. An Entity Type defines the schema/structure.",
    2: "Composite vs Multivalued: Composite = can be divided into sub-parts (Name -> First, Last). Multivalued = multiple values (Phone numbers).",
    3: "ER Diagram symbols: Entity = Rectangle, Attribute = Oval, Relationship = Diamond, Line = Link.",
    4: "Relationship is always a Diamond. Identifying relationship for weak entity = Double Diamond.",
    5: "Weak entity = Double Rectangle. Identifying Relationship = Double Diamond. Partial key / discriminator = Dashed underline.",
    6: "SELECT is DQL (Data Query Language), though traditionally grouped under DML.",
    7: "DDL defines structure/schema (CREATE, ALTER, DROP, TRUNCATE, RENAME). DDL operations are auto-committed in MySQL!",
    8: "DML manipulates rows (INSERT, UPDATE, DELETE). DML can be rolled back unless committed.",
    9: "TRUNCATE is DDL, NOT DML! It resets high-water mark / AUTO_INCREMENT and cannot be rolled back in MySQL.",
    10: "TRUNCATE TABLE vs DELETE: TRUNCATE is faster, deallocates data pages, resets auto-increment, and drops/recreates the table structure.",
    11: "DROP TABLE drops both data and metadata (definition). DELETE drops data rows only.",
    12: "Execution Order Trap: WHERE filters rows BEFORE GROUP BY; HAVING filters grouped summary rows AFTER aggregation.",
    13: "HAVING can use aggregate functions (e.g. HAVING COUNT(*) > 2); WHERE CANNOT use aggregate functions directly!",
    14: "COUNT(*) counts total rows including NULLs. COUNT(column) ignores NULL rows!",
    15: "Aggregate functions: MAX, MIN, AVG, SUM, COUNT. GROUP BY and ORDER BY are SQL clauses, not functions.",
    16: "Default ORDER BY is ASC (Ascending: 0-9, A-Z). Omission of ASC/DESC defaults to ASC.",
    17: "NULL Trap: Never use '= NULL' or '!= NULL'! Always use 'IS NULL' or 'IS NOT NULL'. Comparisons with NULL evaluate to UNKNOWN.",
    18: "NULL is NOT zero (0) and NOT an empty string (''). It represents missing, inapplicable, or unknown information.",
    19: "PRIMARY KEY = UNIQUE + NOT NULL. Exactly one primary key allowed per table.",
    20: "A table can have at most ONE Primary Key constraint, though that PK can be composite (multiple columns).",
    21: "A table can have MULTIPLE UNIQUE constraints, but only ONE PRIMARY KEY.",
    22: "Foreign key column CAN contain NULL (e.g. employee without a manager), unless defined with NOT NULL.",
    23: "FOREIGN KEY enforces Referential Integrity: child value must exist in parent table or be NULL.",
    24: "Schema modification uses ALTER TABLE ... ADD [COLUMN] columnName dataType.",
    28: "LIKE Wildcards: '%' matches 0 or more characters; '_' matches exactly 1 character.",
    29: "Single character wildcard is underscore (_). E.g. '_a%' matches strings with 'a' as second letter.",
    30: "INNER JOIN returns only matching rows from both tables (intersection).",
    31: "LEFT OUTER JOIN returns all rows from left table + matched right table rows (NULL if no match).",
    32: "CROSS JOIN = Cartesian product. Result rows = m * n.",
    33: "MySQL doesn't support FULL OUTER JOIN natively! Emulate it using: (LEFT JOIN) UNION (RIGHT JOIN).",
    34: "Self join: Joining a table to itself using two distinct table aliases (e.g., Emp e JOIN Emp m ON e.mgr_id = m.emp_id).",
    35: "UNION eliminates duplicate rows (costly sort). UNION ALL retains duplicates (faster).",
    38: "1NF: Atomic values only (no multi-valued attributes, no arrays, no comma-separated values in a cell).",
    39: "2NF: Must be in 1NF + NO Partial Dependency (no non-prime attribute depends on a part of a composite candidate key).",
    40: "3NF: Must be in 2NF + NO Transitive Dependency (non-prime attribute must not depend on another non-prime attribute: X -> Y -> Z).",
    41: "4NF: Eliminates Multivalued Dependencies (MVD: X ->-> Y).",
    43: "COMMIT makes uncommitted transaction changes permanent and releases locks.",
    44: "ROLLBACK undoes uncommitted modifications back to the beginning of the transaction or to a SAVEPOINT.",
    46: "Atomicity: 'All or Nothing'. Managed by Transaction Manager / Recovery Manager via undo logs.",
    47: "Durability: Once committed, data survives crashes, power loss, and restarts. Guaranteed by redo logs (WAL).",
    51: "DCL (Data Control Language) manages security and permissions: GRANT and REVOKE.",
    52: "TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT.",
    53: "CDAC Favorite: TRUNCATE vs DELETE. TRUNCATE is DDL, resets AUTO_INCREMENT, cannot be filtered with WHERE.",
    54: "AUTO_INCREMENT automatically assigns next integer sequence when null/omitted. Only 1 auto_increment column allowed per table, must be indexed.",
    58: "CHECK constraint validates condition on INSERT/UPDATE. In MySQL 8.0+, CHECK is actively enforced.",
    59: "InnoDB uses B+ Trees for clustered and secondary indexes. Root to leaf depth is typically 3-4 levels for millions of rows.",
    60: "Index Trade-off: Speeds up SELECT queries; slows down INSERT, UPDATE, and DELETE (extra maintenance).",
    61: "Candidate Key: Minimal Superkey (superkey with no redundant attributes).",
    63: "Functional Dependency X -> Y: If two rows agree on X, they MUST agree on Y.",
    64: "BCNF (Boyce-Codd Normal Form): For EVERY non-trivial FD X -> Y, X MUST be a Superkey. Stricter than 3NF.",
    65: "Redundancy causes 3 anomalies: Insertion Anomaly, Update/Modification Anomaly, Deletion Anomaly.",
    66: "Relational Algebra: Selection (sigma σ) = filters ROWS (WHERE clause).",
    67: "Relational Algebra: Projection (pi π) = selects COLUMNS (SELECT column_list).",
    68: "Union Compatibility: Same degree (number of attributes) and compatible corresponding domains (data types).",
    69: "UNION vs UNION ALL: UNION performs duplicate elimination; UNION ALL simply appends result sets.",
    74: "EXISTS operator: Evaluates to TRUE as soon as subquery finds 1 matching row; stops scanning immediately (efficient).",
    76: "Correlated Subquery: References columns from outer query; re-evaluated for each candidate outer row.",
    77: "CTE (Common Table Expression): Declared using WITH cte_name AS (SELECT ...). Improves readability over subqueries.",
    78: "Recursive CTE: Contains an anchor member and a recursive member joined with UNION ALL. Used for trees/hierarchies.",
    79: "ROW_NUMBER(): Assigns sequential integers (1, 2, 3, 4) with NO ties and NO gaps.",
    80: "RANK() vs DENSE_RANK(): Ties get same rank. RANK() leaves gaps (1, 1, 3); DENSE_RANK() has NO gaps (1, 1, 2).",
    81: "PARTITION BY in OVER() clause: Divides rows into groups without collapsing them into a single row like GROUP BY.",
    83: "Window Functions calculate aggregates while retaining original row identities and individual row counts.",
    88: "WITH CHECK OPTION: Prevents INSERT/UPDATE through a view that would violate the view's WHERE condition.",
    89: "TEMPORARY TABLE in MySQL: Exists only for duration of current user session; automatically dropped when session ends.",
    91: "PL/SQL Block Structure: DECLARE (optional), BEGIN (mandatory), EXCEPTION (optional), END; (mandatory).",
    92: "DECLARE section in PL/SQL is OPTIONAL. BEGIN and END are mandatory.",
    94: "PL/SQL Parameter modes: IN (pass-by-reference/value, read-only default), OUT (return value), IN OUT (both).",
    96: "Function MUST return a value using RETURN statement; Procedure does NOT require a RETURN value.",
    97: "Implicit Cursor: Opened automatically by Oracle for every SQL DML/SELECT statement (SQL%FOUND, SQL%ROWCOUNT).",
    98: "%ROWCOUNT: Number of rows fetched so far (explicit) or affected by DML (implicit cursor).",
    99: "SQL%FOUND: TRUE if DML affected at least 1 row; FALSE if 0 rows affected.",
    100: "Explicit Cursor lifecycle: DECLARE -> OPEN -> FETCH -> CLOSE.",
    102: "Package Specification: Public interface (declarations). Package Body: Private implementation and actual subprogram code.",
    104: "BEFORE Trigger: Fires before DML executes (ideal for validation/modifying :NEW values). AFTER Trigger: For auditing/logging.",
    105: "Trigger Pseudo-records: :NEW holds inserted/updated value; :OLD holds prior value. INSERT has only :NEW; DELETE has only :OLD.",
    106: "MySQL Error Signaling: SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error message'; used in stored programs.",
    107: "DECLARE ... HANDLER FOR SQLEXCEPTION / NOT FOUND: Traps errors in MySQL stored procedures.",
    111: "MongoDB is Document-oriented NoSQL; stores JSON-like BSON (Binary JSON) documents in collections.",
    112: "BSON format: Binary-encoded JSON supporting extra data types (Date, ObjectId, Binary, 64-bit int).",
    114: "MongoDB Collection = Relational Table; MongoDB Document = Relational Row; MongoDB Field = Relational Column.",
    115: "Default primary key in MongoDB is '_id'. If omitted, MongoDB automatically generates a 12-byte ObjectId.",
    118: "updateOne() updates first matching document. Requires update operators like $set, $inc, $unset.",
    122: "$set operator: Sets/updates field value without overwriting entire document.",
    123: "$inc operator: Increments numeric field by specified value (e.g. {$inc: {count: 1}}).",
    124: "$push operator: Appends an item to an array field. To remove, use $pull.",
    125: "Aggregation Pipeline: $match filters documents (equivalent to WHERE in SQL). Should be placed as early as possible.",
    126: "$group stage: Groups documents by _id key and computes aggregates using $sum, $avg, $min, $max.",
    127: "$sort stage: 1 for Ascending, -1 for Descending.",
    128: "$unwind stage: Deconstructs an array field from input documents to output a document for each element.",
    133: "Horizontal Scaling (Scale-out): Adding more low-cost server nodes (Sharding in Mongo). Vertical Scaling: Adding RAM/CPU to 1 server.",
    139: "ACID in MongoDB: Multi-document ACID transactions are fully supported since MongoDB 4.0 on replica sets and 4.2 on sharded clusters.",
    140: "Embedding vs Referencing: Embedding stores related sub-documents together for single-read retrieval.",
    141: "MySQL Cursor properties: Read-only, Non-scrollable, and Asensitive (server may or may not make a temporary copy).",
    142: "Index Rebuild vs Reorganize: REBUILD drops and recreates the index completely. REORGANIZE defragments leaf nodes.",
    146: "SIGNAL statement raises a custom condition/exception in MySQL stored procedures.",
    147: "PRIMARY KEY vs UNIQUE: Table has max 1 PK (no NULLs allowed). Table can have multiple UNIQUE keys (NULLs handled differently)."
}

# Enrich questions
for q in questions:
    num = q["num"]
    q["highYield"] = num in high_yield_nums
    q["examTip"] = exam_tips.get(num, "Master the exact definitions and standard SQL syntax. Remember that keywords and execution order are heavily tested in CCME.")
    
    # Topic assignment
    if 1 <= num <= 5:
        q["topic"] = "ER Modeling & Attributes"
    elif 6 <= num <= 10:
        q["topic"] = "SQL Classification (DDL/DML)"
    elif 11 <= num <= 23:
        q["topic"] = "Constraints & Filtering (WHERE/HAVING/NULL)"
    elif 24 <= num <= 27:
        q["topic"] = "Table Modifications (ALTER/UPDATE/DELETE)"
    elif 28 <= num <= 29:
        q["topic"] = "Pattern Matching & Wildcards (LIKE)"
    elif 30 <= num <= 34:
        q["topic"] = "Joins & Cartesian Product"
    elif 35 <= num <= 37:
        q["topic"] = "Set Operators & Sorting (UNION/DISTINCT)"
    elif 38 <= num <= 41:
        q["topic"] = "Database Normalization (1NF to 4NF)"
    elif 42 <= num <= 42:
        q["topic"] = "Referential Integrity"
    elif 43 <= num <= 47:
        q["topic"] = "Transactions & ACID Properties"
    elif 48 <= num <= 50:
        q["topic"] = "Database Objects & Views"
    elif 51 <= num <= 54:
        q["topic"] = "Command Categories & Auto Increment"
    elif 55 <= num <= 56:
        q["topic"] = "Data Types & Temporal Values"
    elif 57 <= num <= 58:
        q["topic"] = "Constraints (DEFAULT & CHECK)"
    elif 59 <= num <= 60:
        q["topic"] = "Indexing & Storage Engines (B+ Trees)"
    elif 61 <= num <= 65:
        q["topic"] = "Functional Dependencies, Keys & BCNF"
    elif 66 <= num <= 69:
        q["topic"] = "Relational Algebra & Set Compatibility"
    elif 70 <= num <= 73:
        q["topic"] = "Aggregates, Grouping & NULL Semantics"
    elif 74 <= num <= 76:
        q["topic"] = "Subqueries (EXISTS, IN, Correlated)"
    elif 77 <= num <= 78:
        q["topic"] = "Common Table Expressions (CTEs)"
    elif 79 <= num <= 83:
        q["topic"] = "Window Functions (ROW_NUMBER, RANK, DENSE_RANK)"
    elif 84 <= num <= 90:
        q["topic"] = "MySQL CLI, Views & Session Temp Tables"
    elif 91 <= num <= 96:
        q["topic"] = "PL/SQL Block Structure & Parameters"
    elif 97 <= num <= 100:
        q["topic"] = "Cursors & Attributes (%ROWCOUNT, %FOUND)"
    elif 101 <= num <= 103:
        q["topic"] = "Procedures, Functions & Packages"
    elif 104 <= num <= 105:
        q["topic"] = "Triggers (:NEW vs :OLD)"
    elif 106 <= num <= 110:
        q["topic"] = "MySQL Stored Programs, SIGNAL & Handlers"
    elif 111 <= num <= 115:
        q["topic"] = "NoSQL & MongoDB Fundamentals (BSON, _id)"
    elif 116 <= num <= 124:
        q["topic"] = "MongoDB CRUD & Update Operators ($set, $inc, $push)"
    elif 125 <= num <= 128:
        q["topic"] = "MongoDB Aggregation Pipeline ($match, $group, $unwind)"
    elif 129 <= num <= 130:
        q["topic"] = "MongoDB Indexes & Collections"
    elif 131 <= num <= 134:
        q["topic"] = "NoSQL Architecture & Horizontal Scaling"
    elif 135 <= num <= 140:
        q["topic"] = "MongoDB Admin, Compass, Transactions & Modeling"
    elif 141 <= num <= 147:
        q["topic"] = "DBT Question Paper Exam Review"
    else:
        q["topic"] = "Database Technologies"

# Save enriched json
with open("all_database_questions.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print(f"Enriched {len(questions)} questions saved to all_database_questions.json")
