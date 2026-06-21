# Section 6 — Regression Workflow

## Purpose
Use evals to compare changes and catch regressions before users do.

## Section promise
Learners should finish this section able to establish baselines, compare versions, apply pass/fail rules, and diagnose failures systematically.

## Core teaching goals
- Show how to establish a reliable baseline
- Compare model, prompt, and tool changes across runs
- Turn scores into release decisions with thresholds
- Organize failures so they can be fixed efficiently

## Main narrative
Once we can evaluate the assistant and expand the dataset, the next challenge is change management. Every prompt tweak, tool change, or model update can improve one thing while breaking another. This section shows how to use evals as a regression workflow so changes are measured instead of guessed.

## Topics covered
- baselines and versioning
- comparing evaluation runs
- thresholds and pass/fail rules
- failure bucketing
- root-cause analysis

## What learners should understand
- a baseline is the reference point for all comparison
- score differences matter only when compared across versions
- release decisions need explicit thresholds
- failures should be grouped and investigated systematically
- regression testing is how evals become operationally useful

## Section artifact
A repeatable regression workflow for assistant changes.

## Chapters
1. `01_baselines_and_versions`
2. `02_comparing_runs`
3. `03_thresholds_and_pass_fail_rules`
4. `04_failure_bucketing_and_root_cause`
5. `05_section_recap_and_bridge_to_section_7`
