# Demo — Session 5b: Streamlit Demo UI

## What this demonstrates

Everything built in Sessions 1-5 (mock backend, tools, orchestration, grounded responses, safe fallback) is only useful if you can actually talk to it. This is the browser-facing chat UI that wraps `app/assistant.py:handle_message`.

## What was built

- `app/streamlit_app.py` — chat UI: renders conversation history, sends each new message to `handle_message()`, keeps a stable `thread_id` per browser session (via `st.session_state`) so multi-turn clarification (Session 4) works in the UI too.

## Prerequisites

- Sessions 0-5 complete.
- For an actual conversation: `OPENAI_API_KEY` set in `.env`.

## Run it — no API key needed (boot check)

```bash
uv run streamlit run app/streamlit_app.py --server.headless true --server.port 8765 &
sleep 5
curl -s -o /dev/null -w "HTTP status: %{http_code}\n" http://localhost:8765
pkill -f "streamlit run app/streamlit_app.py"
```

## Expected output

```
HTTP status: 200
```

with no traceback in the Streamlit startup log — confirms the app mounts and serves correctly. (Streamlit serves a JS app shell, so the page title won't appear in the raw HTML response — that's expected, not a failure signal.)

## Run it — live, once `OPENAI_API_KEY` is set

```bash
uv run streamlit run app/streamlit_app.py
```

Then open the printed local URL in a browser and chat with the assistant — try an existing shipment ID, an unknown one (should trigger the deterministic fallback from Session 5), and a vague message (should trigger a clarifying question).

## Done check (from BUILD_PLAN.md)

> can chat with the assistant through a browser locally.

**Status: app boots and serves successfully (verified above, no API key needed).** The actual chat exchange is pending `OPENAI_API_KEY` for a live run.
