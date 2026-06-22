# Demo — Session 0: Repo & Tooling Bootstrap

## What this demonstrates

Every later session (mock backend, tools, assistant, evals, CI) needs a working Python environment with the right dependencies. This session stands that up with `uv`.

## What was built

- `pyproject.toml` — project deps (`langchain`, `langgraph`, `langchain-openai`, `deepeval`, `streamlit`, `langsmith`, `python-dotenv`, `jinja2`, `pytest`, `typing-extensions`)
- `.python-version` — pinned to `3.11`
- `.gitignore` — `.venv/`, `.env`, caches, etc.
- `.env.example` — documents `OPENAI_API_KEY`, `LANGSMITH_API_KEY`, `LANGSMITH_PROJECT`, `LANGCHAIN_TRACING_V2`
- `docs/setup.md` — the setup walkthrough this demo is based on

## Prerequisites

- Python 3.11+ and `uv` installed.

## Run it

```bash
uv sync
```

```bash
uv run python -c "import langchain, langgraph, deepeval, streamlit"
```

## Expected output

- `uv sync` resolves and installs all dependencies with no errors, creates `.venv/` and `uv.lock`.
- The import check prints nothing and exits with code `0` — no traceback means every core package is importable.

## Done check (from BUILD_PLAN.md)

> `uv sync` works; `python -c "import langchain, langgraph, deepeval, streamlit"` succeeds.

**Status: verified.** Both commands were run and passed when this session was built.
