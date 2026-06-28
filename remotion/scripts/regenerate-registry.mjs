#!/usr/bin/env node
/**
 * Regenerates episodeRegistry.ts from synced JSON files in src/generated/
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const remotionRoot = path.resolve(__dirname, "..");
const generatedDir = path.join(remotionRoot, "src", "generated");
const outPath = path.join(remotionRoot, "src", "episodeRegistry.ts");

const folders = fs
  .readdirSync(generatedDir)
  .filter((f) => f.endsWith(".json") && !f.endsWith(".meta.json"))
  .map((f) => f.replace(".json", ""))
  .sort();

const toVar = (folder) => folder.replace(/[^a-zA-Z0-9]/g, "_");

const imports = folders.flatMap((folder) => {
  const v = toVar(folder);
  return [
    `import episode_${v} from "./generated/${folder}.json";`,
    `import meta_${v} from "./generated/${folder}.meta.json";`,
  ];
});

const episodeEntries = folders.map((f) => `  "${f}": episode_${toVar(f)} as EpisodeScript,`).join("\n");
const metaEntries = folders.map((f) => `  "${f}": meta_${toVar(f)} as EpisodeMeta,`).join("\n");

const content = `${imports.join("\n")}
import { EpisodeScript } from "./types";

type EpisodeMeta = {
  hasVoiceover: boolean;
};

const episodes: Record<string, EpisodeScript> = {
${episodeEntries}
};

const meta: Record<string, EpisodeMeta> = {
${metaEntries}
};

export const getEpisodeData = (episodeFolder: string): EpisodeScript => {
  const episode = episodes[episodeFolder];
  if (!episode) {
    throw new Error(
      \`Episode "\${episodeFolder}" not synced. Run: npm run sync -- \${episodeFolder}\`,
    );
  }
  return episode;
};

export const getEpisodeMeta = (episodeFolder: string): EpisodeMeta =>
  meta[episodeFolder] ?? { hasVoiceover: false };

export const getTotalDurationMs = (episode: EpisodeScript) =>
  episode.scenes.reduce((sum, scene) => sum + scene.durationMs, 0);

export const getSceneStartMs = (episode: EpisodeScript, sceneIndex: number) =>
  episode.scenes
    .slice(0, sceneIndex)
    .reduce((sum, scene) => sum + scene.durationMs, 0);

export const listEpisodeFolders = (): string[] => Object.keys(episodes).sort();
`;

fs.writeFileSync(outPath, content);
console.log(`Regenerated episodeRegistry.ts (${folders.length} episodes)`);
