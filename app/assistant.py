"""Baseline assistant entrypoint: route intent, then run a bounded tool-calling loop."""

from __future__ import annotations

import json

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage, ToolMessage

from app.llm import get_chat_model
from app.prompts import SYSTEM_PROMPT
from app.router import classify_intent
from tools import ALL_TOOLS

MAX_TOOL_ITERATIONS = 3

TOOLS_BY_NAME = {t.name: t for t in ALL_TOOLS}


def handle_message(message: str) -> dict:
    """Classify intent, then let the model call tools until it has a grounded answer."""
    intent = classify_intent(message)

    llm = get_chat_model().bind_tools(ALL_TOOLS)
    messages: list[BaseMessage] = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=message),
    ]

    response: AIMessage = llm.invoke(messages)
    messages.append(response)

    for _ in range(MAX_TOOL_ITERATIONS):
        if not response.tool_calls:
            break
        for call in response.tool_calls:
            tool = TOOLS_BY_NAME[call["name"]]
            result = tool.invoke(call["args"])
            messages.append(ToolMessage(content=json.dumps(result), tool_call_id=call["id"]))
        response = llm.invoke(messages)
        messages.append(response)

    return {"intent": intent, "reply": response.content, "messages": messages}
