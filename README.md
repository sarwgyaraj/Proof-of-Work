# Proof of Work (PoW) — Technical Talent Discovery Platform

> A technical talent discovery platform designed for the Indian software engineering recruitment market, connecting forward-thinking tech employers with developers through verified coding platform metrics, real production code evidence, and practical skill challenges.

---

## 🚀 Key Features

1. **Proof-of-Work Candidate Dashboard**
   - Candidate identity, percentile ranks, and real-time PoW skill scoring (out of 1000).
   - LocalStorage-persisted profile editing, visibility controls, and activity feeds.

2. **Connected Coding Profiles**
   - **Codeforces**: Official public API integration for live contest rankings, ratings, and contest history.
   - **GitHub**: Public API integration for repositories, stars, and contribution metrics.
   - **LeetCode & GeeksforGeeks**: Transparently labeled demo statistics and contest badges.

3. **Demonstrated Project Showcase**
   - Verified project cards featuring GitHub source links, live demo deployments, and automated testing benchmarks.
   - Interactive project submission form with simulated verification pipelines.

4. **Employer Hiring Hub & Talent Discovery**
   - Filter candidates by primary languages (Java, TypeScript, C++, Python, SQL), minimum PoW scores, and competitive ratings.
   - One-click talent shortlisting persisted across browser sessions.
   - Direct interview proposal workflow.

5. **Skill Challenges & Assessments**
   - Hands-on engineering benchmarks (Concurrent Java systems, Distributed Redis caching, Event streaming).
   - Submission evaluation with simulated verification labeling.

6. **Identity & Academic Verification**
   - **LinkedIn OpenID Connect (OIDC)**: Architecture-ready connection interface adhering to zero-scraping policies.
   - **Vedam & Institutional Email Verification**: Independent verification tier for `.ac.in` and `.edu` campus credentials.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Tooling & Bundler**: Vite 6
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **State & Storage**: React Context API, LocalStorage
- **External APIs**: Codeforces API, GitHub REST API

---

## 📋 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository (once pushed to GitHub)
git clone https://github.com/<your-username>/proof-of-work.git
cd proof-of-work

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Compile and bundle assets for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🔑 Demo Accounts (Live Pitch)

The application provides instant pre-fills on the login screen for testing and demonstration:

- **Candidate Persona**:
  - Email: `candidate@proofwork.demo`
  - Password: `demo123`
  - Identity: *Rohan Sharma (IIT Bombay - B.Tech CSE)*
- **Employer Persona**:
  - Email: `employer@proofwork.demo`
  - Password: `demo123`
  - Identity: *Pooja Kulkarni (Nexora Technologies - Bengaluru)*

---

## 🛡️ Privacy & Compliance Notice

- Proof of Work does not scrape external platforms or collect third-party credentials.
- Simulated skill assessments and demo metrics are labeled as demo evaluations.
- All candidate profile edits, challenge progress, and employer shortlists are safely persisted locally via browser `LocalStorage`.

---

## 📄 License

MIT
