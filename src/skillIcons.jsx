import {
  SiLangchain,
  SiReact,
  SiJavascript,
  SiStreamlit,
  SiDocker,
  SiPython,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiScikitlearn,
  SiFastapi,
  SiMysql,
  SiGit,
  SiGitlab,
} from 'react-icons/si'
import { Database, Cloud, Sparkles, Boxes, Network, Search, Bot } from 'lucide-react'

// Skill → icon. Brand logo where one exists, a themed lucide glyph otherwise.
const ICONS = {
  // ai / llm
  LangGraph: Network,
  LangChain: SiLangchain,
  'Azure AI Foundry': Bot,
  'Vector Databases': Boxes,
  // ml & data
  'TensorFlow-Keras': SiTensorflow,
  'Scikit-learn': SiScikitlearn,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  // backend
  Python: SiPython,
  FastAPI: SiFastapi,
  Streamlit: SiStreamlit,
  SQL: Database,
  MySQL: SiMysql,
  // frontend
  'React Native': SiReact,
  React: SiReact,
  JavaScript: SiJavascript,
  // cloud & tools
  Azure: Cloud,
  'Azure AI Search': Search,
  'Azure Cosmos DB': Database,
  'Azure Blob Storage': Boxes,
  Docker: SiDocker,
  Git: SiGit,
  GitLab: SiGitlab,
}

export function getSkillIcon(name) {
  return ICONS[name] || Sparkles
}
