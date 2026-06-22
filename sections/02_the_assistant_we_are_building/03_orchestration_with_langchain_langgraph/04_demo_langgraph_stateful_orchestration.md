# Demo — Session 4: LangGraph Stateful Orchestration

## What this demonstrates

The lesson distinguishes stateful from stateless behavior. This demo proves the assistant can now hold a conversation: if a first message is missing information, the assistant can ask a clarifying question, and a *second* message in the same conversation can resolve it — because the graph's checkpointer keeps the prior turns around.

## What was built

- `app/state.py` — `AssistantState` (`messages` with the `add_messages` reducer, `intent`)
- `app/graph.py` — `StateGraph`: `route → agent ⇄ tools → end`, compiled with a `MemorySaver` checkpointer keyed by `thread_id`
- `app/assistant.py` *(refactored)* — `handle_message(message, thread_id="default")` now calls the compiled graph instead of running its own tool loop

## Prerequisites

- Sessions 0-3 complete.
- For the live run below: `OPENAI_API_KEY` set in `.env`.

## Run it — no API key needed (graph structure check)

```bash
uv run python -c "
import app.state, app.graph, app.assistant
print('imports OK')
print('graph type:', type(app.graph.COMPILED_GRAPH))
print('nodes:', list(app.graph.COMPILED_GRAPH.get_graph().nodes.keys()))
"
```

Expected output:

```
imports OK
graph type: <class 'langgraph.graph.state.CompiledStateGraph'>
nodes: ['__start__', 'route', 'agent', 'tools', '__end__']
```

## Run it — live, once `OPENAI_API_KEY` is set (multi-turn clarification)

```bash
uv run python -c "
from app.assistant import handle_message

# Turn 1: deliberately vague, missing the shipment ID
r1 = handle_message('What's going on with my package?', thread_id='demo-1')
print('Turn 1 intent:', r1['intent'])
print('Turn 1 reply:', r1['reply'])
print()

# Turn 2: same thread_id, now supplying the missing detail
r2 = handle_message('It's SHP-1002', thread_id='demo-1')
print('Turn 2 intent:', r2['intent'])
print('Turn 2 reply:', r2['reply'])
"
```

## Expected output

- Turn 1's reply should be a clarifying question (no tool call possible without a shipment ID).
- Turn 2's reply should resolve the request using `SHP-1002`'s actual record (delayed, customs hold) — proving the graph remembered turn 1 via the `thread_id` checkpointer.

## Done check (from BUILD_PLAN.md)

> multi-turn scenario with missing info → clarification → resolution works end-to-end.

**Status: graph compiles and node structure verified without API calls. Live multi-turn run pending — no `OPENAI_API_KEY` configured yet.** Run the live command above once the key is added to `.env`.
