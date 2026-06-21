# Section 7 — Production Readiness

## Purpose
Make the system release-ready with eval gates, safe fallback, and monitoring concepts.

## Section promise
Learners should finish this section understanding how evals fit into CI/CD, how release decisions are made, and how to reduce risk in production.

## Core teaching goals
- Show how evals become automated release gates
- Define clear release criteria
- Explain how stale data and drift affect quality over time
- Reinforce safe fallback and human handoff behavior

## Main narrative
At this point the assistant can be evaluated and compared. Now we need to make those checks operational. Production readiness is about creating guardrails: if quality drops, the system should not ship; if the assistant cannot answer safely, it should escalate; and if behavior drifts over time, the team should be able to detect it.

## Topics covered
- CI/CD eval gates
- release criteria
- stale data and drift
- human handoff
- safe fallback behavior

## What learners should understand
- evals are useful only when they influence releases
- release criteria should be explicit and consistent
- production systems degrade over time and need monitoring
- safe failure is part of reliability
- human handoff is a core product feature, not an edge case

## Section artifact
A production-readiness policy and gating workflow for the assistant.

## Chapters
1. `01_ci_cd_eval_gates`
2. `02_release_criteria`
3. `03_stale_data_and_drift`
4. `04_human_handoff_and_safe_fallback`
5. `05_section_recap_and_bridge_to_section_8`
