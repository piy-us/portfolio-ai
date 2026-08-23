// Consolidated from an earlier 40-entry version that had heavy duplication
// (e.g. five separate "would he be a good fit for X role" questions). Same
// factual content, merged into distinct topics — this is what actually
// fixed the oversized-prompt problem, more than any tool restructuring did.

export const FAQS = [
  {
    q: 'Who is Piyush and what does he do?',
    a: 'A Computer Science graduate (Data Science specialization) and AWS Certified AI Practitioner, currently a Systems Engineer Trainee at TCS. He works across enterprise GenAI (Agentic AI, RAG, LangGraph/LangChain, Azure AI), cloud security, and production React Native frontend development.',
  },
  {
    q: 'What is he doing right now, and what did he do before that?',
    a: 'Currently: React Native frontend development on the TataPlay consumer app (mSales/mService) at TCS. Before that: GenAI/AI engineering for a BFSI client (multi-agent systems, RAG) and related work for Nationwide Building Society. His first project at TCS was cloud security monitoring for Tata Steel UK.',
  },
  {
    q: 'Why should we hire him / what is his biggest strength?',
    a: 'He combines production frontend engineering with hands-on GenAI engineering — a combination that is increasingly valuable together. He can reason about a system from the model/retrieval layer through APIs to the user-facing interface, not just one layer of the stack.',
  },
  {
    q: 'What makes him different from a typical frontend or GenAI specialist?',
    a: "Most engineers are deep in one of these two areas. Piyush has shipped production work in both: enterprise Agentic AI/RAG systems on Azure, and a production React Native app used by real customers — so he can work across the full AI application stack rather than handing off between specialists.",
  },
  {
    q: 'Does he have real hands-on RAG and Agentic AI experience?',
    a: 'Yes — his strongest technical area. He built a multi-agent GitLab Sales Assistant (LangGraph, LangChain, Azure AI Foundry) and a multimodal RAG system on Azure AI Search with hybrid retrieval, reranking, web-search fallback, and ingestion pipelines on Azure Blob Storage/Cosmos DB. He also worked on an Agentic AI + ServiceNow integration for incident analysis.',
  },
  {
    q: 'Does he have production software/frontend experience, not just demos?',
    a: 'Yes. His current role ships features directly into the TataPlay production app used by real customers — React Native, Redux, GraphQL, cross-platform iOS/Android, plus performance/rendering debugging. His GenAI work was also hardened for production: PII masking, secure Azure VNet deployment with private endpoints.',
  },
  {
    q: 'What technologies and tools does he know?',
    a: 'Frontend: React, React Native, JavaScript, TypeScript, Redux, GraphQL, REST APIs. AI/backend: Python, LangGraph, LangChain, Azure AI Foundry, Azure AI Search, FastAPI, TensorFlow-Keras, Scikit-learn. Cloud/data: Azure (Cosmos DB, Blob Storage), Docker, GCP Security Command Center, Pandas, NumPy, SQL, vector databases.',
  },
  {
    q: 'Has he worked with enterprise clients?',
    a: 'Yes — TataPlay, a BFSI (banking/financial services) client, Nationwide Building Society, and Tata Steel UK Ltd, spanning frontend development, enterprise GenAI, ServiceNow automation, and cloud security.',
  },
  {
    q: 'Does he have cloud security experience?',
    a: 'Yes. He monitored cloud security posture and vulnerabilities with Google Cloud Security Command Center during an enterprise cloud migration for Tata Steel UK, handling alert triage and ServiceNow incident creation/remediation coordination.',
  },
  {
    q: 'What is his educational background and certifications?',
    a: 'BTech in Computer Science and Engineering (Data Science specialization), Haldia Institute of Technology, 2020–2024, CGPA 8.46. He is also an AWS Certified AI Practitioner.',
  },
  {
    q: 'What roles would he be a good fit for?',
    a: 'GenAI Engineer, AI Engineer, Agentic AI Engineer, RAG Engineer, LLM Engineer, Frontend Engineer, React Native Engineer, or an AI-focused full-stack role — his combination of production frontend and hands-on GenAI experience fits especially well where a team wants both in one person.',
  },
  {
    q: 'Is he available for a job change, and how should someone reach him?',
    a: "He is currently employed at TCS but open to discussing relevant opportunities — specific availability, notice period, remote/hybrid preference, and freelance availability should be confirmed with him directly. Use the portfolio's contact form to reach out."  ,
  },
  {
    q: 'Has he worked on performance optimization?',
    a: 'Yes, on both sides: reduced GenAI response latency by parallelizing retrieval, web search, and agent workflow steps, and works on frontend performance/rendering issues across device tiers in the TataPlay app.',
  },
]

export const FAQ_SUMMARY = FAQS
  .map((f) => `Q: ${f.q}\nA: ${f.a}`)
  .join('\n\n')