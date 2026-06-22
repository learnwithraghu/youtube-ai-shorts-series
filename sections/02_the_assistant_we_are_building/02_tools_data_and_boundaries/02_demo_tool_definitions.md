# Demo — Session 2: Tool Definitions

## What this demonstrates

Tools are what let the assistant act and verify, instead of guessing. This demo runs each tool directly — the same way the assistant's orchestration layer will call them — including escalation actually writing a ticket record, proving the human-handoff path is real and not just a stub.

## What was built

- `tools/shipment_lookup.py` — `shipment_lookup` tool
- `tools/order_history.py` — `order_history` tool
- `tools/policy_lookup.py` — `policy_lookup` tool (plus a non-LLM-facing `policy_lookup_by_id` helper)
- `tools/escalation.py` — `escalation` tool, writes tickets to `data/backend/tickets.json`
- `tools/__init__.py` — exports `ALL_TOOLS`

## Prerequisites

- Sessions 0-1 complete.

## Run it

```bash
uv run python -c "
from tools import ALL_TOOLS, shipment_lookup, order_history, policy_lookup, escalation

print('ALL_TOOLS:', [t.name for t in ALL_TOOLS])

print()
print('shipment_lookup found:', shipment_lookup.invoke({'shipment_id': 'SHP-1002'})['found'])
print('shipment_lookup missing:', shipment_lookup.invoke({'shipment_id': 'SHP-9999'}))

print()
print('order_history found:', order_history.invoke({'customer_id': 'CUST-200'}))
print('order_history missing:', order_history.invoke({'customer_id': 'CUST-999'}))

print()
print('policy_lookup found topics:', [p['topic'] for p in policy_lookup.invoke({'topic': 'refund'})['policies']])
print('policy_lookup bad topic:', policy_lookup.invoke({'topic': 'bogus'}))

print()
result = escalation.invoke({'customer_id': 'CUST-203', 'reason': 'lost_in_transit', 'summary': 'Customer wants refund for lost shipment', 'shipment_id': 'SHP-1005'})
print('escalation result:', result)
"
```

## Expected output

```
ALL_TOOLS: ['shipment_lookup', 'order_history', 'policy_lookup', 'escalation']

shipment_lookup found: True
shipment_lookup missing: {'found': False, 'error': "No shipment found with ID 'SHP-9999'."}

order_history found: {'found': True, 'customer_id': 'CUST-200', 'name': 'Avery Chen', ...}
order_history missing: {'found': False, 'error': "No customer found with ID 'CUST-999'."}

policy_lookup found topics: ['refund']
policy_lookup bad topic: {'found': False, 'error': "'bogus' is not a recognized policy topic. ..."}

escalation result: {'created': True, 'ticket': {'ticket_id': 'TICKET-0001', ...}}
```

After running this, `data/backend/tickets.json` will contain the ticket the escalation call created. Reset it back to an empty list when you're done demoing, so the repo's tracked fixture stays clean:

```bash
echo '[]' > data/backend/tickets.json
```

## Done check (from BUILD_PLAN.md)

> each tool callable directly, escalation produces a ticket record.

**Status: verified.** This exact command was run when this session was built; the escalation call produced `TICKET-0001` in `data/backend/tickets.json`, which was then reset to `[]`.
