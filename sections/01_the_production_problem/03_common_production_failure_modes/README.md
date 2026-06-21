# 03 — Common Production Failure Modes

## Purpose
Make the risk concrete by listing the ways an LLM support assistant can break.

## What this chapter teaches
- Hallucination is only one failure mode
- Production failures often come from tool use, policy handling, or stale information
- Similar inputs can produce inconsistent answers

## Failure modes to cover
- hallucinations
- stale tracking data
- wrong tool selection
- missing escalation behavior
- policy mistakes
- unsafe or overly confident language
- inconsistent tone
- prompt injection or adversarial user behavior

## Talking points
- A wrong answer can be worse than no answer
- Support systems need grounded responses
- Production failures are usually multi-dimensional

## Suggested flow
1. Define failure as a product issue
2. Walk through a few realistic examples
3. Group failures into categories
4. Transition into measurement and evals

## Output
A shared failure taxonomy that will guide the eval system later.
