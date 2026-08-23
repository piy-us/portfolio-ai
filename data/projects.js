export const PROJECTS = [
  {
    slug: 'ai-sales-platform',
    name: 'AI Sales Platform',
    summary:
      'An enterprise-style conversational sales AI with a multi-agent architecture: query routing, rewriting, RAG retrieval over Azure AI Search, and response synthesis using LangGraph and FastAPI.',
    stack: [
      'FastAPI',
      'LangChain',
      'LangGraph',
      'Azure OpenAI (GPT-5-nano/ GPT-5-mini)',
      'Azure AI Search',
      'Azure CosmosDB',
      'Pydantic',
      'Azure AI Foundry'
    ],
    role: 'Personal Project',
    period: '2026',
    details: `OVERVIEW

An enterprise-style conversational sales AI built with a multi-agent architecture rather than a single prompt loop. It combines RAG over Azure AI Search with persistent per-contact conversation memory in CosmosDB, providing context-aware multi-turn conversations grounded in a knowledge base. Built with FastAPI, LangChain, LangGraph, and Azure services.

KEY FEATURES
- Multi-agent architecture: query routing, rewriting, context sufficiency planning, and response generation.
- RAG via Azure AI Search using hybrid BM25 + vector search.
- Persistent conversation memory in CosmosDB keyed by contact/conversation ID.
- Async/await for database calls, embeddings, and search.
- LLM provider abstraction allows the backing model/provider to be swapped without changing agent or service code.

MULTI-AGENT ORCHESTRATION (LangGraph StateGraph)

1. Conversation Agent routes greetings directly and sends substantive queries for grounding.
2. Query Rewriter uses conversation history to resolve ambiguous follow-ups before retrieval.
3. Azure AI Search retrieves relevant context.
4. Context Planner checks whether the results are sufficient; if not, it triggers another retrieval pass.
5. Response Writer synthesizes the final answer, with optional vision-model support for retrieved images/screenshots.

The loop-until-sufficient design trades some latency for fewer confidently-wrong answers on ambiguous queries.

CORE COMPONENTS

- Chat Service (chat_service.py): manages message history, context building, retrieval, generation, and fallback handling.
- Retrieval Service (retrieval_service.py): creates embeddings and performs hybrid Azure AI Search retrieval with top-k relevance scoring.
- LLM Provider Factory (llm/factory.py): provides a common interface for Azure OpenAI and future providers.
- Query Rewriter (query_rewriter.py): expands user queries using conversation history.
- Query Router (query_router.py): classifies intent and avoids unnecessary retrieval for simple messages.
- AI Search Service (ai_search_service.py): handles Azure Search index and document operations.
- Context Builder (context_builder.py): formats, deduplicates, and token-budgets retrieved context plus conversation history.
- Agent Service (agent_service.py): manages tools, state, recovery/fallbacks, streaming, and structured output.
- Database layer (database/cosmos.py): stores conversation messages and metadata in CosmosDB, partitioned by conversationId with configurable TTL.

API SURFACE

- POST /chat — accepts {contact_id, contact_name, message}, runs routing/retrieval/generation, saves messages, and returns {reply}.
- GET /history/{contact_id} — returns the stored conversation for a contact.
- DELETE /history — clears a contact's conversation; irreversible and should be audited in production.

RAG PIPELINE

Documents are extracted, cleaned, chunked, embedded with Azure OpenAI, and indexed in Azure AI Search with source metadata.

At query time, the message is rewritten using conversation context, embedded, and searched with hybrid BM25 + vector retrieval. Results are ranked, filtered for diversity, and formatted with source attribution within the token budget.

LLM CONFIGURATION & PROMPTING

Uses Azure OpenAI with low temperature (~0.1–0.3) for factual sales responses. The assistant answers from retrieved knowledge, recommends relevant products/services, handles objections, asks clarifying questions, and cites sources instead of inventing answers.

CONVERSATION MEMORY

Conversation history is stored per contact in CosmosDB and reused for query rewriting and context building. Long conversations use a sliding window to keep token usage and cost bounded.

RESILIENCE / ERROR HANDLING

Retrieval failures can fall back to keyword search; LLM failures can return retrieved context; complete failures return a generic fallback. Configuration errors fail fast at startup.

TECHNICAL CHALLENGE

The hardest part was the LangGraph context-sufficiency loop: deciding whether retrieved context is enough to answer or whether another retrieval pass is needed. This adds latency but reduces wrong answers on ambiguous or under-specified queries.`,
    links: {
      repo: 'https://github.com/piy-us/sales_agent',
      live: '',
    },
  },

  {
    slug: 'ai-data-analyst',
    name: 'AI Data Analyst',
    summary:
      'A multi-agent system that automates data analysis from CSV upload through cleaning, statistical analysis, visualization, and insight generation, with human review before execution.',
    stack: [
      'Python',
      'LangGraph',
      'Streamlit',
      'GPT-4',
      'Gemini-2.5',
      'Pandas',
      'NumPy',
      'Matplotlib / Seaborn',
      'Plotly',
    ],
    role: 'Solo developer',
    period: '2024',
    details: `OVERVIEW

An AI-powered end-to-end data analysis system. A user uploads a CSV and specialized agents summarize the data, plan analyses, generate and execute Python code, fix runtime errors, and incorporate human feedback before execution. The reasoning-based workflow adapts to each dataset instead of following a fixed pipeline.

MULTI-AGENT ARCHITECTURE (LangGraph)

- Data Summary Agent — creates a structured summary of dimensions, types, and statistics.
- Task Planning Agent — creates adaptive cleaning, analysis, visualization, and trend-detection plans.
- Human Feedback Agent — lets the user review, approve, or modify plans before code runs.
- Code Generation Agent — converts approved plans into executable Python using Pandas/NumPy and visualization libraries.
- Code Execution Engine — runs scripts and produces cleaned data, analysis results, visualizations, and logs.
- Code Rewriter Agent — diagnoses runtime errors and rewrites failing code before re-execution.

DATA FLOW

CSV upload → data summary → AI task planning → optional human review → code generation → execution → fix/re-execute on errors → compiled results.

SUPPORTED ANALYSIS TASKS

- Data cleaning: missing values, type conversion, outliers, scaling, encoding, duplicates, validation.
- EDA: descriptive statistics, distributions, correlations, relationships, profiling.
- Visualization: histograms, density/scatter/correlation plots, categorical charts, time series, Plotly dashboards.
- Trend/pattern detection: trends, seasonality, anomalies, growth rates, change points, clustering.

INTERFACE

Built with Streamlit as an interactive web app with file upload, real-time agent progress, plan review/approval, and inline visualization display.

WHY MULTI-AGENT RATHER THAN A SINGLE PROMPT

Specialized agents keep each step focused, create checkpoints for human intervention, and provide a dedicated recovery path when generated code fails.

LIMITATIONS

Currently tuned for small-to-medium datasets (roughly under 1GB / 100K rows), CSV input, and single-threaded execution. LLM-generated code can still hallucinate, with the Code Rewriter helping mitigate rather than eliminate that risk.`,
    links: {
      repo: 'https://github.com/piy-us/AI-Data-Analyst',
      live: '',
    },
  },

  {
    slug: 'deep-research-agent',
    name: 'Deep Research Agent',
    summary:
      'A full-stack AI research automation system where LangGraph iteratively generates search queries, extracts and synthesizes web content, and produces a cited markdown report, with a Next.js/React frontend for live progress.',
    stack: [
      'LangGraph',
      'LangChain',
      'Firecrawl API',
      'Google Gemini / Groq / OpenAI / Fireworks AI',
      'Python (asyncio)',
      'Next.js 15',
      'React',
      'TypeScript',
      'Tailwind CSS',
    ],
    role: 'Solo developer (backend + frontend)',
    period: '2025',
    details: `OVERVIEW

An AI research automation system with a Python/LangGraph backend and Next.js/React frontend. It performs iterative research instead of returning a simple list of links: it asks clarifying questions, generates diverse searches, extracts web content with Firecrawl, synthesizes findings, identifies gaps, and optionally researches follow-up directions before producing a cited markdown report.

WORKFLOW GRAPH (LangGraph)

generate_questions → generate_queries → search → process_results → prepare_next_iteration → loop or generate_report.

Breadth controls the number of search queries per iteration (typically 3–10), while depth controls the number of research iterations (typically 1–5).

STATE MANAGEMENT

ResearchState carries the original query, breadth/depth, user follow-ups, current iteration and goal, accumulated learnings/sources, and candidate next directions so later iterations build on earlier research.

KEY CAPABILITIES

- Intelligent query generation with diverse research angles.
- Iterative deepening toward promising directions.
- Structured extraction of learnings, source metadata, and next research directions.
- Multi-source tracking and cross-referencing, including contradictions.
- Cited markdown reports with findings and further-research suggestions.
- Multi-LLM provider support across Gemini, Groq, Fireworks, and OpenAI.
- Real-time progress showing iteration, direction, and executed queries.
- CLI and web UI support for interactive or scripted use.

FRONTEND (Next.js / React / TypeScript)

A Vercel-deployed frontend provides query input, breadth/depth controls, clarification questions, live progress, cited markdown results, source lists, and export options. It communicates with the backend through REST endpoints with WebSocket progress updates.

WHY A GRAPH INSTEAD OF A SINGLE AGENT LOOP

The explicit LangGraph state machine makes breadth/depth iteration and loop-vs-report decisions inspectable and independently testable instead of hiding them inside one long-running agent call.`,
    links: {
      repo: 'https://github.com/piy-us/deep_research_langgraph',
      live: 'https://deepresearch-frontend-eight.vercel.app',
    },
  },

  {
    slug: 'portfolio-ai-assistant',
    name: 'Portfolio AI Assistant',
    summary:
      'An LLM-powered chat widget embedded in this portfolio that answers questions about Piyush using tool-based retrieval instead of a static prompt blob.',
    stack: ['React', 'Vercel Serverless Functions', 'Gemini API', 'Groq API', 'Upstash Redis'],
    role: 'Solo developer',
    period: '2026',
    details: `Built as a self-hosted alternative to a third-party chatbot widget. Uses Gemini/Groq function calling to fetch project and experience details on demand instead of sending the full portfolio in every prompt. Includes IP-based rate limiting and session token caps backed by Upstash Redis to stay within free-tier LLM quotas.`,
    links: {
      repo: '',
      live: '',
    },
  },

  // {
  //   slug: 'another-project',
  //   name: 'Another Project',
  //   summary: 'One or two sentences — this is what the model sees by default.',
  //   stack: ['...'],
  //   role: '...',
  //   period: '...',
  //   details: `Full write-up: what it does, why you built it, the technical
  //   challenges, your specific contribution. Only sent when asked.`,
  //   links: { repo: '', live: '' },
  // },
]

// Lightweight list — safe to include in every system prompt.
export function listProjects() {
  return PROJECTS.map(({ slug, name, summary, stack }) => ({ slug, name, summary, stack }))
}

// Full detail for one project — only called when the model requests it.
export function getProjectDetails(slug) {
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return { error: `No project found with slug "${slug}". Available slugs: ${PROJECTS.map((p) => p.slug).join(', ')}` }
  }

  return project
}