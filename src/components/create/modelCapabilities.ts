/**
 * Возможности моделей.
 *
 * Утверждено 18.08.2026 (сверено с прайсом поставщика).
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
  /** множители длительности вместо надбавки 0.2 за секунду (фиксированные длины) */
  durationMultipliers?: Record<number, number>;
  /** ограничение доступных разрешений для конкретной длительности */
  qualitiesByDuration?: Record<number, string[]>;
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
    qualityMultipliers: { "720p": 1, "1080p": 1.286, "4K": 4.786 },
    sound: true, // единственная модель с платным звуком (×1.5)
    expert: true,
    promptStrength: true,
    lastFrame: true,
    negativePrompt: true,
  },
  "kling-motion": {
    // движение берётся из видео-эталона (режим video-to-video),
    // звук оттуда же — отдельно не тарифицируется.
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
    qualityMultipliers: { "768p": 1, "2K": 1.625 },
    sound: false,
    expert: true,
    promptStrength: true,
    lastFrame: true,
    negativePrompt: true,
  },
  hedra: {
    formats: ["16:9", "9:16", "1:1"],
    qualities: ["720p"],
    qualityMultipliers: { "720p": 1 },
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
    qualities: ["480p", "720p"],
    qualityMultipliers: { "480p": 0.476, "720p": 1 },
    sound: false,
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
    qualityMultipliers: { "720p": 1, "1080p": 1.083, "4K": 3.0 },
    sound: false, // звук входит в базовую цену
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
    qualities: ["720p", "1080p"],
    qualityMultipliers: { "720p": 1, "1080p": 1.778 },
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
    qualityMultipliers: { "768p": 1, "1080p": 1.667 },
    durationMultipliers: { 6: 1, 10: 1.667 },
    qualitiesByDuration: { 6: ["768p", "1080p"], 10: ["768p"] },
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

/** доступные разрешения с учётом выбранной длительности */
export function qualitiesFor(caps: ModelCapability, duration: number): string[] {
  return caps.qualitiesByDuration?.[duration] ?? caps.qualities;
}
