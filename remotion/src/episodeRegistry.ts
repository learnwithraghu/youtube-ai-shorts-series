import episode_001_what_is_an_llm from "./generated/001_what-is-an-llm.json";
import meta_001_what_is_an_llm from "./generated/001_what-is-an-llm.meta.json";
import episode_002_what_is_a_neural_network from "./generated/002_what-is-a-neural-network.json";
import meta_002_what_is_a_neural_network from "./generated/002_what-is-a-neural-network.meta.json";
import episode_003_ai_vs_ml_vs_deep_learning from "./generated/003_ai-vs-ml-vs-deep-learning.json";
import meta_003_ai_vs_ml_vs_deep_learning from "./generated/003_ai-vs-ml-vs-deep-learning.meta.json";
import episode_004_what_is_training from "./generated/004_what-is-training.json";
import meta_004_what_is_training from "./generated/004_what-is-training.meta.json";
import episode_005_what_is_inference from "./generated/005_what-is-inference.json";
import meta_005_what_is_inference from "./generated/005_what-is-inference.meta.json";
import episode_006_what_is_a_token from "./generated/006_what-is-a-token.json";
import meta_006_what_is_a_token from "./generated/006_what-is-a-token.meta.json";
import episode_007_what_are_embeddings from "./generated/007_what-are-embeddings.json";
import meta_007_what_are_embeddings from "./generated/007_what-are-embeddings.meta.json";
import episode_008_what_is_a_dataset from "./generated/008_what-is-a-dataset.json";
import meta_008_what_is_a_dataset from "./generated/008_what-is-a-dataset.meta.json";
import episode_009_what_is_a_model_parameter from "./generated/009_what-is-a-model-parameter.json";
import meta_009_what_is_a_model_parameter from "./generated/009_what-is-a-model-parameter.meta.json";
import episode_010_what_is_supervised_learning from "./generated/010_what-is-supervised-learning.json";
import meta_010_what_is_supervised_learning from "./generated/010_what-is-supervised-learning.meta.json";
import { EpisodeScript } from "./types";

type EpisodeMeta = {
  hasVoiceover: boolean;
};

const episodes: Record<string, EpisodeScript> = {
  "001_what-is-an-llm": episode_001_what_is_an_llm as EpisodeScript,
  "002_what-is-a-neural-network": episode_002_what_is_a_neural_network as EpisodeScript,
  "003_ai-vs-ml-vs-deep-learning": episode_003_ai_vs_ml_vs_deep_learning as EpisodeScript,
  "004_what-is-training": episode_004_what_is_training as EpisodeScript,
  "005_what-is-inference": episode_005_what_is_inference as EpisodeScript,
  "006_what-is-a-token": episode_006_what_is_a_token as EpisodeScript,
  "007_what-are-embeddings": episode_007_what_are_embeddings as EpisodeScript,
  "008_what-is-a-dataset": episode_008_what_is_a_dataset as EpisodeScript,
  "009_what-is-a-model-parameter": episode_009_what_is_a_model_parameter as EpisodeScript,
  "010_what-is-supervised-learning": episode_010_what_is_supervised_learning as EpisodeScript,
};

const meta: Record<string, EpisodeMeta> = {
  "001_what-is-an-llm": meta_001_what_is_an_llm as EpisodeMeta,
  "002_what-is-a-neural-network": meta_002_what_is_a_neural_network as EpisodeMeta,
  "003_ai-vs-ml-vs-deep-learning": meta_003_ai_vs_ml_vs_deep_learning as EpisodeMeta,
  "004_what-is-training": meta_004_what_is_training as EpisodeMeta,
  "005_what-is-inference": meta_005_what_is_inference as EpisodeMeta,
  "006_what-is-a-token": meta_006_what_is_a_token as EpisodeMeta,
  "007_what-are-embeddings": meta_007_what_are_embeddings as EpisodeMeta,
  "008_what-is-a-dataset": meta_008_what_is_a_dataset as EpisodeMeta,
  "009_what-is-a-model-parameter": meta_009_what_is_a_model_parameter as EpisodeMeta,
  "010_what-is-supervised-learning": meta_010_what_is_supervised_learning as EpisodeMeta,
};

export const getEpisodeData = (episodeFolder: string): EpisodeScript => {
  const episode = episodes[episodeFolder];
  if (!episode) {
    throw new Error(
      `Episode "${episodeFolder}" not synced. Run: npm run sync -- ${episodeFolder}`,
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
