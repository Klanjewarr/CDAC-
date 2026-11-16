import re
import json

raw_file = "raw_question_bank.txt"

with open(raw_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

questions = []
current_section = "Section A – Database Fundamentals, ER Model and SQL Basics"

# Regex patterns
section_pattern = re.compile(r"^(Section\s+[A-F]\s*–\s*.*)")
q_start_pattern = re.compile(r"^(\d+)\.\s+(.*)")
opt_pattern = re.compile(r"^([A-D])\)\s+(.*)")
ans_pattern = re.compile(r"^Correct Answer:\s*([A-D])\)?\s*(.*)", re.IGNORECASE)
exp_pattern = re.compile(r"^Explanation:\s*(.*)", re.IGNORECASE)

i = 0
n = len(lines)

while i < n:
    line = lines[i].strip()
    
    # Check section header
    sec_match = section_pattern.match(line)
    if sec_match:
        current_section = sec_match.group(1).strip()
        i += 1
        continue
    
    # Check question start
    q_match = q_start_pattern.match(line)
    if q_match:
        q_num = int(q_match.group(1))
        q_text = q_match.group(2).strip()
        
        # Collect multi-line question text if any until option A
        i += 1
        while i < n and not opt_pattern.match(lines[i].strip()):
            if lines[i].strip():
                q_text += " " + lines[i].strip()
            i += 1
        
        options = {}
        # Collect options A, B, C, D
        while i < n and opt_pattern.match(lines[i].strip()):
            o_m = opt_pattern.match(lines[i].strip())
            opt_letter = o_m.group(1)
            opt_text = o_m.group(2).strip()
            options[opt_letter] = opt_text
            i += 1
        
        correct_ans = ""
        # Check Correct Answer
        while i < n and not ans_pattern.match(lines[i].strip()):
            i += 1
        if i < n and ans_pattern.match(lines[i].strip()):
            ans_m = ans_pattern.match(lines[i].strip())
            correct_ans = ans_m.group(1).upper()
            i += 1
        
        # Check Explanation
        explanation = ""
        while i < n and not exp_pattern.match(lines[i].strip()):
            # If we hit next question, break
            if q_start_pattern.match(lines[i].strip()) or section_pattern.match(lines[i].strip()):
                break
            i += 1
        
        if i < n and exp_pattern.match(lines[i].strip()):
            exp_m = exp_pattern.match(lines[i].strip())
            explanation = exp_m.group(1).strip()
            i += 1
            # Multi-line explanation
            while i < n and not q_start_pattern.match(lines[i].strip()) and not section_pattern.match(lines[i].strip()):
                if lines[i].strip():
                    explanation += " " + lines[i].strip()
                i += 1
        
        questions.append({
            "num": q_num,
            "section": current_section,
            "question": q_text,
            "options": options,
            "correctAnswer": correct_ans,
            "correctExplanation": explanation
        })
    else:
        i += 1

print(f"Total parsed questions: {len(questions)}")
assert len(questions) == 147, f"Expected 147, got {len(questions)}"

# Verify all have 4 options and valid answer
for q in questions:
    assert len(q["options"]) == 4, f"Q{q['num']} does not have 4 options: {q['options']}"
    assert q["correctAnswer"] in ["A", "B", "C", "D"], f"Q{q['num']} invalid answer: {q['correctAnswer']}"
    assert len(q["correctExplanation"]) > 10, f"Q{q['num']} short explanation"

print("All 147 questions verified with 4 options and valid answers!")

with open("parsed_database_questions.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print("Saved to parsed_database_questions.json")
