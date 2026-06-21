# Section 2 — The Assistant We Are Building

## Purpose
Define the assistant before we evaluate it so the rest of the course has a concrete target.

## Section promise
Learners should finish this section with a clear mental model of the product scope, workflows, dependencies, and expected behavior.

## Core teaching goals
- Scope the assistant around real customer support workflows
- Show how tools and data shape the assistant’s behavior
- Define what good behavior looks like before building evals
- Establish a product spec that later sections will test

## Main narrative
We are not building a generic chatbot. We are building a shipping support assistant that handles a bounded set of customer problems using trusted backend data and tools. The assistant must be useful, grounded, and safe when it cannot answer.

## Topics covered
- Product scope and non-scope
- Core support workflows:
  - shipment tracking
  - delay explanation
  - refund/claim guidance
  - customs issue guidance
  - human handoff
- Backend/data assumptions:
  - shipment records
  - policy information
  - support escalation flow
- Assistant design principles:
  - grounded answers
  - clear uncertainty handling
  - safe fallback
  - consistent tone
- Orchestration with Python + LangChain/LangGraph

## What learners should understand
- How to turn a vague product idea into a concrete assistant spec
- Why narrowing the problem improves reliability
- How tools and data determine what the assistant can safely say
- Why the response policy must be defined before evaluation

## Section artifact
A practical product-and-architecture spec for the shipping support assistant.

## Chapters
1. `01_scope_the_support_problem`
2. `02_tools_data_and_boundaries`
3. `03_orchestration_with_langchain_langgraph`
4. `04_grounded_responses_and_safe_fallback`
5. `05_section_recap_and_bridge_to_section_3`
