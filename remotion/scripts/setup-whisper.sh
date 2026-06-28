#!/usr/bin/env bash
# One-time setup for local MP3 → VTT transcription (Python Whisper).
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -d ".venv-whisper" ]; then
  echo "Creating Python venv…"
  python3 -m venv .venv-whisper
fi

echo "Installing openai-whisper…"
.venv-whisper/bin/pip install -q openai-whisper

echo "Done. Local transcription ready."
