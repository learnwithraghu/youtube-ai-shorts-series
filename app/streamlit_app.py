"""Streamlit chat UI for the shipping support assistant."""

from __future__ import annotations

import uuid

import streamlit as st

from app.assistant import handle_message

st.set_page_config(page_title="Shipping Support Assistant", page_icon="📦")
st.title("📦 Shipping Support Assistant")
st.caption(
    "Ask about shipment tracking, delays, refunds, customs, or ask to speak with a human."
)

if "thread_id" not in st.session_state:
    st.session_state.thread_id = str(uuid.uuid4())
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

for turn in st.session_state.chat_history:
    with st.chat_message(turn["role"]):
        st.markdown(turn["content"])

user_message = st.chat_input("How can I help with your shipment?")

if user_message:
    st.session_state.chat_history.append({"role": "user", "content": user_message})
    with st.chat_message("user"):
        st.markdown(user_message)

    with st.chat_message("assistant"):
        with st.spinner("Looking into it..."):
            result = handle_message(user_message, thread_id=st.session_state.thread_id)
        st.markdown(result["reply"])
        if result.get("intent"):
            st.caption(f"Detected intent: `{result['intent']}`")

    st.session_state.chat_history.append({"role": "assistant", "content": result["reply"]})
