const rawKeywords = [
  "claude 3.7 sonnet coding benchmarks",
  "deepseek r1 reasoning architecture",
  "openai o3 mini structured outputs",
  "cursor ide enterprise deployment guide",
  "github copilot vs cursor code completion latency",
  "llm token cost optimization frameworks",
  "prompt caching techniques for enterprise llms",
  "evaluating rag pipelines with trulens and ragas",
  "vllm inference server production optimization",
  "quantization techniques for local llm inference",
  "agentic workflows with langchain and autogen",
  "fine tuning open source models with lora",
  "vector databases comparison milvus vs qdrant vs pgvector",
  "hybrid search architecture bm25 and dense embeddings",
  "multimodal vision models in enterprise inspection",
  "ai code review pipelines in github actions",
  "model context protocol mcp enterprise integration",
  "speculative decoding for low latency llm serving",
  "synthetic data generation for model distillation",
  "ai security red teaming and jailbreak prevention",
  "governance frameworks for enterprise generative ai",
  "next.js edge rendering with streaming ai responses",
  "function calling reliability across frontier models",
  "enterprise ai roi measurement and payback analysis",
  "evaluating reasoning models on gsm8k and humaneval"
];

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'keywords.json');
fs.writeFileSync(targetPath, JSON.stringify(rawKeywords, null, 2), 'utf-8');
console.log(`Wrote ${rawKeywords.length} technical AI keywords to ${targetPath}`);
