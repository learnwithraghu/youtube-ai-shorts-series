# Deep Evals Udemy Course — Outline

## 1) Course modules

### Module 1 — Why evals matter
- The shipping assistant problem
- What breaks in production LLM apps
- Eval mindset: from demos to regression control
- What DeepEval gives us

### Module 2 — Build the app first
- Define the customer support workflows
- Ship tracking, delay, refund, customs, escalation
- Data model and API boundaries
- Baseline assistant with tools

### Module 3 — Instrumentation and failure modes
- Logging prompts, outputs, tool calls, and latency
- Common failure categories
- Creating a small but realistic failure set

### Module 4 — Build the eval harness
- Test case structure
- Reference answers vs rubric-based scoring
- Metrics: correctness, groundedness, tone, safety, tool use
- Running local evals and reading results

### Module 5 — Expand the dataset
- From seed examples to progressive coverage
- Edge cases, ambiguity, and adversarial inputs
- Labeling strategy and scenario design

### Module 6 — Regression workflow
- Baselines and thresholds
- Comparing model/prompt/tool changes
- Debugging failures systematically

### Module 7 — Production readiness
- CI/CD eval gates
- Release criteria
- Monitoring drift and stale data
- Human handoff and safe failure behavior

### Module 8 — Dashboard and reporting
- Simple reporting layer
- Score summaries and failure buckets
- Tracking improvements over time

## 2) Lesson-by-lesson flow

### Part A — Setup and problem framing
1. Course overview and final system preview
2. Why LLM apps fail in production
3. Shipping support assistant requirements
4. Architecture of the app + eval loop

### Part B — Build the assistant
5. Define tools and backend data
6. Implement the baseline assistant
7. Add routing for support intents
8. Add human handoff and safe fallback

### Part C — Start evaluating
9. Introduce eval cases and expected outputs
10. Create the first DeepEval tests
11. Score correctness and groundedness
12. Add tone, safety, and tool-use checks

### Part D — Improve and expand
13. Collect more scenarios
14. Add ambiguous and adversarial examples
15. Tune prompts and tool behavior
16. Track regressions across versions

### Part E — Productionize
17. Add CI gates
18. Set release thresholds
19. Monitor failures in the wild
20. Wrap-up and next steps

## 3) Project architecture

### Components
- **Frontend or simple demo UI**: user-facing chat/support interface
- **Assistant service**: LangChain/LangGraph orchestration
- **Tools/services**:
  - shipment lookup
  - order history
  - policy lookup
  - escalation ticket creation
- **Eval harness**: DeepEval tests and metric runners
- **Dataset store**: curated scenario files
- **Reporting**: summary output or lightweight dashboard

### Core data flow
1. User submits a support request
2. Assistant routes to the correct workflow
3. Tools fetch shipment/policy data
4. Assistant responds with grounded guidance
5. Interaction is logged
6. DeepEval runs against logged or synthetic test cases
7. Results drive prompt/tool changes and regression checks

### Repo layout suggestion
- `app/` — assistant implementation
- `tools/` — support system mock tools
- `data/` — test scenarios and seed eval cases
- `evals/` — DeepEval tests and runners
- `reports/` — outputs and summaries
- `docs/` — course notes and walkthroughs

## 4) First build milestone

### Milestone 1: Shipping support MVP
Goal: a working assistant that handles the most common support requests reliably.

#### Scope
- Shipment tracking
- Delay explanation
- Refund/claim guidance
- Customs issue guidance
- Human escalation

#### Deliverables
- Runnable assistant app
- Mock backend data/services
- Basic logging of tool calls and responses
- First 10–20 eval cases
- Initial DeepEval run with a few core metrics

#### Success criteria
- The assistant answers the main flows correctly
- Responses stay grounded in available data
- Escalation happens when information is missing
- A baseline eval report can be generated locally

## Suggested teaching arc

- Start with the app people want to build
- Show the hidden complexity
- Introduce evals as the production safety net
- Build the assistant and the evals in parallel
- End with CI gates and regression discipline
