#!/usr/bin/env node
/**
 * Transcribe voiceover.mp3 → voiceover.vtt in the episode folder.
 *
 * Uses OpenAI Whisper API when OPENAI_API_KEY is set, otherwise local
 * Whisper.cpp via @remotion/install-whisper-cpp (first run downloads the model).
 *
 * Usage: node scripts/mp3-to-vtt.mjs 001_what-is-an-llm
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import ffmpegStatic from "ffmpeg-static";
import { captionsToVtt, groupCaptionsForDisplay } from "./vtt-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const remotionRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(remotionRoot, "..");
const episodesRoot = path.join(repoRoot, "series", "learn-ai-in-2-mins", "episodes");

const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/mp3-to-vtt.mjs 001_what-is-an-llm");
  process.exit(1);
}

const episodeDir = path.join(episodesRoot, folder);
const mp3Path = path.join(episodeDir, "voiceover.mp3");
const vttPath = path.join(episodeDir, "voiceover.vtt");
const wavPath = path.join(episodeDir, ".voiceover-16k.wav");

if (!fs.existsSync(mp3Path)) {
  console.error("Missing voiceover.mp3:");
  console.error(`  ${mp3Path}`);
  process.exit(1);
}

/** @returns {Promise<Array<{ text: string, startMs: number, endMs: number }>>} */
async function transcribeWithOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const { openAiWhisperApiToCaptions } = await import("@remotion/openai-whisper");

  console.log("Transcribing with OpenAI Whisper API…");

  const audioBytes = fs.readFileSync(mp3Path);
  const form = new FormData();
  form.append("file", new Blob([audioBytes], { type: "audio/mpeg" }), "voiceover.mp3");
  form.append("model", "whisper-1");
  form.append("response_format", "verbose_json");
  form.append("timestamp_granularities[]", "word");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!response.ok) {
    throw new Error(`OpenAI transcription failed: ${response.status} ${await response.text()}`);
  }

  const transcription = await response.json();
  const { captions } = openAiWhisperApiToCaptions({ transcription });
  return captions;
}

/** @returns {Promise<Array<{ text: string, startMs: number, endMs: number }>>} */
async function transcribeWithPythonWhisper() {
  const venvPython = path.join(remotionRoot, ".venv-whisper", "bin", "python3");
  const python = fs.existsSync(venvPython) ? venvPython : "python3";

  if (!ffmpegStatic) {
    throw new Error("ffmpeg-static binary not found");
  }

  console.log("Converting MP3 → 16kHz WAV for Whisper…");
  execSync(
    `"${ffmpegStatic}" -y -i "${mp3Path}" -ar 16000 -ac 1 -c:a pcm_s16le "${wavPath}"`,
    { stdio: "inherit" },
  );

  const scriptPath = path.join(remotionRoot, "scripts", "whisper-to-json.py");
  const jsonPath = path.join(episodeDir, ".voiceover-whisper.json");

  console.log("Transcribing with Python openai-whisper…");
  execSync(`"${python}" "${scriptPath}" "${wavPath}" "${jsonPath}"`, {
    stdio: "inherit",
    cwd: remotionRoot,
  });

  return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
}

/** @returns {Promise<Array<{ text: string, startMs: number, endMs: number }>>} */
async function transcribeWithWhisperCpp() {
  const {
    downloadWhisperModel,
    installWhisperCpp,
    transcribe,
    toCaptions,
  } = await import("@remotion/install-whisper-cpp");

  const whisperDir = path.join(remotionRoot, ".whisper-cpp");
  const version = "1.5.5";
  const model = "base.en";

  if (!fs.existsSync(path.join(whisperDir, "main"))) {
    console.log("Installing Whisper.cpp (one-time setup)…");
    await installWhisperCpp({ to: whisperDir, version });
    await downloadWhisperModel({ model, folder: whisperDir });
  }

  if (!ffmpegStatic) {
    throw new Error("ffmpeg-static binary not found — cannot convert MP3 to WAV");
  }

  console.log("Converting MP3 → 16kHz WAV…");
  execSync(
    `"${ffmpegStatic}" -y -i "${mp3Path}" -ar 16000 -ac 1 -c:a pcm_s16le "${wavPath}"`,
    { stdio: "inherit" },
  );

  console.log("Transcribing with local Whisper.cpp…");
  const whisperCppOutput = await transcribe({
    model,
    whisperPath: whisperDir,
    whisperCppVersion: version,
    inputPath: wavPath,
    tokenLevelTimestamps: true,
  });

  const { captions } = toCaptions({ whisperCppOutput });
  return captions;
}

async function main() {
  let wordCaptions = await transcribeWithOpenAI();
  if (!wordCaptions) {
    try {
      wordCaptions = await transcribeWithPythonWhisper();
    } catch (pyErr) {
      console.warn("Python whisper failed:", pyErr.message);
      throw new Error(
        "Transcription failed. Set OPENAI_API_KEY in remotion/.env for cloud Whisper, " +
          "or run: cd remotion && python3 -m venv .venv-whisper && .venv-whisper/bin/pip install openai-whisper",
      );
    }
  }

  const displayCaptions = groupCaptionsForDisplay(wordCaptions);
  const vtt = captionsToVtt(displayCaptions);
  fs.writeFileSync(vttPath, vtt);

  if (fs.existsSync(wavPath)) {
    fs.unlinkSync(wavPath);
  }

  const whisperJson = path.join(episodeDir, ".voiceover-whisper.json");
  if (fs.existsSync(whisperJson)) {
    fs.unlinkSync(whisperJson);
  }

  const durationSec = ((wordCaptions.at(-1)?.endMs ?? 0) / 1000).toFixed(1);
  console.log(`Wrote ${displayCaptions.length} cues → ${vttPath} (${durationSec}s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
