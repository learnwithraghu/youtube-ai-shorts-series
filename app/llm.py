"""Chat model factory for the assistant and (later) the eval judge."""

from __future__ import annotations

import os
from functools import lru_cache

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

DEFAULT_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")


@lru_cache(maxsize=4)
def get_chat_model(model: str = DEFAULT_MODEL, temperature: float = 0.0) -> ChatOpenAI:
    return ChatOpenAI(model=model, temperature=temperature)
