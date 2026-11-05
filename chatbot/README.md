# MLRIT College AI Chatbot

A production-ready AI-powered chatbot for MLR Institute of Technology (MLRIT) built with **FastAPI**, **LangChain**, **ChromaDB**, and **Groq**. Uses hybrid Retrieval-Augmented Generation (BM25 + vector search, cross-encoder re-ranked) to answer questions from college PDF documents and built-in knowledge.

---

## Features

- **Hybrid RAG Pipeline** — Combines BM25 keyword search with ChromaDB vector search, then re-ranks with a cross-encoder
- **Department-Aware Retrieval** — every department-scoped query is filtered to that department's own indexed chunks only, with no cross-department fallback; if a department has no indexed content, the assistant says so instead of guessing (see `vector_store.py` / `hybrid_retriever.py`)
- **Website Knowledge Orchestrator** (`website_content.py`) — extracts and summarizes the Next.js site's own real content (admissions, placements, scholarships, hostel, cafeteria, sports, transport, research, innovation, IQAC, fees, and more) via a single direct LLM call, ahead of PDF retrieval
- **Structured Knowledge** (`structured_topics.py`) — hand-authored, zero-LLM answers for college-wide topics with no single source page (academics overview, campus facilities, accreditation/autonomy status, attendance policy, alumni, etc.)
- **Scenario/Advisory Guidance** (`scenario_intent.py`) — reasoned, conversational answers for open-ended questions (branch selection, interest-based department recommendations, rank guidance, "is MLRIT good?") instead of RAG lookups
- **Context Memory & Multi-Turn Conversations** — tracks the department/topic a conversation is about across an arbitrarily long chain of bare follow-ups ("Tell me about ECE" → "Faculty" → "Labs" → "Placements")
- **Multi-Question Handling** — detects and independently answers genuinely multi-part messages (e.g. "I got 25000 rank. Can I get CSE? What is the fee?"), deduplicating near-identical sub-answers
- **Faculty, Administration & Labs Directories** (`indexes/faculty_index.py`, `administration_directory.py`, `labs_directory.py`) — HOD, faculty, Principal/Chairman/Vice&nbsp;Chairman/Secretary/Dean, and per-department lab lookups parsed directly from the website's own source files at startup, never from the LLM
- **Intelligent Query Routing** (`query_router.py`) — classifies queries as navigation, department-specific, or general, and declines clearly off-topic requests before they ever reach retrieval
- **College-Specific Guardrails** — never fabricates a figure or policy that isn't officially published; low-confidence/empty-retrieval results get an honest "I couldn't find official information" instead of a guess
- **Groq (Llama 3.1)** — Fast, low-latency responses powered by Groq's inference API, with graceful degradation on provider rate limits
- **Incremental Indexing** — Only re-embeds PDFs that changed, tracked via `index_manifest.json`
- **Website Navigation** — Detects navigation intent and returns direct page links / smart action buttons
- **Session Memory** — Maintains conversation context per user session
- **Source Citations** — Shows which PDF documents (or directory/website source) were used to generate answers
- **Mobile Responsive** — Full-screen chat on mobile devices
- **Docker Ready** — Single `docker-compose up` deployment for local/alternative hosting; production runs on AWS EC2 (see the root `README.md`'s Deployment section)

---

## Prerequisites

- Python 3.11 or higher
- pip (Python package manager)
- A Groq API key ([get one here](https://console.groq.com/keys))

---

## Installation

### 1. Move into the chatbot folder
```bash
cd chatbot
```

### 2. Create a virtual environment (recommended)
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and set your Groq API key:
```
GROQ_API_KEY=your_actual_api_key_here
```

---

## Adding PDFs

Place PDF files in the `pdfs/` directory before starting the server:

```
chatbot-implementation/
  pdfs/
    CSE_Department_Profile.pdf
    ECE_Overview.pdf
    Admissions_Guide_2024.pdf
    Placement_Brochure.pdf
```

**Naming tip:** Include the department name in the filename (e.g., `CSE_`, `ECE_`, `Mechanical_`) so the system can automatically tag documents by department.

PDFs are indexed automatically on first startup. After adding new PDFs while the server is running, call `POST /reindex`.

---

## Running the Server

```bash
python main.py
```

The server starts at `http://0.0.0.0:8001`.

- API docs: `http://localhost:8001/docs`
- Health check: `http://localhost:8001/health`

---

## API Endpoints

### `POST /chat`
Send a message and receive an AI response.

**Request body:**
```json
{
  "message": "Tell me about CSE department placements",
  "session_id": "user-uuid-here",
  "conversation_history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi! How can I help?"}
  ]
}
```

**Response:**
```json
{
  "answer": "The CSE department at MLRIT has an excellent placement record...",
  "sources": [
    {
      "file": "CSE_Department_Profile.pdf",
      "page": 3,
      "department": "CSE",
      "snippet": "The department achieved 98% placement..."
    }
  ],
  "navigation_target": null,
  "navigation_url": null,
  "confidence": 0.8,
  "query_type": "department",
  "session_id": "user-uuid-here"
}
```

### `POST /reindex`
Re-process all PDFs and rebuild the vector store.

**Response:**
```json
{
  "success": true,
  "message": "Successfully reindexed 245 document chunks.",
  "chunk_count": 245
}
```

### `GET /health`
Returns server status, PDF count, and vector store statistics.

**Response:**
```json
{
  "status": "healthy",
  "pdf_count": 5,
  "vector_count": 245,
  "pdf_dir": "./pdfs",
  "chroma_dir": "./chroma_db",
  "uptime_seconds": 3600.5
}
```

### `GET /routes`
Returns all configured website navigation routes.

---

## Frontend Integration

The chatbot is integrated natively as a React component — `components/Chatbot.tsx`, mounted globally in `app/layout.tsx`. There is no standalone JS widget or static bundle to embed elsewhere.

In production the widget calls `/chatbot-api/chat` on the site's own origin, and nginx forwards it to this service on the same server (`deploy/nginx/chatbot.conf`). Locally it talks to `http://127.0.0.1:8001` directly. Set `NEXT_PUBLIC_CHATBOT_URL` to override either.

## Running on the EC2 server

The service runs under systemd (`mlrit-chatbot`) in a virtualenv at `/home/ubuntu/chatbot-venv`, listening on localhost only. `deploy/chatbot/setup.sh` creates all of it once; every deploy then runs `deploy/chatbot/update.sh`, which restarts it onto the new site files (it reads the site's own source) and reinstalls packages only if `requirements.txt` changed.

The Groq key goes in `/home/ubuntu/mlrit-chatbot.env` (mode 600) as `GROQ_API_KEY=...`, never in the repo. The search index is built from `pdfs/` on first start and kept in `/home/ubuntu/chatbot-data/`.

Useful commands: `sudo systemctl status mlrit-chatbot`, `journalctl -u mlrit-chatbot -n 100`, `curl http://127.0.0.1:8001/health`.

---

## Docker Usage

### Build and run with Docker Compose
```bash
docker-compose up -d
```

### Stop
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f chatbot
```

PDFs and the ChromaDB database are persisted via Docker volumes, so data survives container restarts.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GROQ_API_KEY` | *(required)* | Groq API key |
| `CHROMA_PERSIST_DIR` | `./chroma_db` | ChromaDB storage directory |
| `PDF_DIR` | `./pdfs` | Directory containing PDF documents |
| `BM25_INDEX_PATH` | `<CHROMA_PERSIST_DIR>/bm25_index.pkl` | BM25 keyword index location |
| `INDEX_MANIFEST_PATH` | `<CHROMA_PERSIST_DIR>/index_manifest.json` | Incremental indexing manifest |
| `RERANK_MODEL` | `cross-encoder/ms-marco-MiniLM-L-6-v2` | Cross-encoder re-ranking model |
| `HOST` | `0.0.0.0` | Server bind address |
| `PORT` | `8001` | Server port |
| `CORS_ORIGINS` | `*` | Allowed CORS origins (comma-separated) |

---

## Project Structure

```
chatbot/
├── main.py                      # FastAPI application entry point
├── chatbot.py                   # Main orchestrator (CollegeAssistant) — the intent pipeline
├── rag_engine.py                # RAG pipeline with Groq LLM
├── hybrid_retriever.py          # BM25 + vector hybrid retrieval, cross-encoder re-ranking
├── vector_store.py              # ChromaDB vector store management
├── query_router.py              # Query classification, navigation/department keyword routing
├── website_content.py           # Website Knowledge Orchestrator — summarizes real site content
├── structured_topics.py         # Structured Knowledge — hand-authored college-wide answers
├── scenario_intent.py           # Scenario/advisory guidance (recommendations, rank guidance, ...)
├── administration_directory.py  # Principal/Chairman/Dean/Secretary lookups
├── labs_directory.py            # Laboratory information lookups
├── text_normalize.py            # Shared keyword normalization (plural/singular, prefix-stripping)
├── pdf_processor.py             # PDF scanning, extraction, chunking, department tagging
├── index_manifest.py            # Incremental indexing manifest tracking
├── config.py                    # Configuration and constants
├── requirements.txt             # Python dependencies
├── .env                         # Environment variables (not committed)
├── .env.example                 # Environment template
├── Dockerfile                   # Docker image definition
├── docker-compose.yml           # Docker Compose configuration
├── pdfs/                        # Department PDFs (knowledge base source)
└── chroma_db/                   # ChromaDB + BM25 persistent storage (auto-created, not committed)
```

See the root `README.md`'s **Current Limitations** section for known gaps (PDF-dependent department coverage, typo tolerance, etc.).

---

## Troubleshooting

**`ModuleNotFoundError`**
Run `pip install -r requirements.txt` inside the virtual environment.

**`GROQ_API_KEY not set` or authentication errors**
Ensure `.env` exists and contains a valid `GROQ_API_KEY`.

**Port 8001 already in use**
Change `PORT=8002` in `.env` and update `apiUrl` in the frontend config.

**No PDFs indexed / empty responses**
- Place PDFs in the `pdfs/` folder
- Restart the server or call `POST /reindex`
- Check server logs for PDF extraction errors

**CORS errors in browser**
Set `CORS_ORIGINS=*` in `.env` for development, or specify your domain for production.

**Slow first response**
The first request loads the embedding model. Subsequent requests are significantly faster.

---

## License

MIT License — free to use and modify for MLRIT website integration.
