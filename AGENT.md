# Project Agent Guide

This file defines how future work on the course should be done.

## Goal
Build a high-quality course about production LLM evaluation using a shipping support assistant as the central example.

## Core content rules
- Teach the product problem before the tooling
- Keep the shipping/logistics scenario consistent throughout
- Prefer production realism over toy examples
- Use small, understandable steps that build toward a full system
- Every section should end with a concrete artifact

## Teaching priorities
1. Real-world problem framing
2. Assistant design and workflows
3. Instrumentation and observability
4. DeepEval-based evaluation
5. Dataset growth and edge cases
6. Regression and release discipline
7. Reporting and monitoring

## Writing style
- Practical
- Clear
- Product-builder tone
- Minimal fluff
- Explain why each step matters

## Output expectations for future tasks
When creating content, produce one of these:
- section readme content
- lesson outline
- code snippet plan
- slide outline
- exercise or lab
- eval dataset examples
- rubric/metric definitions

## Content constraints
- Keep the stack aligned with Python + LangChain/LangGraph + DeepEval
- Keep the final deliverable focused on app + eval harness + regression workflow + reporting
- Include realistic failure modes: hallucination, stale data, tool mistakes, safety, ambiguity, prompt injection, drift

## Workflow
1. Update or expand the section guide
2. Derive lessons from the section guide
3. Derive code snippets and slides from lesson intent
4. Derive exercises and eval cases from failure modes
5. Preserve consistency across all generated content

## Definition of done
A section is ready when it has:
- purpose
- learning goals
- topics
- expected output
- links to the next section