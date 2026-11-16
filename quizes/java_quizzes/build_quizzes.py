import json, re

with open('template_head.html', 'r', encoding='utf-8') as f:
    template_head = f.read()

with open('template_tail.html', 'r', encoding='utf-8') as f:
    template_tail = f.read()

with open('all_parsed_questions.json', 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

# High yield questions: 58 must-know questions representing the 80/20 rule
high_yield_ids = [
    1, 2, 6, 8, 14, 16, 17, 31, 32, 33, 35, 36, 38, 41, 42, 53, 56,
    71, 74, 83, 85, 86, 88, 89, 101, 114, 116, 119, 122, 123, 128, 132,
    135, 136, 145, 146, 147, 150, 162, 166, 167, 172, 176, 179, 186,
    192, 201, 202, 204, 206, 209, 212, 215, 220, 223, 226, 230, 236
]

modules = [
    {
        'filename': 'Quiz_High_Yield_CDAC_Booster.html',
        'title': 'High-Yield CDAC Exam Booster (80/20 Rule)',
        'subtitle': '58 Must-Know Repeat Questions & Traps Across All Topics',
        'q_ids': high_yield_ids
    },
    {
        'filename': 'Quiz_Full_Part_1_Fundamentals_Operators_Loops.html',
        'title': 'Full Bank Part 1: Java Fundamentals, Data Types & Operators',
        'subtitle': 'Questions Q1 to Q30 (All 30 bank questions)',
        'q_ids': list(range(1, 31))
    },
    {
        'filename': 'Quiz_Full_Part_2_Classes_Objects_Static_Memory.html',
        'title': 'Full Bank Part 2: Classes, Objects, Constructors & Static',
        'subtitle': 'Questions Q31 to Q75 (All 44 bank questions)',
        'q_ids': list(range(31, 76))
    },
    {
        'filename': 'Quiz_Full_Part_3_OOP_Inheritance_Polymorphism.html',
        'title': 'Full Bank Part 3: OOP Principles, Inheritance & Relationships',
        'subtitle': 'Questions Q76 to Q115 (All 40 bank questions)',
        'q_ids': list(range(76, 116))
    },
    {
        'filename': 'Quiz_Full_Part_4_Abstract_Interfaces_Java17.html',
        'title': 'Full Bank Part 4: Abstract Classes, Interfaces & Modern Java',
        'subtitle': 'Questions Q116 to Q140 (All 25 bank questions)',
        'q_ids': list(range(116, 141))
    },
    {
        'filename': 'Quiz_Full_Part_5_Strings_Wrappers_Exceptions.html',
        'title': 'Full Bank Part 5: Strings, Wrappers & Exception Handling',
        'subtitle': 'Questions Q141 to Q185 (All 45 bank questions)',
        'q_ids': list(range(141, 186))
    },
    {
        'filename': 'Quiz_Full_Part_6_Collections_Threads_IO_Serialization.html',
        'title': 'Full Bank Part 6: Collections, Threads, File I/O & JDBC',
        'subtitle': 'Questions Q186 to Q241 (All 55 bank questions)',
        'q_ids': list(range(186, 241))
    }
]

for mod in modules:
    q_list = []
    for qid in mod['q_ids']:
        s_qid = str(qid)
        if s_qid in all_qs:
            q_list.append(all_qs[s_qid])
            
    head = template_head
    title = mod['title']
    subtitle = mod['subtitle']
    head = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', head)
    head = re.sub(r'<div class="quiz-title">.*?</div>', f'<div class="quiz-title">{title}</div>', head)
    head = re.sub(r'<div class="quiz-subtitle">.*?</div>', f'<div class="quiz-subtitle">{subtitle}</div>', head)
    
    questions_js = '        const questions = ' + json.dumps(q_list, ensure_ascii=False) + ';\n'
    
    full_html = head + questions_js + template_tail
    
    with open(mod['filename'], 'w', encoding='utf-8') as out:
        out.write(full_html)
    print(f"Generated {mod['filename']} with {len(q_list)} questions.")
