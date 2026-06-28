#!/usr/bin/env python3
"""Transcribe 16kHz WAV audio to word-level JSON captions. Used by mp3-to-vtt.mjs."""
import json
import sys
import wave

import numpy as np
import whisper


def load_wav(path: str) -> np.ndarray:
    with wave.open(path, "rb") as wf:
        frames = wf.readframes(wf.getnframes())
        audio = np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0
    return audio


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: whisper-to-json.py input.wav output.json", file=sys.stderr)
        sys.exit(1)

    input_path, output_path = sys.argv[1:3]
    model = whisper.load_model("base.en")
    audio = load_wav(input_path)
    result = model.transcribe(audio, word_timestamps=True, fp16=False)

    captions = []
    for segment in result.get("segments", []):
        for word in segment.get("words", []):
            text = word.get("word", "").strip()
            if not text:
                continue
            captions.append(
                {
                    "text": text,
                    "startMs": int(word["start"] * 1000),
                    "endMs": int(word["end"] * 1000),
                }
            )

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(captions, f)


if __name__ == "__main__":
    main()
