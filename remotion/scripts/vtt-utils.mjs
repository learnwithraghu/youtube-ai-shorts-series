/**
 * Shared helpers for VTT caption files and episode timing.
 */

/** @param {number} ms */
export function msToVttTime(ms) {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  const msPart = ms % 1_000;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(msPart).padStart(3, "0")}`;
}

/** @param {string} vttTime */
export function vttTimeToMs(vttTime) {
  const [h, m, rest] = vttTime.trim().split(":");
  const [s, ms = "0"] = rest.split(".");
  return (
    Number(h) * 3_600_000 +
    Number(m) * 60_000 +
    Number(s) * 1_000 +
    Number(ms.padEnd(3, "0").slice(0, 3))
  );
}

/**
 * @param {Array<{ text: string, startMs: number, endMs: number }>} captions
 */
export function captionsToVtt(captions) {
  let vtt = "WEBVTT\n\n";
  for (const cap of captions) {
    const text = cap.text.trim();
    if (!text) continue;
    vtt += `${msToVttTime(cap.startMs)} --> ${msToVttTime(cap.endMs)}\n${text}\n\n`;
  }
  return vtt;
}

/**
 * @param {string} vtt
 * @returns {Array<{ text: string, startMs: number, endMs: number }>}
 */
export function parseVtt(vtt) {
  const cues = [];
  const blocks = vtt.replace(/^\uFEFF?WEBVTT[^\n]*\n/i, "").trim().split(/\n\n+/);

  for (const block of blocks) {
    const lines = block.split("\n").filter(Boolean);
    if (lines.length < 2) continue;

    const timingLine = lines.find((l) => l.includes("-->"));
    if (!timingLine) continue;

    const [startRaw, endRaw] = timingLine.split("-->").map((s) => s.trim().split(" ")[0]);
    const textLines = lines.filter((l) => l !== timingLine && !/^\d+$/.test(l));
    const text = textLines.join(" ").trim();
    if (!text) continue;

    cues.push({
      text,
      startMs: vttTimeToMs(startRaw),
      endMs: vttTimeToMs(endRaw),
    });
  }

  return cues;
}

/** @param {string} text */
export function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Merge word-level captions into readable on-screen chunks.
 * @param {Array<{ text: string, startMs: number, endMs: number }>} wordCaptions
 */
export function groupCaptionsForDisplay(wordCaptions, { maxWords = 7, maxDurationMs = 4500, minDurationMs = 800 } = {}) {
  if (wordCaptions.length === 0) return [];

  /** @type {Array<{ text: string, startMs: number, endMs: number }>} */
  const grouped = [];
  /** @type {Array<{ text: string, startMs: number, endMs: number }>} */
  let bucket = [];

  const flush = () => {
    if (bucket.length === 0) return;
    grouped.push({
      text: bucket.map((w) => w.text.trim()).join(" ").replace(/\s+/g, " "),
      startMs: bucket[0].startMs,
      endMs: bucket[bucket.length - 1].endMs,
    });
    bucket = [];
  };

  for (const cap of wordCaptions) {
    const next = [...bucket, cap];
    const duration = cap.endMs - (bucket[0]?.startMs ?? cap.startMs);
    const endsSentence = /[.!?]$/.test(cap.text.trim());

    if (
      bucket.length > 0 &&
      (next.length > maxWords || duration > maxDurationMs || endsSentence)
    ) {
      flush();
    }

    bucket.push(cap);

    if (endsSentence || bucket.length >= maxWords) {
      flush();
    }
  }

  flush();
  return grouped.map((cap) => ({
    ...cap,
    endMs: Math.max(cap.endMs, cap.startMs + minDurationMs),
  }));
}

/**
 * Scale scene durations to match actual audio length.
 * @param {Array<{ durationMs: number }>} scenes
 */
export function scaleSceneDurations(scenes, actualDurationMs) {
  const planned = scenes.reduce((sum, s) => sum + s.durationMs, 0);
  if (planned <= 0) return actualDurationMs;

  const scale = actualDurationMs / planned;
  const scaled = scenes.map((s) => ({
    ...s,
    durationMs: Math.max(1000, Math.round(s.durationMs * scale)),
  }));

  const scaledTotal = scaled.reduce((sum, s) => sum + s.durationMs, 0);
  const drift = actualDurationMs - scaledTotal;
  if (drift !== 0 && scaled.length > 0) {
    scaled[scaled.length - 1].durationMs += drift;
  }

  return scaled;
}

/**
 * Assign VTT cues to scenes and convert to scene-relative caption timing.
 * @param {Array<{ durationMs: number, captions?: Array<{ text: string, startMs: number, endMs: number }> }>} scenes
 * @param {Array<{ text: string, startMs: number, endMs: number }>} vttCues
 */
export function applyVttToScenes(scenes, vttCues) {
  const actualDurationMs = vttCues.at(-1)?.endMs ?? scenes.reduce((s, sc) => s + sc.durationMs, 0);
  const scaledScenes = scaleSceneDurations(scenes, actualDurationMs);

  let sceneStartMs = 0;
  return scaledScenes.map((scene) => {
    const sceneEndMs = sceneStartMs + scene.durationMs;
    const inScene = vttCues.filter(
      (c) => c.startMs >= sceneStartMs - 100 && c.startMs < sceneEndMs,
    );
    const grouped = groupCaptionsForDisplay(inScene);

    const captions =
      grouped.length > 0
        ? grouped.map((c) => ({
            text: c.text,
            startMs: Math.max(0, c.startMs - sceneStartMs),
            endMs: Math.min(scene.durationMs, c.endMs - sceneStartMs),
          }))
        : scene.captions;

    sceneStartMs = sceneEndMs;
    return { ...scene, captions };
  });
}
