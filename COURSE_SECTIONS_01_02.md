# Deep Evals Udemy Course — Sections 1 & 2

This is the current working scope.

Section 1 is now fully expanded here:
- `sections/01_the_production_problem/`

We are focusing only on the first two sections for now, because they set up the entire course.

---

## Section 1 — The production problem

### Purpose
Show why LLM apps fail in real production settings and why evaluation is necessary from day one.

### Section promise
Learners should finish this section understanding that a polished demo is not the same as a reliable product.

### Core teaching goals
- Explain the gap between demo performance and production reliability
- Introduce the main failure modes of customer-facing LLM apps
- Make evals feel like a business requirement, not an academic exercise

### Main narrative
We start with a shipping support assistant that looks useful on the surface. It can answer customer questions, but it can also hallucinate tracking updates, give outdated policy advice, misuse tools, or respond with the wrong tone. That tension is the reason evals exist.

### Topics to cover
- Shipping/logistics support as the course scenario
- Common customer intents:
  - shipment tracking
  - delay explanation
  - refund/claim guidance
  - customs guidance
  - escalation to a human
- What goes wrong in production:
  - hallucinations
  - stale data
  - wrong tool calls
  - policy mistakes
  - unsafe or overly confident responses
  - inconsistency across similar inputs
- Why prompt polish alone does not solve reliability
- Why evals are part of the product loop

### Example talking points
- A model can sound confident and still be wrong
- A support assistant must be grounded in real data
- The cost of a bad answer is user trust, support load, and potential operational damage
- Production systems need measurable quality, not vibes

### Learner outcome
By the end of Section 1, learners should be able to explain:
- what can fail in a real LLM support app
- why those failures matter
- why we need a structured evaluation process

### Section artifact
A clear problem statement that justifies the whole course.

---

## Section 2 — The assistant we are building

### Purpose
Define the product before the evals so the course has a concrete target.

### Section promise
Learners should finish this section with a mental model of the assistant’s scope, behavior, and boundaries.

### Core teaching goals
- Define the assistant’s job clearly
- Break the product into support workflows
- Show how tools, data, and orchestration fit together
- Establish what “good behavior” means before testing it

### Main narrative
We are not building a generic chatbot. We are building a shipping support assistant that helps users with specific operational tasks. It needs to look up shipment status, explain delays, guide refunds or claims, handle customs questions, and escalate when it cannot answer safely.

### Topics to cover
- Product scope and non-scope
- Core workflows:
  - shipment tracking
  - delay explanation
  - refund/claim guidance
  - customs issue guidance
  - human handoff
- Basic backend assumptions:
  - shipment records
  - policy data
  - support workflows
- Assistant design principles:
  - grounded answers
  - clear uncertainty handling
  - safe fallback when data is missing
  - consistent tone
- Orchestration overview with Python + LangChain/LangGraph

### Example talking points
- The assistant should not guess when data is unavailable
- The assistant should escalate instead of overreaching
- Different intents require different tool paths
- Product design comes before eval design

### Learner outcome
By the end of Section 2, learners should be able to describe:
- what the assistant does
- what it should not do
- what systems it depends on
- what success looks like for each core workflow

### Section artifact
A product-and-architecture spec for the assistant that later sections will test.

---

## Why only these two sections for now
These two sections establish:
1. the problem
2. the product

That gives us the foundation for everything that follows: instrumentation, evals, datasets, regression, and production gates.

## Next step after these are finalized
Create lesson-by-lesson breakdowns for Sections 1 and 2 only.
