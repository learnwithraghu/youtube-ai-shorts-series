# Learn AI in 2 Mins — Your Workflow

You only need to **record your voice**. Everything else is already in the repo.

## 5 steps

### 1. Open the voiceover script

```
series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/voiceover.md
```

Read it straight through. Target ~90 seconds.

### 2. Record your audio

Record on your phone or mic. Export as **MP3**.

### 3. Save the MP3 in the episode folder

```
series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/voiceover.mp3
```

That's it — one file, same folder as `voiceover.md`.

### 4. Trigger video creation (pick one)

**Option A — Terminal (no AI):**

```bash
npm run video:001
```

This automatically:
1. Transcribes your MP3 → `voiceover.vtt`
2. Syncs caption timing into `episode.yaml`
3. Renders the video

**Option B — AI tool in terminal:**

Open the episode folder and copy the prompt from:

```
series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/create-video.prompt.md
```

Paste it into Cursor / Claude Code / any AI terminal agent.

### 5. Get your video

Output file:

```
remotion/out/001_what-is-an-llm.mp4
```

1080×1920 vertical, ~90 seconds, your voice + infographic visuals.

Caption timing comes from your actual recording (`voiceover.vtt`), not hand-written timestamps.

---

## Episode folder (everything for one video)

```
episodes/001_what-is-an-llm/
├── voiceover.md              ← read & record from this
├── voiceover.mp3             ← you add this (step 3)
├── voiceover.vtt             ← auto-generated from MP3
├── create-video.prompt.md    ← copy-paste into AI (step 4)
├── episode.yaml              ← scene script (timing synced from VTT)
└── remotion-guide.md         ← technical reference (optional)
```

Series-wide visual pattern: [`series/learn-ai-in-2-mins/visual-style.md`](series/learn-ai-in-2-mins/visual-style.md)

---

## Commands cheat sheet

| Episode | Topic | Render command |
|---------|-------|----------------|
| 001 | What is an LLM? | `npm run video:001` |
| 002 | What is a Neural Network? | `npm run video:002` |
| 003 | AI vs ML vs Deep Learning | `npm run video:003` |
| 004 | What is Training? | `npm run video:004` |
| 005 | What is Inference? | `npm run video:005` |
| 006 | What is a Token? | `npm run video:006` |
| 007 | What are Embeddings? | `npm run video:007` |
| 008 | What is a Dataset? | `npm run video:008` |
| 009 | What is a Model Parameter? | `npm run video:009` |
| 010 | What is Supervised Learning? | `npm run video:010` |
| Any | — | `npm run video -- {episode-folder}` |

| What | Command |
|------|---------|
| Transcribe MP3 only | `cd remotion && npm run vtt -- 001_what-is-an-llm` |
| Preview (optional) | `cd remotion && npm run dev:001` |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Missing voiceover.mp3" | Save your recording as `voiceover.mp3` in the episode folder |
| No audio in video | Re-run render after adding MP3 — sync copies it automatically |
| Captions out of sync | Re-run render — VTT is regenerated from your MP3 each time |
| First render slow | Run `cd remotion && npm run setup:whisper` once (~150 MB model download) |
| Faster transcription | Set `OPENAI_API_KEY` in `remotion/.env` to use OpenAI Whisper API |
| Want to preview first | `cd remotion && npm run dev:001` |

---

## Future episodes

Same flow every time:

1. `voiceover.md` → record → `voiceover.mp3` in episode folder
2. Copy prompt from `create-video.prompt.md`
3. Run `npm run video -- {episode-folder}`

Each new episode gets its own `create-video.prompt.md` with the ready-to-use AI prompt.
