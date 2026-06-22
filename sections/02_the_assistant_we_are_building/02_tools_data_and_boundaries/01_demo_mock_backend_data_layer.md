# Demo — Session 1: Mock Backend Data Layer

## What this demonstrates

This section's lesson is about what backend data the assistant can trust, and that it should never invent data it doesn't have. This demo proves the data layer backs that up: looking up a real ID returns a typed record, looking up a missing ID returns a clean `None` — never a guess.

## What was built

- `data/backend/shipments.json` — 5 shipments covering in-transit, delayed, delivered, and exception statuses
- `data/backend/customers.json` — 4 customers, each linked to their shipments
- `data/backend/policies.json` — 5 policies (refund, delay, customs, escalation, general)
- `tools/backend_store.py` — typed loaders (`get_shipment`, `get_customer`, `get_policy`, `find_policies_by_topic`)

## Prerequisites

- Session 0 complete (`uv sync` already run).

## Run it

```bash
uv run python -c "
from tools.backend_store import get_shipment, get_customer, get_policy

s = get_shipment('SHP-1001')
print('found shipment:', s.shipment_id, s.status)

missing = get_shipment('SHP-9999')
print('missing shipment returns:', missing)

c = get_customer('CUST-200')
print('found customer:', c.name)

missing_c = get_customer('CUST-999')
print('missing customer returns:', missing_c)

p = get_policy('POL-REFUND-001')
print('found policy:', p.topic)

missing_p = get_policy('POL-FAKE')
print('missing policy returns:', missing_p)
"
```

## Expected output

```
found shipment: SHP-1001 in_transit
missing shipment returns: None
found customer: Avery Chen
missing customer returns: None
found policy: refund
missing policy returns: None
```

## Done check (from BUILD_PLAN.md)

> lookups for an existing and a missing ID both behave correctly, no fabrication.

**Status: verified.** This exact command was run when this session was built, with the output above.
