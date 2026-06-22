# Demo — Session 3: Baseline Assistant Orchestration

## What this demonstrates

This is the first version of "the assistant is a workflow, not just a prompt": a message comes in, gets classified into one of the 5 supported intents, and the model is given tools to ground its answer instead of guessing. This is the pre-LangGraph baseline — a single request/response pass, no multi-turn state yet (that's Session 4).

## What was built

- `app/llm.py` — cached `ChatOpenAI` factory, reads `OPENAI_API_KEY` / `OPENAI_MODEL` from `.env`
- `app/prompts.py` — `SYSTEM_PROMPT` (grounding rules + escalation triggers) and `INTENT_DESCRIPTIONS` for the 5 intents (tracking, delay, refund, customs, escalation) plus `other`
- `app/router.py` — `classify_intent(message)`, structured LLM output into one `Intent`
- `app/assistant.py` *(this version, before Session 4's refactor)* — `handle_message(message)`: classify intent → bind `ALL_TOOLS` → bounded tool-calling loop (max 3 iterations) → grounded reply

## Prerequisites

- Sessions 0-2 complete.
- For the live run below: `OPENAI_API_KEY` set in `.env` (copy `.env.example` → `.env` and fill it in — see `docs/setup.md`).

## Run it — no API key needed (import/sanity check)

```bash
uv run python -c "
import app.llm, app.prompts, app.router, app.assistant
print('imports OK')
print('SYSTEM_PROMPT length:', len(app.prompts.SYSTEM_PROMPT))
print('intents:', list(app.prompts.INTENT_DESCRIPTIONS.keys()))
"
```

Expected output:

```
imports OK
SYSTEM_PROMPT length: 878
intents: ['tracking', 'delay', 'refund', 'customs', 'escalation', 'other']
```

## Run it — live, once `OPENAI_API_KEY` is set

One hardcoded message per intent, each should route correctly and respond grounded in tool data:

```bash
uv run python -c "
from app.assistant import handle_message

for msg in [
    'Where is my shipment SHP-1001?',                          # tracking
    'Why is shipment SHP-1002 delayed?',                       # delay
    'Can I get a refund for shipment SHP-1005, it was lost?',  # refund
    'My shipment SHP-1002 is stuck in customs, what do I do?', # customs
    'I want to talk to a human about my order.',               # escalation
]:
    result = handle_message(msg)
    print(result['intent'], '->', result['reply'])
    print()
"
```

## Expected output

Each line should print the correct intent label, followed by a reply grounded in the matching shipment/policy data from `data/backend/`. The escalation message should result in a ticket being created (`tools/escalation.py`).

## Done check (from BUILD_PLAN.md)

> 5 hardcoded messages (one per intent: tracking/delay/refund/customs/escalation) route and respond correctly.

**Status: code written and import-checked. Live run pending — no `OPENAI_API_KEY` configured yet.** Run the live command above once the key is added to `.env`.
