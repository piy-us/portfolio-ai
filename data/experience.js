// `summary` is cheap and always visible via listExperience(); `details` is
// the full narrative, only fetched on demand via get_work_experience.
//
// Note on dates: TCS overall start date (Apr 2025) is known precisely, but
// exact month ranges for each individual project weren't provided, so these
// are labeled relatively (current / previous / first project) rather than
// with invented dates — update with real month ranges if you want them shown.

export const EXPERIENCE = [
  {
    slug: 'tataplay-frontend',
    company: 'TCS — TataPlay',
    title: 'Frontend Developer (React Native)',
    period: 'Current project',
    summary:
      'Frontend development on the TataPlay consumer app (mSales and mService), building features based on business requirements and CRs.',
    details: `Piyush's current project at TCS. He works as a frontend
developer on the TataPlay consumer app, specifically on the mSales and
mService apps, building and shipping features driven by business
requirements and change requests (CRs) from the client.

Tech stack: React, React Native, Redux for state management, GraphQL for
API integration, Node.js, Git for version control, and AWS CloudWatch for
monitoring/observability in production. This is his most recent focus area
— after starting in cloud security and then GenAI, he moved into frontend
and now ships in it daily on a production consumer app. The portfolio site
this chatbot lives on (React, Vite, Tailwind, Framer Motion) is a personal
example of the same frontend skillset.`,
  },
  {
    slug: 'genai-bfsi',
    company: 'TCS — BFSI UK-1',
    title: 'GenAI / AI Engineer',
    period: 'Previous project',
    summary:
      'Designed and shipped demo-to-pilot Generative AI applications for a BFSI (banking/financial services) client, based on client requirements.',
    details: `Piyush's most substantial engineering experience and the
project before his current TataPlay role. He built AI proofs-of-concept and
pilot solutions tailored to real business requirements for a BFSI client,
then hardened the strongest ones for secure production use on Azure.

Flagship: a multi-agent GitLab Sales Assistant built with LangGraph,
LangChain, and Azure AI Foundry that helps sales teams understand a
client's DevOps challenges and recommend relevant GitLab solutions.
Multi-agent design — an intent router, a query-rewriter that pulls context
from conversation history, a context planner that checks retrieval
sufficiency and can re-query, and a response writer that grounds answers
strictly in retrieved product data. This work is documented in depth as the
"AI Sales Platform & Sales Agent" project, which is the productionized
version of this flagship deliverable.

He also built a multimodal RAG system on Azure AI Search, integrating
GitLab documentation, internal PowerPoint decks, and scraped web knowledge
into a single retrieval system — using hybrid retrieval (BM25 + vector
similarity) plus reranking and a web-search fallback for accuracy and
coverage, with ingestion/indexing pipelines on Azure Blob Storage and Azure
Cosmos DB for knowledge management and conversational memory.

Production hardening included PII masking before any data reached the
models, deployment inside a secure Azure VNet with private endpoints, and
latency reduction by running retrieval, web search, and agent steps in
parallel instead of sequentially.

Related: he also collaborated on an Agentic AI solution integrated with
ServiceNow for Nationwide Building Society, automating incident analysis
and knowledge retrieval using RAG on Azure to help technical teams resolve
tickets faster.

Stack: LangGraph, LangChain, Azure AI Foundry, Azure AI Search, Azure
Cosmos DB, Azure Blob Storage, FastAPI, Python.`,
  },
  {
    slug: 'cloud-security-tatasteel',
    company: 'TCS — Tata Steel UK',
    title: 'Cloud Security & Monitoring Engineer',
    period: 'First project',
    summary:
      'GCP cloud security posture monitoring and incident triage supporting an enterprise cloud migration for Tata Steel UK.',
    details: `Piyush's first project at TCS, straight out of college, joining
in April 2025. He supported an enterprise cloud migration for Tata Steel
UK, monitoring cloud security posture and vulnerabilities using Google
Cloud Security Command Center (SCC).

He performed alert triage and vulnerability assessment on production cloud
environments, and raised and managed ServiceNow incidents for
high-severity findings, coordinating with engineering teams on incident
response and remediation.

It's not the flashy part of his CV, but it's where he learned to read
large systems carefully and work inside enterprise security and compliance
constraints — context that later made his GenAI production deployments
(PII masking, secure VNets) second nature.

Stack: Google Cloud Platform (GCP), Google Cloud Security Command Center
(SCC), ServiceNow.`,
  },
]

export function listExperience() {
  return EXPERIENCE.map(({ slug, company, title, period, summary }) => ({
    slug,
    company,
    title,
    period,
    summary,
  }))
}

export function getWorkExperience(slugOrCompany) {
  const needle = String(slugOrCompany || '').toLowerCase()

  const job = EXPERIENCE.find(
    (e) => e.slug.toLowerCase() === needle || e.company.toLowerCase().includes(needle)
  )

  if (!job) {
    return {
      error: `No experience found matching "${slugOrCompany}". Available: ${EXPERIENCE.map((e) => e.company).join(', ')}`,
    }
  }

  return job
}