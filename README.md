# Smart Mini-Ledger

## 1. Overview
Smart Mini-Ledger is a lightweight, full-stack personal finance application. It allows users to add, view, and categorize transactions (income/expense), and view a summarized financial dashboard. It also features a unique "Ask Your Ledger" AI assistant that lets users query their own transaction data using natural language, backed by Gemini.

## 2. Architecture
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: Python FastAPI, SQLModel.
- **Database**: PostgreSQL for persistent transaction storage.
- **Cache**: Redis for caching the summary dashboard endpoint.
- **AI Integration**: Google Gemini API via `google-generativeai` SDK.
- **Infrastructure**: Docker & `docker-compose` for orchestration.

## 3. Setup instructions
1. Clone the repository and navigate to the root directory.
2. Create a `.env` file in the root based on `.env.example`:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Access the frontend at `http://localhost:3000` and the backend API docs at `http://localhost:8000/docs`.

## 4. AI Tools Used
- **Antigravity (Gemini 3.1 Pro)** was used extensively to scaffold the project structure.
- **Code Generation**: I used the AI to rapidly generate the Next.js component shells (`Sidebar`, `SummaryCards`, `TransactionList`, `AskLedgerPanel`), complete with Tailwind classes for styling that match the provided reference aesthetic (slate and blue accents).
- **Backend Logic**: The AI scaffolded the FastAPI routing, SQLModel definitions, and Redis caching logic.

## 5. Where AI Fell Short
- **Naive RAG Prompting**: Initially, the AI's default approach to "Ask Your Ledger" might be to just dump the entire `transactions` table directly into the context window. I had to explicitly structure the backend to fetch only the necessary columns (formatting them concisely as a JSON list of objects without unnecessary ORM metadata) to prevent token limits from being hit as the dataset grows.
- **Database Initialization**: The AI suggested using `SQLModel.metadata.create_all(engine)` on startup. While acceptable for a small prototype, it skips proper migration tracking (Alembic). I had to accept this trade-off for speed but noted it as a limitation compared to a production environment.
- **Error Handling**: The AI often wrote happy-path code (e.g., assuming Redis is always available). I added `try-except` blocks around Redis caching to ensure the dashboard still loads if the Redis container fails.
- **CLI Commands in Windows**: When asked to create directories, the AI used Linux-style `mkdir a b` which failed in Windows PowerShell. It had to fallback to using its file-writing tools directly to create the component directories.

## 6. The Unique Twist: "Ask Your Ledger"
Instead of a generic AI chatbot, this application implements a scoped RAG (Retrieval-Augmented Generation) pattern. When a user asks a question, the backend retrieves their actual transaction history, formats it compactly, and sends it to the Gemini API as context. 

Crucially, the UI displays both the natural language answer **and the raw data** (the underlying numbers) used to generate that answer. This grounds the response and mitigates hallucination risk, which is absolutely critical for financial data where users must be able to verify the AI's math.

## 7. What I'd Do With More Time
1. **Proper Authentication**: Implement NextAuth.js and JWTs to support multiple users with isolated ledgers.
2. **Robust Migrations**: Set up Alembic properly to handle schema evolutions over time instead of creating tables on startup.
3. **Advanced RAG filtering**: Instead of dumping all transactions into the prompt, implement an LLM-driven query planner that extracts date ranges and categories from the user's question, uses those to query Postgres, and *then* feeds the reduced subset to the final generation prompt.
4. **Pagination**: Implement cursor-based pagination for the transactions list and summary caching strategies that invalidate only specific user keys.
