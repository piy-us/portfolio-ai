# Piyush Priyank — Anime Portfolio + "Ask my AI"

A React portfolio with a Sunset-Sakura anime aesthetic and a built-in agentic-RAG
assistant that answers questions about Piyush and captures recruiter leads.

Two independent apps in one repo:

| Part | Stack | Runs on | Docs |
|------|-------|---------|------|
| **Frontend** | Vite · React 18 · Tailwind · Framer Motion · GSAP · Lenis | static host (Vercel/Netlify) | [docs/FRONTEND.md](docs/FRONTEND.md) |
| **Backend** (`backend/`) | Python · FastAPI · LangGraph · Chroma · Groq/Gemini | container (Cloud Run/Render) | [docs/BACKEND.md](docs/BACKEND.md), [backend/README.md](backend/README.md) |

The frontend talks to the backend only over HTTP/SSE (`VITE_CHAT_API_URL`), so either
can be developed, deployed, or replaced independently.

## Quick start

### Frontend
```bash
npm install
cp .env.example .env          # set VITE_CHAT_API_URL (default http://localhost:8080)
npm run dev                   # http://localhost:5173
```

### Backend (the chatbot)
```bash
cd backend
python -m venv .venv && source .venv/Scripts/activate   # Windows Git Bash
pip install -r requirements.txt
cp .env.example .env          # add free Groq/Gemini keys, SMTP + CallMeBot for the connect action
python ingest/ingest.py       # build the knowledge index (data/chroma) from ingest/sources/
uvicorn app.main:app --reload --port 8080
```

The site works without the backend running — the chat widget just shows a friendly
offline message. Everything else (animations, projects, timeline) is fully static.

## Repo layout
```
├── src/                      # frontend React app  → docs/FRONTEND.md
│   ├── components/           #   sections, chat/, shared building blocks
│   ├── lib/                  #   SmoothScroll (Lenis), gsap singleton
│   ├── data.js               #   ALL portfolio content (edit here)
│   └── skillIcons.jsx        #   skill → logo map
├── backend/                  # Python chatbot     → docs/BACKEND.md
│   ├── app/                  #   FastAPI + LangGraph router graph + RAG
│   └── ingest/sources/       #   the bot's knowledge (markdown you edit)
├── tailwind.config.js        # theme tokens (colors, fonts, animations)
└── docs/                     # design docs for knowledge transfer
```

## Where to change what (cheat sheet)
- **Portfolio text / projects / skills / experience** → [src/data.js](src/data.js)
- **Colors / fonts** → [tailwind.config.js](tailwind.config.js) (then restart `npm run dev`)
- **Reusable styles (gradients, glass, glow)** → [src/index.css](src/index.css)
- **A section's animation** → that component, or the `<Reveal>` props
- **What the chatbot knows** → `backend/ingest/sources/*.md`, then re-run `ingest.py`
- **Chatbot behavior (routing, persona)** → [backend/app/graph/](backend/app/graph/)
