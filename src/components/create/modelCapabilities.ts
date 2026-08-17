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
  /** длительность задаётся видео-эталоном, ручной выбор скрыт */
  durationLocked?: boolean;
  /** множители качества — единственный источник правды по цене за качество */
  qualityMultipliers: Record<string, number>;
  /** модель работает в режиме video-to-video и требует видео-эталон */
  requiresReferenceVideo?: boolean;
};

export const MODEL_CAPABILITIES: Record<string, ModelCapability> = {
  "kling-3": {
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 5,
    durationMax: 10,
    durationStep: 1,
    qualities: ["720p", "1080p", "4K"],
    qualityMultipliers: { "720p": 1, "1080p": 1.5, "4K": 2.5 }
    sound: true,
    expert: true,
    promptStrength: true,
    lastFrame: true,
    negativePrompt: true,
  },
  "kling-motion": {
    // образец — kling-3; отличия: только 720p/1080p, эксперт и промпт выключены,
    // движение берётся из видео-эталона (режим video-to-video).
    // звук берётся из видео-эталона, поэтому тумблер не показывается и
    // не тарифицируется отдельно (см. PRICING_RULES.soundIncluded).
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 5,
    durationMax: 10,
    durationStep: 1,
    qualities: ["720p", "1080p"],
    sound: false,
    expert: false,
    promptStrength: false,
    lastFrame: true,
    negativePrompt: true,
    requiresReferenceVideo: true,
    durationLocked: true,
    qualityMultipliers: { "720p": 1, "1080p": 1.35 },
  },
  "minimax-h3": {
    formats: ["16:9", "9:16", "1:1"],
    durationMin: 5,
    durationMax: 10,
    durationStep: 1,
    qualities: ["768p", "2K"],
    qualityMultipliers: { "768p": 1, "2K": 1.625 }
    sound: true,
    expert: true,
    promptStrength: true,
    lastFrame: true,
    negativePrompt: true,
  },
  hedra: {
    formats: ["16:9", "9:16", "1:1"],
    qualities: ["720p"],
    qualityMultipliers: { "720p": 1 }
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
    qualities: ["720p", "1080p", "4K"],
    qualityMultipliers: { "720p": 1, "1080p": 1.5, "4K": 2.5 }
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
    qualityMultipliers: { "720p": 1, "1080p": 1.5, "4K": 2.5 }
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
    qualities: ["720p"],
    qualityMultipliers: { "720p": 1 }
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
    qualityMultipliers: { "768p": 1, "1080p": 1.5 }
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
