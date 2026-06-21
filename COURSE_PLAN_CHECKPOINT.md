# Deep Evals Udemy Course — Checkpoint

Date: 2026-06-21

## What we’ve decided so far

### Target audience
- **Intermediate engineers**
- Comfortable with Python, APIs, and backend basics

### Course goal
- Learners should be able to **understand, build, and think like production engineers** for LLM evals
- Main outcome: **build a production-ready eval system** around a real app

### Core use case
- A **shipping company / logistics support assistant**
- The shipping company is the real-world background for the course
- Use case should feel realistic and product-like

### App scope
- **End-to-end shipping support assistant**
- Handles things like:
  - shipment tracking
  - delay explanations
  - refund/claim guidance
  - customs issues
  - escalation / human handoff

### Build style
- **Build-as-we-go**
- **Project + checkpoints**
- **Balanced milestones**
- **Product-builder style** tone

### Technical stack
- **Python + LangChain/LangGraph + DeepEval**
- DeepEval is the main eval tool, with internals explained along the way

### Evaluation approach
- **Mixed evals**
- Focus on full production quality:
  - correctness
  - groundedness
  - tone
  - safety
  - tool use
  - consistency
  - latency

### Dataset approach
- **Progressive dataset**
- Start small and grow the eval set as the course progresses

### Delivery format
- **Medium-length course (3–5 hours)**
- Hands-on and practical, not just theory

### Final deliverable
- **App + eval harness + regression workflow + simple reporting/dashboard layer**

### Production readiness
- Include **CI/CD eval gates**
- Teach realistic failure cases, including:
  - hallucinations
  - tool mistakes
  - policy misses
  - stale data
  - ambiguity
  - prompt injection
  - regression drift

## Current course direction

The course should start with the app and the problem early, then reveal why evals are necessary, then progressively build the eval system and automation around it.

## Next step when resuming
- Continue from the current checkpoint and define:
  1. course outline/modules
  2. lesson-by-lesson flow
  3. project architecture
  4. first build milestone
