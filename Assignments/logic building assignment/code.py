def prioritize(jobs, hours_available, daily_hours):
    """
    jobs: list of dicts with keys name, effort (int hours), fit (1-10), deadline (days)
    Returns (chosen_jobs, total_effort, total_fit)
    """
    # Earliest deadline first, so we can check deadlines in order
    jobs = sorted(jobs, key=lambda j: j["deadline"])
    n = len(jobs)
    H = hours_available

    # best[i][h] = max fit using the first i jobs with at most h hours
    best = [[0] * (H + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        job = jobs[i - 1]
        for h in range(H + 1):
            best[i][h] = best[i - 1][h]  # skip this job
            if job["effort"] <= h:
                take = best[i - 1][h - job["effort"]] + job["fit"]
                best[i][h] = max(best[i][h], take)  # or take it

    # Backtrack to recover the chosen jobs
    chosen = []
    h = H
    for i in range(n, 0, -1):
        if best[i][h] != best[i - 1][h]:
            chosen.append(jobs[i - 1])
            h -= jobs[i - 1]["effort"]
    chosen.reverse()

    # Deadline check: work through chosen jobs in deadline order
    schedule = []
    time_used = 0
    for job in chosen:
        time_used += job["effort"]
        finish_day = -(-time_used // daily_hours)  # ceiling division
        on_time = finish_day <= job["deadline"]
        schedule.append((job, finish_day, on_time))

    total_effort = sum(j["effort"] for j in chosen)
    total_fit = sum(j["fit"] for j in chosen)
    return schedule, total_effort, total_fit


if __name__ == "__main__":
    jobs = [
        {"name": "Company A - Backend Dev",    "effort": 3, "fit": 9, "deadline": 3},
        {"name": "Company B - Full Stack Dev", "effort": 2, "fit": 7, "deadline": 2},
        {"name": "Company C - Node.js Dev",    "effort": 4, "fit": 8, "deadline": 6},
        {"name": "Company D - MERN Dev",       "effort": 2, "fit": 6, "deadline": 5},
        {"name": "Company E - Backend Intern", "effort": 1, "fit": 4, "deadline": 7},
    ]

    HOURS_AVAILABLE = 8   # total hours this week
    DAILY_HOURS = 2       # hours per day I can spend applying

    schedule, effort, fit = prioritize(jobs, HOURS_AVAILABLE, DAILY_HOURS)

    print("Recommended applications (in order):")
    for job, finish_day, on_time in schedule:
        status = "on time" if on_time else "MISSES DEADLINE"
        print(f"  {job['name']}: effort={job['effort']}h, fit={job['fit']}, "
              f"done by day {finish_day} (deadline day {job['deadline']}) [{status}]")
    print(f"Total effort: {effort}h / {HOURS_AVAILABLE}h")
    print(f"Total fit score: {fit}")

