/**
 * Возможности моделей.
 *
 * Утверждено 13.08.2026.
 * Меняйте набор настроек только здесь — интерфейс читает
 * этот конфиг и перестраивается сам.
 */

export type ModelCapability = {
  formats: string[];
  durationMin?: number;
  durationMax?: number;
  durationStep?: number;
  qualities: string[];
  sound: boolean;
  expert: boolean;
  promptStrength: boolean;
  lastFrame: boolean;
  negativePrompt: boolean;
  /** вместо промпта — загрузка звуковой дорожки */
  needsAudio?: boolean;
  maxAudioSeconds?: number;
};

export const MODEL_CAPABILITIES: Record<string, ModelCapability> = {
  "kling-3": {
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 5,
    durationMax: 10,
    durationStep: 1,
    qualities: ["720p", "1080p", "4K"],
    sound: true,
    expert: true,
    promptStrength: true,
    lastFrame: true,
    negativePrompt: true,
  },
  "minimax-h3": {
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 5,
    durationMax: 10,
    durationStep: 1,
    qualities: ["768p", "2K"],
    sound: true,
    expert: true,
    promptStrength: true,
    lastFrame: true,
    negativePrompt: true,
  },
  hedra: {
    formats: ["16:9", "9:16", "1:1"],
    qualities: ["540p", "720p"],
    sound: false, // звук всегда включён, тумблер не показывается
    expert: false,
    promptStrength: false,
    lastFrame: false,
    negativePrompt: false,
    needsAudio: true,
    maxAudioSeconds: 15,
  },
  "seedance-2": {
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 5,
    durationMax: 10,
    durationStep: 1,
    qualities: ["480p", "720p", "1080p", "4K"],
    sound: true,
    expert: true,
    promptStrength: true,
    lastFrame: true,
    negativePrompt: true,
  },
  "veo-3-1": {
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 5,
    durationMax: 8,
    durationStep: 1,
    qualities: ["720p", "1080p", "4K"],
    sound: true,
    expert: true,
    promptStrength: true,
    lastFrame: false,
    negativePrompt: true,
  },
  grok: {
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 5,
    durationMax: 10,
    durationStep: 1,
    qualities: ["480p", "720p"],
    sound: false,
    expert: false,
    promptStrength: false,
    lastFrame: false,
    negativePrompt: false,
  },
  "hailuo-2": {
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 6,
    durationMax: 10,
    durationStep: 4,
    qualities: ["768p", "1080p"],
    sound: false,
    expert: true,
    promptStrength: true,
    lastFrame: false,
    negativePrompt: true,
  },
};

export function capabilitiesFor(slug: string | null | undefined): ModelCapability {
  return (slug && MODEL_CAPABILITIES[slug]) || MODEL_CAPABILITIES["kling-3"]!;
}
