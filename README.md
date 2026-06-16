# GitHub Profile Analyzer API

A robust backend REST API built with Node.js and Express that analyzes GitHub user profiles. It fetches real-time public data using the GitHub API, computes valuable repository insights (like total stars and most-used languages), and stores the analyzed data in a MySQL database for fast, reliable retrieval.

---

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL
* **ORM:** Prisma
* **External API:** GitHub Public API

---

## Features

* **Automated Profile Analysis:** Fetches a user's standard metrics (repos, followers, following) directly from GitHub.
* **Repository Deep Dive:** Iterates through a user's public repositories to calculate their **Total Star Count** and determine their **Top Programming Language**.
* **Smart Upsert Storage:** Saves analyzed profiles to MySQL. If a profile is analyzed again, the database automatically updates the existing record and refreshes the `analyzed_at` timestamp rather than duplicating data.
* **Cached Retrieval:** Fetches lists and individual profiles directly from the MySQL database without hitting GitHub's rate limits.

---

## Local Setup Instructions

Follow these steps to run the application on your local machine.

### 1. Prerequisites
* Node.js (v18 or higher recommended)
* A running instance of MySQL

### 2. Clone the Repository
```bash
git clone <your-github-repo-url>
cd <your-repo-folder-name>
npm install

DATABASE_URL="mysql://root:password@localhost:3306/github_analyzer"

npx prisma migrate dev
npx prisma generate
npm run dev
```



## Database Schema

The application uses the following database structure to store profile insights. 

| Column | Type | Attributes |
| :--- | :--- | :--- |
| `id` | Int | `@id @default(autoincrement())` |
| `username` | String | `@unique` |
| `bio` | String | |
| `public_repos` | Int | |
| `followers` | Int | |
| `following` | Int | |
| `total_stars` | Int | Computed from all public repos |
| `top_language` | String? | Most frequently used language |
| `analyzed_at` | DateTime | `@default(now()) @updatedAt` |

*(Note: The full Prisma schema file is located at `prisma/schema.prisma`)*

