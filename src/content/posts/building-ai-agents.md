---
title: "Building AI Agents with Hybrid RAG"
date: "2025-03-15"
description: "How I built a multi-agent AI chat application combining vector search and keyword search for better retrieval accuracy."
tags: ["ai", "python", "langchain", "rag"]
published: true
---

## The Problem with Naive RAG

Most RAG (Retrieval-Augmented Generation) implementations just do a vector similarity search and feed the top-k chunks to the LLM. This works well for semantic questions but fails for exact lookups — searching for a specific ID, name, or code snippet.

**Hybrid RAG** combines:
- **Dense retrieval** (vector embeddings, semantic similarity)
- **Sparse retrieval** (BM25 keyword search)

The scores are fused using Reciprocal Rank Fusion (RRF), giving better results across a wider variety of queries.

## Architecture Overview

```
User Query
    │
    ▼
┌─────────────────────────────┐
│     Query Router Agent      │  ← decides search strategy
└─────────────────────────────┘
         │           │
    Dense Search  Sparse Search
    (embeddings)  (BM25/keyword)
         │           │
         └─────┬─────┘
               │ RRF Fusion
               ▼
        Reranking Step
               │
               ▼
        LLM with Context
               │
               ▼
       Streaming Response
```

## Key Learnings

1. **Query routing matters** — not every query benefits from the same retrieval strategy
2. **Reranking is underrated** — a cross-encoder reranker significantly improves precision
3. **Streaming UX** — users tolerate slower responses much better when they see text appearing in real-time

## Tech Stack

- **Python + FastAPI** — backend and streaming endpoints
- **LangChain** — orchestration and agent tooling
- **ChromaDB** — vector store
- **React + TypeScript** — frontend with streaming

The full source is on [GitHub](https://github.com/migueelzz/chat-ai-agent-hybrid-rag).
