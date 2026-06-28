#!/usr/bin/env node
/**
 * Apply voiceover.vtt timings to episode.yaml captions and scene durations.
 * Usage: node scripts/apply-vtt-to-episode.mjs 001_what-is-an-llm
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { load as loadYaml, dump as dumpYaml } from "js-yaml";
import { applyVttToScenes, parseVtt } from "./vtt-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const remotionRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(remotionRoot, "..");
const episodesRoot = path.join(repoRoot, "series", "learn-ai-in-2-mins", "episodes");

const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/apply-vtt-to-episode.mjs 001_what-is-an-llm");
  process.exit(1);
}

const episodeDir = path.join(episodesRoot, folder);
const yamlPath = path.join(episodeDir, "episode.yaml");
const vttPath = path.join(episodeDir, "voiceover.vtt");

if (!fs.existsSync(vttPath)) {
  console.error("Missing voiceover.vtt — run mp3-to-vtt first:");
  console.error(`  node scripts/mp3-to-vtt.mjs ${folder}`);
  process.exit(1);
}

if (!fs.existsSync(yamlPath)) {
  console.error(`Missing: ${yamlPath}`);
  process.exit(1);
}

const episode = loadYaml(fs.readFileSync(yamlPath, "utf8"));
const vttCues = parseVtt(fs.readFileSync(vttPath, "utf8"));

if (vttCues.length === 0) {
  console.error("No cues found in voiceover.vtt");
  process.exit(1);
}

const actualDurationMs = vttCues.at(-1).endMs;
episode.episode.targetDurationMs = actualDurationMs;
episode.scenes = applyVttToScenes(episode.scenes, vttCues);

fs.writeFileSync(
  yamlPath,
  dumpYaml(episode, { lineWidth: 120, noRefs: true, quotingType: '"', forceQuotes: false }),
);

console.log(
  `Updated ${yamlPath} — ${vttCues.length} VTT cues, ${(actualDurationMs / 1000).toFixed(1)}s total`,
);
