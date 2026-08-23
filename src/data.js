// All your content lives here. Edit freely — no JSX to worry about.

export const nodes = [
  {
    id: 'core_01',
    label: 'Frontend Engineering',
    sub: 'React Native · React',
    icon: 'smartphone',
    status: 'active',
    detail:
      'Building production-grade mobile and web experiences for enterprise products. Currently developing customer-facing features for Tata Play using React Native, React, GraphQL, Redux and modern frontend architecture.',
  },
  {
    id: 'core_02',
    label: 'Agentic AI',
    sub: 'LangGraph · RAG · Azure',
    icon: 'bot',
    status: 'active',
    detail:
      'Designed and built multi-agent AI systems, RAG pipelines and enterprise AI proofs-of-concept using LangGraph, Azure AI Foundry and Azure AI Search. Experienced in taking AI ideas from prototype to working pilot applications.',
  },
  {
    id: 'core_03',
    label: 'Cloud & Enterprise',
    sub: 'Azure · GCP · Security',
    icon: 'shield',
    status: 'done',
    detail:
      'Started in enterprise cloud operations and security before moving into AI engineering and frontend development. Comfortable working across cloud infrastructure, enterprise deployments and production software.',
  },
]

export const experience = [
  {
    id: 'tataplay',
    role: 'Frontend Developer',
    company: 'TCS · Tata Play',
    dates: '2026 — Present',
    current: true,
    bullets: [
      'Developing and enhancing production features for Tata Play\'s internal sales and service applications (mSales & mService) used by field teams across India.',
      'Building responsive cross-platform experiences using React Native, React.js, GraphQL and Redux while integrating enterprise APIs.',
      'Working closely with business analysts, QA teams and backend developers to deliver change requests, new features and production enhancements.',
      'Improving application usability, fixing production issues and maintaining scalable frontend architecture for enterprise mobile applications.',
    ],
    tags: [
      'React Native',
      'React',
      'GraphQL',
      'Redux',
      'MySQL',
      'JavaScript',
    ],
  },

  {
    id: 'genai',
    role: 'AI Engineer',
    company: 'TCS · BFSI UK-1',
    dates: '2025 — 2026',
    current: false,
    bullets: [
      'Designed and developed enterprise AI proof-of-concepts and pilot solutions tailored to client business requirements.',
      'Built an AI-powered GitLab Sales Agent using LangGraph, Azure AI Foundry and Azure AI Search to help sales teams understand customer DevOps challenges and recommend relevant GitLab solutions.',
      'Developed secure multimodal RAG pipelines integrating enterprise documentation, presentations and web knowledge with hybrid retrieval and conversational memory.',
      'Implemented multi-agent workflows, Azure deployments, private networking, ingestion pipelines and enterprise-grade AI architecture.',
      'Contributed to an Agentic AI solution integrated with ServiceNow for automated incident analysis and knowledge retrieval.',
    ],
    tags: [
      'LangGraph',
      'LangChain',
      'Azure AI',
      'Azure AI Search',
      'Azure',
      'RAG',
      'FastAPI',
      'Python',
    ],
  },

  {
    id: 'tatasteel',
    role: 'Cloud Operations Engineer',
    company: 'TCS · Tata Steel UK',
    dates: '2025',
    current: false,
    bullets: [
      'Supported enterprise cloud migration initiatives by monitoring security posture using Google Cloud Security Command Center.',
      'Performed security alert triage, vulnerability assessment and ServiceNow incident management for production cloud environments.',
      'Worked with engineering teams to investigate security findings and improve cloud compliance and operational reliability.',
    ],
    tags: [
      'Google Cloud',
      'GCP SCC',
      'ServiceNow',
      'Cloud Security',
    ],
  },
]
// `image`: drop a screenshot in public/projects/ and set the path (e.g. '/projects/research-agent.png').
// Leave it null to render a generated gradient placeholder. `accent` tints the placeholder + card glow.
export const projects = [
  {
    id: 'gitlab-agent',
    title: 'GitLab AI Sales Agent',
    description: 'An enterprise multi-agent AI assistant built to help sales teams understand client DevOps challenges and recommend GitLab solutions.',
    bullets: [
      'Built with LangGraph, LangChain and Azure AI Foundry',
      'Implemented multimodal RAG over GitLab documentation, presentations and enterprise knowledge',
      'Integrated Azure AI Search, Cosmos DB and Blob Storage for scalable retrieval and conversational memory',
      'Designed secure Azure deployment with private networking and PII masking',
    ],
    tags: [
      'LangGraph',
      'Azure AI',
      'Azure AI Search',
      'RAG',
      'Cosmos DB',
    ],
    link: 'https://github.com/piy-us',
    image: null,
    accent: 'crimson',
    year: '2025',
},
{
    id:'cli-agent',
    title:'CLI AI Code Assistant',
    description:'An autonomous terminal-based coding assistant capable of understanding repositories, debugging errors and modifying source code.',
    bullets:[
        'Analyzes repositories directly from the terminal',
        'Interprets traceback errors and identifies root causes',
        'Suggests and applies code modifications with user approval',
        'Built using LangGraph agent workflows and LLM orchestration'
    ],
    tags:[
        'Python',
        'LangGraph',
        'CLI',
        'Agentic AI'
    ],
    link: 'https://github.com/piy-us',
    image: null,
    accent: 'emarald',
    year: '2025',
},
  {

    id: 'research-agent',
    title: 'Deep Research Agent',
    description: 'A multi-agent research system that goes beyond single-query lookups.',
    bullets: [
      'Stateful, iterative research workflow built on LangGraph with configurable breadth/depth',
      'Scrapes and synthesizes via Firecrawl, generates recursive follow-up questions',
      'Provider-agnostic — runs free on Groq + Firecrawl tiers',
      'Exposed via FastAPI + CLI, outputs a structured markdown report',
    ],
    tags: ['LangGraph', 'FastAPI', 'Firecrawl'],
    link: 'https://github.com/piy-us',
    image: null,
    accent: 'violet',
    year: '2025',
  },


  {
    id: 'data-analyst-agent',
    title: 'AI-Powered Data Analyst Agent',
    description: 'A multi-agent system for end-to-end data analysis, no manual scripting required.',
    bullets: [
      'Specialized agents for cleaning, analysis, visualization, and trend detection',
      'Dynamic error-detection and code self-correction',
      'Interactive visualizations rendered via Plotly',
    ],
    tags: ['LangGraph', 'Gemini', 'Plotly'],
    link: 'https://github.com/piy-us',
    image: null,
    accent: 'teal',
    year: '2025',
  },
  {
    id: 'ebook-rag',
    title: 'AI Ebook Reader (RAG)',
    description: "A spoiler-free reading companion that only knows what you've already read.",
    bullets: [
      'RAG-based Q&A over ebook content using LlamaIndex',
      'Metadata-aware retrieval limits answers to previously-read sections',
      'Inference via Llama and Mixtral, integrated into a web reading UI',
    ],
    tags: ['LlamaIndex', 'Flask', 'Mixtral'],
    link: 'https://github.com/piy-us',
    image: null,
    accent: 'peach',
    year: '2024',
  },
  {
    id: 'insect-classification',
    title: 'Insect Classification with Deep Learning',
    description: 'Transfer learning for agricultural insect detection.',
    bullets: [
      'Fine-tuned Xception and MobileNet architectures',
      'Improved classification accuracy from 73% to 79%',
      'Data augmentation and hyperparameter tuning for generalization',
    ],
    tags: ['TensorFlow', 'Keras', 'Transfer Learning'],
    link: 'https://github.com/piy-us',
    image: null,
    accent: 'indigo',
    year: '2024',
  },
]

// Anime quote images — drop files in public/anime/ and reference as '/anime/<file>'.
// `image` can stay null to render a gradient card with just the quote (swap in pics later).
export const animeQuotes = [
  {
    id: 'q1',
    image: '/anime/image.jpg',
    quote: "A lesson without pain is meaningless. That's because you can't gain anything without sacrificing something in return.",
    character: 'Edward Elric',
    anime: 'Fullmetal Alchemist',
  },
  {
    id: 'q2',
    image: '/anime/download1.jpg',
    quote: 'The world is not perfect. But it’s there for us, trying the best it can. That’s what makes it so damn beautiful.',
    character: 'Roy Mustang',
    anime: 'Fullmetal Alchemist',
  },
  {
    id: 'q3',
    image: '/anime/download2.jpg',
    quote: 'Hard work is worthless for those that don’t believe in themselves.',
    character: 'Naruto Uzumaki',
    anime: 'Naruto',
  },
  {
    id: 'q4',
    image: '/anime/download3.jpg',
    quote: 'It’s not the face that makes someone a monster; it’s the choices they make with their lives.',
    character: 'Naruto Uzumaki',
    anime: 'Naruto',
  },
  {
    id: 'q5',
    image: '/anime/download4.jpg',
    quote: 'If you don’t take risks, you can’t create a future.',
    character: 'Monkey D. Luffy',
    anime: 'One Piece',
  },
  {
    id: 'q6',
    image: '/anime/download2.jpg',
    quote: 'Power comes in response to a need, not a desire. You have to create that need.',
    character: 'Goku',
    anime: 'Dragon Ball Z',
  },
]

export const skillGroups = [
  {
    title: 'ai / llm',
    skills: ['LangGraph', 'LangChain', 'Azure AI Foundry', 'Vector Databases'],
  },
  {
    title: 'ml & data',
    skills: ['TensorFlow-Keras', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    title: 'backend',
    skills: ['Python', 'FastAPI', 'Streamlit', 'SQL', 'MySQL'],
  },
  {
    title: 'frontend',
    skills: ['React Native', 'React', 'JavaScript'],
  },
  {
    title: 'cloud & tools',
    skills: ['Azure', 'Azure AI Search', 'Azure Cosmos DB', 'Azure Blob Storage', 'Docker', 'Git', 'GitLab'],
  },
]
export const contact = {
  email: 'piyushpriyank3@gmail.com',
  linkedin: 'https://linkedin.com/in/piyushpriyank',
  github: 'https://github.com/piy-us',
  // TODO: replace with your real profile URLs (leave '' to hide the icon).
  twitter: 'https://twitter.com/',
  instagram: 'https://instagram.com/',
  // Drop your PDF at public/resume.pdf (or change this path).
  resume: '/resume.pdf',
}
