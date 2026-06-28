# Create Video — Episode 009

**When to use:** After you've saved `voiceover.mp3` in this folder.

Copy everything in the box below into your AI terminal tool (Cursor, Claude Code, etc.).

---

## Prompt (copy from here)

```
Create the YouTube Short video for Episode 009: "What is a Model Parameter?"

My voiceover is ready at:
series/learn-ai-in-2-mins/episodes/009_what-is-a-model-parameter/voiceover.mp3

From the repo root, run:
npm run video:009

This should:
- Sync episode.yaml and my voiceover.mp3 into Remotion
- Render remotion/out/009_what-is-a-model-parameter.mp4 (1080x1920, ~90 seconds)
- Use my voiceover as the audio track over the infographic visuals

The scene script is in episode.yaml in this same folder. Do not change the script unless render fails.

If render fails, diagnose and fix, then re-run npm run video:009.
When done, confirm the output file exists and tell me the path.
```

---

## Manual alternative (no AI)

```bash
npm run video:009
```

Output: `remotion/out/009_what-is-a-model-parameter.mp4`
