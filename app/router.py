"""Intent routing for the shipping support assistant.

Plain LLM-based classification for now — this is the "simple intents" half of
the orchestration split described in the course; the stateful/multi-turn
parts (clarification, escalation loops) move to a LangGraph StateGraph in a
later session.
"""

from __future__ import annotations

from typing import Literal

from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import BaseModel, Field

from app.llm import get_chat_model
from app.prompts import INTENT_DESCRIPTIONS

Intent = Literal["tracking", "delay", "refund", "customs", "escalation", "other"]


class IntentClassification(BaseModel):
    intent: Intent = Field(description="The single best-matching support intent for the message.")


def _routing_system_prompt() -> str:
    descriptions = "\n".join(f"- {name}: {desc}" for name, desc in INTENT_DESCRIPTIONS.items())
    return (
        "Classify the customer's message into exactly one of the following "
        "support intents:\n"
        f"{descriptions}\n"
        "Pick 'other' only if none of the specific intents clearly apply."
    )


def classify_intent(message: str) -> Intent:
    llm = get_chat_model().with_structured_output(IntentClassification)
    result = llm.invoke(
        [
            SystemMessage(content=_routing_system_prompt()),
            HumanMessage(content=message),
        ]
    )
    return result.intent
