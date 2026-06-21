# Section 5 — Building a Progressive Dataset

## Purpose
Expand from a small seed set into a broad, realistic evaluation dataset that covers normal, edge, and adversarial support cases.

## Section promise
Learners should finish this section knowing how to grow an eval dataset deliberately without turning it into noisy or unfocused test collection.

## Core teaching goals
- Show why a seed dataset is useful but incomplete
- Teach a strategy for expanding coverage step by step
- Add ambiguity and missing-information cases
- Add adversarial and prompt-injection cases
- Keep the dataset organized with labels and versioning

## Main narrative
The first eval harness gives us structure, but the real world is bigger than a handful of examples. We need a dataset that grows with the product: first core workflows, then edge cases, then risky inputs. This section shows how to expand coverage in a way that stays useful for regression testing.

## Topics covered
- seed dataset design
- progressive coverage strategy
- ambiguity and missing information cases
- adversarial and prompt-injection cases
- labeling and metadata
- dataset versioning and maintenance

## What learners should understand
- small starting datasets are normal and valuable
- coverage should expand intentionally, not randomly
- risky user behavior should be represented in the dataset
- labels and versions make datasets maintainable over time
- a good dataset supports both quality control and debugging

## Section artifact
A progressively expanded evaluation dataset with clear labels and versioning.

## Chapters
1. `01_seed_dataset`
2. `02_progressive_coverage_strategy`
3. `03_ambiguity_and_missing_info`
4. `04_adversarial_and_prompt_injection_cases`
5. `05_labeling_and_versioning`
6. `06_section_recap_and_bridge_to_section_6`
