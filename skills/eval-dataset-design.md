# Skill: Eval Dataset Design

## Purpose
Create realistic evaluation cases and rubrics for the shipping support assistant.

## Output
For each dataset batch provide:
- scenario description
- user message
- expected behavior
- failure mode being tested
- scoring notes

## Rules
- Cover normal, ambiguous, and adversarial cases
- Mix correctness, groundedness, safety, tone, and tool-use checks
- Prefer concrete operational scenarios over abstract prompts
- Keep the dataset progressive and expandable
