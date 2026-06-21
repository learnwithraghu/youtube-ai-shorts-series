# Section 3 — Instrumentation and Failure Capture

## Purpose
Make the assistant observable so we can inspect failures, understand behavior, and convert real problems into eval cases.

## Section promise
Learners should finish this section knowing how to log the right information, organize traces, and build a failure bank that feeds the evaluation process.

## Core teaching goals
- Explain why observability is required before serious evaluation
- Show what data must be captured from each assistant interaction
- Define a trace structure that makes debugging practical
- Show how production issues become reusable eval examples

## Main narrative
Once the assistant exists, the next problem is visibility. If a support answer is wrong, we need to know what the user asked, what the model saw, which tools were called, what data came back, how long it took, and where the breakdown happened. That trace becomes the foundation for debugging and for building stronger evals.

## Topics covered
- what to log from each assistant interaction
- request IDs and trace structure
- linking user input, tool calls, and final output
- latency measurement
- tool metadata and error signals
- failure categorization
- building a failure bank from real or synthetic incidents

## What learners should understand
- logging is not an afterthought; it is part of product quality
- traces should make it easy to replay and inspect a failure
- latency and tool behavior are quality signals, not just ops metrics
- eval datasets should come from real observed failure patterns

## Section artifact
An observability and failure-capture model that supports debugging and future evals.

## Chapters
1. `01_what_to_log`
2. `02_trace_and_event_structure`
3. `03_latency_and_tool_metadata`
4. `04_failure_capture_pipeline`
5. `05_section_recap_and_bridge_to_section_4`
