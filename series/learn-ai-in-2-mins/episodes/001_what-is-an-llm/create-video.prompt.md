# Create Video — Episode 001

**When to use:** After you've saved `voiceover.mp3` in this folder.

Copy everything in the box below into your AI terminal tool (Cursor, Claude Code, etc.).

---

## Prompt (copy from here)

```
Create the YouTube Short video for Episode 001: "What is an LLM?"

My voiceover is ready at:
series/learn-ai-in-2-mins/episodes/001_what-is-an-llm/voiceover.mp3

## Workflow (follow in order)

1. Transcribe my MP3 → VTT (accurate caption timing from my actual recording):
   cd remotion && npm run vtt:001

2. Apply VTT timings to episode.yaml (captions + scene durations):
   node scripts/apply-vtt-to-episode.mjs 001_what-is-an-llm

3. Render the video:
   cd .. && npm run video:001

   Or all-in-one from repo root: npm run video:001
   (render automatically runs steps 1–2 before syncing and rendering)

## Visual style (keep consistent across the course)

Read and follow: series/learn-ai-in-2-mins/visual-style.md

Every episode uses the same five-scene arc and animation language:
- Scene 1 `series_intro` — branded card on gradient_dark_blue, floating icons
- Scene 2 `question_hook` — split layout, icon left + headline right, episode badge
- Scene 3 `concept_explain` — infographic_stack on gradient_purple_blue, staggered steps
- Scene 4 `key_takeaway` — summary card, 3 bullets max
- Scene 5 `series_outro` — branded card, follow CTA + next episode teaser

Animations: fadeIn, slideUp, slideLeft, scaleIn, pulse, highlight only.
Do not change the visual pattern — only sync timing from voiceover.vtt.

Episode-specific visual spec: remotion-guide.md in this folder.

## Output

- voiceover.vtt — generated captions from my recording
- remotion/out/001_what-is-an-llm.mp4 — 1080×1920 vertical video

If render fails, diagnose and fix, then re-run npm run video:001.
When done, confirm voiceover.vtt and the output MP4 exist and tell me the paths.
```

---

## Manual alternative (no AI)

```bash
npm run video:001
```

Output: `remotion/out/001_what-is-an-llm.mp4`

Intermediate: `voiceover.vtt` (auto-generated from your MP3)
