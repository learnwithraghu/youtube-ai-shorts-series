# Deep Evals Udemy Course — Section Guide

This document is the source of truth for the full course section plan.

Section folder structure:
- `sections/01_the_production_problem/`
- `sections/02_the_assistant_we_are_building/`
- `sections/03_instrumentation_and_failure_capture/`
- `sections/04_the_first_eval_harness/`
- `sections/05_building_a_progressive_dataset/`
- `sections/06_regression_workflow/`
- `sections/07_production_readiness/`
- `sections/08_reporting_and_review/`

Use these docs later to produce lesson scripts, code snippets, slides, demos, and exercises.

## Section 1 — The production problem

### What this section is about
We start with the real-world shipping support assistant and explain why LLM apps fail in production even when they look great in demos.

### What learners should understand
- Why “it works in the notebook” is not enough
- What production failures look like: hallucinations, stale data, bad tool use, policy misses
- Why evals are a product requirement, not a nice-to-have

### Topics covered
- Shipping/logistics support as the course scenario
- Common support intents: tracking, delays, refunds, customs, escalation
- Failure modes in customer-facing LLM systems
- The difference between demo quality and production quality

### Output of this section
- A shared mental model for the whole course
- A clear reason why we need an eval system

---

## Section 2 — The assistant we are building

### What this section is about
We define the application before the evals: what the assistant does, what tools it can use, and what good behavior looks like.

### What learners should understand
- How to scope an LLM assistant around real workflows
- How to break support into intents and tool calls
- How to design the assistant around grounded answers and safe fallback

### Topics covered
- App requirements and boundaries
- Core flows:
  - shipment tracking
  - delay explanation
  - refund/claim guidance
  - customs guidance
  - human handoff
- Basic backend/data model assumptions
- Assistant orchestration with Python + LangChain/LangGraph

### Output of this section
- A product spec for the assistant
- A clear app architecture that later evals will target

---

## Section 3 — Instrumentation and failure capture

### What this section is about
Before evaluating, we make the assistant observable so we can inspect prompts, responses, tools, and latency.

### What learners should understand
- Why logging is required for debugging and regression analysis
- How to capture the full interaction loop
- How to turn live failures into eval examples

### Topics covered
- Logging user input, model output, tool calls, timestamps
- Capturing tool metadata and latency
- Categorizing failures
- Building a small “failure bank” from realistic examples

### Output of this section
- Observable app behavior
- A first set of failure cases to evaluate against

---

## Section 4 — The first eval harness

### What this section is about
We introduce DeepEval and build the first set of tests for the assistant.

### What learners should understand
- How eval cases are structured
- How to compare expected behavior against actual behavior
- How metrics are used to score quality

### Topics covered
- Test case design
- Reference answers vs rubric-based judging
- Metrics for:
  - correctness
  - groundedness
  - tone
  - safety
  - tool use
- Running local evals and reading results

### Output of this section
- A working eval harness
- The first meaningful quality report for the assistant

---

## Section 5 — Building a progressive dataset

### What this section is about
We grow the eval dataset from a small seed set into broader coverage across normal, edge, and adversarial cases.

### What learners should understand
- Why a tiny dataset is useful only as a starting point
- How to add coverage without creating noise
- How to think in scenarios, not just prompts

### Topics covered
- Seed examples and expansion strategy
- Ambiguity and missing-info cases
- Adversarial and prompt-injection cases
- Labeling and scenario design

### Output of this section
- A progressively better eval dataset
- Coverage across common and risky support situations

---

## Section 6 — Regression workflow

### What this section is about
We show how to use evals to compare changes and catch regressions before they reach users.

### What learners should understand
- How to establish a baseline
- How to compare model, prompt, and tool changes
- How to diagnose failures systematically

### Topics covered
- Thresholds and pass/fail criteria
- Version comparison
- Failure bucketing
- Root-cause analysis for bad scores

### Output of this section
- A repeatable regression process
- Confidence that changes are improving the product

---

## Section 7 — Production readiness

### What this section is about
We make the system release-ready with CI checks, safe failure behavior, and monitoring concepts.

### What learners should understand
- Why eval gates belong in CI/CD
- How to decide whether a build can ship
- How to reduce risk when data or behavior shifts

### Topics covered
- CI/CD eval gates
- Release criteria
- Stale data and drift
- Human handoff and safe fallback

### Output of this section
- A realistic production release workflow
- A safety net for future changes

---

## Section 8 — Reporting and review

### What this section is about
We create a lightweight reporting layer so the team can understand quality trends and failure patterns.

### What learners should understand
- Why summaries matter as much as raw test results
- How to communicate quality to non-technical stakeholders
- How to track improvement over time

### Topics covered
- Score summaries
- Failure buckets
- Trend tracking
- Simple dashboard or report output

### Output of this section
- A readable quality report
- A way to monitor improvement across iterations

---

## Section sequencing rule

Teach in this order:
1. problem
2. app
3. instrumentation
4. eval harness
5. dataset growth
6. regression workflow
7. production gates
8. reporting

This keeps the course practical and makes evals feel necessary, not abstract.
