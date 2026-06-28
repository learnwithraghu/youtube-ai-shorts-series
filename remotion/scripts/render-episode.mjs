#!/usr/bin/env node
/**
 * Render an episode video. Syncs script + voiceover first.
 * Usage: node scripts/render-episode.mjs 001_what-is-an-llm
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const remotionRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(remotionRoot, "..");

const folder = process.argv[2];

if (!folder) {
  console.error("Usage: npm run render -- 001_what-is-an-llm [out/custom-name.mp4]");
  process.exit(1);
}

const voiceoverPath = path.join(
  repoRoot,
  "series",
  "learn-ai-in-2-mins",
  "episodes",
  folder,
  "voiceover.mp3",
);

if (!fs.existsSync(voiceoverPath)) {
  console.error("Missing voiceover.mp3. Add your recording here first:");
  console.error(`  ${voiceoverPath}`);
  process.exit(1);
}

console.log("\n→ Transcribing voiceover.mp3 → voiceover.vtt");
execSync(`node scripts/mp3-to-vtt.mjs ${folder}`, {
  cwd: remotionRoot,
  stdio: "inherit",
});

console.log("\n→ Syncing VTT timings into episode.yaml");
execSync(`node scripts/apply-vtt-to-episode.mjs ${folder}`, {
  cwd: remotionRoot,
  stdio: "inherit",
});

execSync(`node scripts/sync-episodes.mjs ${folder}`, {
  cwd: remotionRoot,
  stdio: "inherit",
});

const outFile = process.argv[3] ?? `out/${folder}.mp4`;
const props = JSON.stringify({ episodeFolder: folder });

execSync(
  `npx remotion render Episode001 ${outFile} --props='${props}'`,
  { cwd: remotionRoot, stdio: "inherit" },
);

console.log(`\nDone: remotion/${outFile}`);
