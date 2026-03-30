# Religions Map

A time-based interactive map showing historical territories and their religions across history. Users scrub through time and see colored polygons for each entity's main religion — powered by an AI agent that researches and generates historical data automatically.

> **Catholic** is defined as: majority of population is Catholic, or Catholicism is the official religion.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend/Backend | Next.js 16.2 (App Router, TypeScript) |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma 7.5 |
| Validation | Zod 4.3.6 |
| AI Agent | Python + FastAPI + LangGraph |
| LLM | Groq (llama-3.3-70b-versatile) |
| Search | Tavily |
| GeoJSON | Natural Earth dataset |

---

## Architecture Overview

The project is a **monorepo** with two independent services:

```
catholic-map-ai/
  web/      ← Next.js API + future frontend
  agent/    ← Python AI agent (FastAPI + LangGraph)
```

### How it works

1. The user requests data for a specific year (e.g., 800 AD)
2. The **AI agent** searches the web for historical entities, religions, and territories
3. The agent saves structured data to the database via the **Next.js API**
4. The frontend queries the API and renders colored polygons on the map

### Agent Pipeline

```
entity_node → religion_node → territory_node → boundaries_node → entity_territories_node → result_node
```

Each node is a LangGraph step that searches, reasons, and saves data progressively.

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.11+
- uv (Python package manager)
- A Supabase account (free tier)
- A Groq API key (free tier)
- A Tavily API key (free tier)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/catholic-map-ai.git
cd catholic-map-ai
```

### 2. Set up the Next.js API
```bash
cd web
npm install
```

Create `web/.env`:
```
DATABASE_URL=your_supabase_connection_string
```

Run database migrations:
```bash
npx prisma migrate deploy
```

Start the server:
```bash
npm run dev   # runs on port 3000
```

### 3. Set up the Python agent
```bash
cd agent
uv sync
```

Create `agent/.env`:
```
GROQ_API_KEY=your_groq_key
TAVILY_API_KEY=your_tavily_key
NEXT_API_URL=http://localhost:3000/api
```

Download the GeoJSON dataset:
```bash
mkdir data
curl -o data/countries.geojson https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson
```

Seed modern territories (run once):
```bash
uv run python -m scripts.seed_territories
```

Start the agent:
```bash
uv run uvicorn main:app --reload   # runs on port 8000
```

### 4. Generate historical data
```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"year": 800}'
```

---

## Project Status

| Feature | Status |
|---|---|
| Next.js API (entities, religions, territories) | ✅ Done |
| AI agent pipeline (LangGraph) | ✅ Done |
| Territory seeding script | ✅ Done |
| Frontend map with time scrubber | 🔲 Planned |
| Catholic color logic | 🔲 Planned |
| GeoJSON lazy loading | 🔲 Planned |
| LangGraph error retry logic | 🔲 Planned |

---

## Contributing

Contributions are welcome. Please open an issue before submitting a pull request so we can discuss the change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: your feature"`
4. Push and open a pull request

---

## License

MIT
