# The "Smart" Mini-Ledger
**Bytex Financial Ltd. - Fresher Challenge Submission**
**Applicant:** Ujjwal Jagtap

Welcome to my submission for the **Junior Full Stack Engineer** role at Bytex. This is a full-stack, lightweight personal finance ledger built to demonstrate strong engineering fundamentals, structured coding, and effective human-AI collaboration.

---
## 🎨 Product Preview

![Smart Mini-Ledger Dashboard](https://github.com/user-attachments/assets/dbe9d328-da51-49d2-94eb-e183623269f5)

## 🌟 The Unique Twists
While a standard CRUD ledger is great, I wanted to build features that showcase a deeper understanding of product engineering:

1. **"Ask Your Ledger" (NLP AI Engine):** I integrated the **Gemini 2.5 AI Model** directly into the frontend as a conversational interface. Users can ask natural language questions like *"What was my biggest expense this month?"*, and the AI calculates it instantly based on their live database context.
2. **Real-time Frontend Analytics Engine:** Instead of just showing a list, I built an O(N) aggregation engine using React's `useMemo`. It instantly parses the user's transaction history to compute dynamic Cash Flow, Top Expense Categories, and Savings Rates with zero latency.
3. **Buttery Smooth SWR Caching:** I architected a global frontend caching layer using **SWR** (Stale-While-Revalidate). Page transitions are instant because they serve from memory cache, and mutations (like adding a transaction) trigger a background revalidation for seamless UI updates.

---

## 🤖 AI-Driven Engineering (The Co-Pilot Experience)

For this project, I utilized AI (specifically **Antigravity IDE / Gemini**) as my co-pilot to accelerate development.

### How AI Accelerated My Work:
- **Rapid Scaffolding:** I used AI to instantly generate the Next.js setup, Tailwind configuration, and the initial FastAPI / Docker boilerplate. What usually takes an hour of wiring took less than 5 minutes.
- **UI Prototyping:** I asked the AI to scaffold out responsive Tailwind CSS components (like the Sidebar and Dashboard Layout), allowing me to focus my time on complex state management and API integration instead of CSS grids.

### Where AI Fell Short & How My Human Judgment Fixed It:
The AI was incredibly fast at writing boilerplate, but it made several "junior" mistakes that required my engineering judgment to fix for a production environment:

1. **Destructive React State Hacks:**
   * **The AI's Mistake:** To refresh the transaction list after adding a new item, the AI hallucinated a hacky `key={refreshKey}` prop to force the entire React component tree to aggressively unmount and remount. This caused terrible UI flickering and destroyed component state.
   * **My Fix:** I removed the hack completely and properly utilized SWR's `mutate()` function. This allowed for optimistic UI updates and seamless background data refreshing without breaking the React lifecycle.

2. **Unacceptable "Mock" Data Architecture:**
   * **The AI's Mistake:** When I asked it to build the Analytics and Settings pages, the AI took the easy way out and hardcoded static mock data into the React components to make it *look* finished.
   * **My Fix:** I knew this was unacceptable for a FinTech MVP. I deleted the mock data and engineered a proper PostgreSQL `Settings` table, complete with FastAPI endpoints (`GET /settings`, `PUT /settings`). For the analytics, I built a dynamic calculation engine on the frontend that parses actual transaction arrays to generate real, mathematically accurate metrics.

3. **JSX Syntax Errors & Build Failures:**
   * **The AI's Mistake:** When refactoring the Sidebar for mobile responsiveness, the AI forgot to close a core `</div>` wrapper, which completely broke the Next.js compilation with cryptic JSX syntax errors.
   * **My Fix:** I manually debugged the React component tree, traced the missing fragment closures, fixed the JSX, and successfully restored the build pipeline.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, React (TypeScript), Tailwind CSS, SWR
- **Backend:** Python (FastAPI), SQLModel, Pydantic
- **Database:** PostgreSQL (Primary), Redis (Caching)
- **Infrastructure:** Docker & Docker Compose
- **AI:** Google Gemini 2.5 Flash

---

## 🚀 Running the Project

```bash
# 1. Set your API Key (for the Ask Ledger feature)
echo "GEMINI_API_KEY=your_key_here" > .env

# 2. Spin up Postgres, Redis, FastAPI, and Next.js
docker-compose up -d --build
```
- **Frontend Dashboard:** `http://localhost:3000`
- **FastAPI Swagger Docs:** `http://localhost:8000/docs`

---

## 🗺️ Production Roadmap (Phases)

While this submission represents a robust MVP, my vision for this product extends further:

* **Phase 1 (Completed):** Core CRUD, AI NLP integration, SWR caching, Dockerized architecture.
* **Phase 2 (Immediate Next Steps):** Implement NextAuth.js for secure user authentication (OAuth), add `user_id` relations to PostgreSQL, and implement Row-Level Security (RLS).
* **Phase 3:** Introduce infinite scrolling/pagination for large transaction histories, and add a background worker queue (Celery + Redis) for CSV/PDF report generation.
* **Phase 4:** Migrate from Docker Compose to AWS/Kubernetes for auto-scaling, and implement GitHub Actions for automated CI/CD pipelines.
