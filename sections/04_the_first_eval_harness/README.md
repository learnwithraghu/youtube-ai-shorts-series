# Section 4 — The First Eval Harness

## Purpose
Build the first meaningful evaluation setup with DeepEval so the assistant’s behavior can be measured instead of guessed.

## Section promise
Learners should finish this section able to define eval cases, choose scoring methods, run local evaluations, and interpret the results.

## Core teaching goals
- Introduce DeepEval as the evaluation layer for the course
- Show how to represent an eval case properly
- Explain reference-based scoring vs rubric-based judging
- Define the core metrics that matter for a support assistant
- Show how to run and read local eval results

## Main narrative
Now that the assistant is defined and observable, we can start scoring it. The goal is not to build a perfect benchmark on day one. The goal is to create a first useful harness that exposes real weaknesses in the assistant and gives us a repeatable way to improve it.

## Topics covered
- why DeepEval fits this course
- what an eval harness needs to include
- how to structure test cases
- reference answers vs rubrics
- core metrics:
  - correctness
  - groundedness
  - tone
  - safety
  - tool use
- local evaluation runs and result interpretation

## What learners should understand
- tests for LLMs are different from standard unit tests
- a good eval case includes context, expected behavior, and scoring intent
- different failure types need different scoring styles
- metrics should map directly to product quality
- eval output should inform debugging and iteration

## Section artifact
A working first-pass DeepEval harness with a useful quality report.

## Chapters
1. `01_introducing_deepeval`
2. `02_test_case_structure`
3. `03_reference_answers_vs_rubrics`
4. `04_core_metrics`
5. `05_running_and_reading_local_evals`
6. `06_section_recap_and_bridge_to_section_5`
