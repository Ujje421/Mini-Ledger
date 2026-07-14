# Smart Mini-Ledger (ByteX Fresher Challenge)

## Application: Junior Full Stack Engineer

Welcome to my submission for the ByteX Fresher Challenge! This is a full-stack, lightweight personal finance ledger built to demonstrate strong engineering fundamentals, cloud-native architecture, and effective human-AI collaboration.

### 🌟 The Unique Twist: "Ask Your Ledger"
While a standard CRUD ledger is great, I wanted to build something that genuinely helps users understand their finances. 

I integrated the **Gemini 2.5 AI Model** directly into the frontend as a conversational interface. Users can ask questions like *"What was my biggest expense this month?"* or *"How much did I spend on food?"*. 
To make this performant and keep API costs low, I implemented **Redis caching** for the dashboard summaries, ensuring the DB isn't hammered on every page load.

---

### 🤖 AI-Driven Engineering (The Co-Pilot Experience)

For this project, I heavily utilized **AI (via Antigravity IDE)** as my co-pilot. 

#### How AI Accelerated My Work:
- **Rapid Scaffolding:** I used AI to instantly generate the Next.js `package.json`, Tailwind configuration, and FastAPI `Dockerfile` / `docker-compose.yml`. What usually takes an hour of wiring took less than 5 minutes.
- **UI Prototyping:** I provided a UI mockup image to the AI, and it rapidly converted the design into Tailwind CSS utility classes, allowing me to focus on state management instead of CSS grids.

#### Where AI Fell Short & How Human Judgment Fixed It:
While the AI was incredibly fast at writing boilerplate, it made several classic "junior" mistakes that would cause catastrophic failures in a production FinTech environment. Here is how my engineering judgment corrected the AI's output:

1. **Floating-Point Financial Errors:**
   * **AI Output:** Defined the transaction amount as a `float` in the SQLModel/Pydantic schema.
   * **My Fix:** In finance, `float` causes precision loss (e.g., `0.1 + 0.2 = 0.30000000000000004`). I refactored the models to use Python's `Decimal` type mapped to PostgreSQL's `NUMERIC(10,2)`.

2. **OOM Scaling Bottlenecks (Python vs SQL):**
   * **AI Output:** For the dashboard summary, the AI wrote a query to fetch *every single transaction* into Python memory using `.all()` and then used a Python loop to calculate the sums. 
   * **My Fix:** This would cause Out-Of-Memory (OOM) crashes as user data grew. I pushed the computation down to the database layer, rewriting the endpoint to use proper `func.sum()` SQL aggregations.

3. **Unhandled Infrastructure Failures:**
   * **AI Output:** Implemented Redis caching, but simply wrote `redis_client.delete("summary")` when a new transaction was added. 
   * **My Fix:** If the Redis container goes down, this would throw a fatal 500 error, preventing users from saving transactions! I added a try-except block to gracefully catch `redis.exceptions.RedisError`, allowing the core ledger to function even if the caching layer is degraded.

4. **Docker Module Import Crashes:**
   * **AI Output:** Used relative imports (`from .database import engine`) in the backend `main.py` entry point, which caused the FastAPI Docker container to crash on startup.
   * **My Fix:** I debugged the container logs, identified the `ImportError`, and refactored the codebase to use absolute module imports compliant with Uvicorn's execution context.

---

### 🛠️ Tech Stack
- **Frontend:** Next.js 14, React (TypeScript), Tailwind CSS
- **Backend:** Python (FastAPI), SQLModel, Pydantic
- **Database:** PostgreSQL (Primary), Redis (Caching)
- **Infrastructure:** Docker & Docker Compose
- **AI:** Google Gemini 2.5 Flash

### 🚀 Running the Project
```bash
# Set your API Key
echo "GEMINI_API_KEY=your_key_here" > .env

# Spin up Postgres, Redis, FastAPI, and Next.js
docker-compose up -d --build
```
- **Dashboard:** `http://localhost:3000`
- **API Docs:** `http://localhost:8000/docs`
