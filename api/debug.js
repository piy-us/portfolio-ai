export default function handler(req, res) {
  const geminiKeys = Object.keys(process.env).filter((k) =>
    k.toUpperCase().includes('GEMINI')
  )

  res.status(200).json({
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    geminiKeysFound: geminiKeys,
    geminiApiKeyLength: process.env.GEMINI_API_KEY
      ? process.env.GEMINI_API_KEY.length
      : null,
    totalEnvVarCount: Object.keys(process.env).length,
  })
}