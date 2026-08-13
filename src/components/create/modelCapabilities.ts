/**
 * Возможности моделей.
 *
 * ВНИМАНИЕ: значения предварительные и подлежат уточнению после подключения
 * реальных моделей. Меняйте набор настроек только здесь — интерфейс читает
 * этот конфиг и перестраивается сам.
 */

export type ModelCapability = {
  formats: string[];
  durationMin: number;
  durationMax: number;
  durationStep: number;
  qualities: string[];
  sound: boolean;
  expert: boolean;
  promptStrength: boolean;
  lastFrame: boolean;
  negativePrompt: boolean;
};

const FULL: ModelCapability = {
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
};

export const MODEL_CAPABILITIES: Record<string, ModelCapability> = {
  "kling-3": { ...FULL },
  "minimax-h3": { ...FULL },
  hedra: { ...FULL },
  "seedance-2": { ...FULL },
  "veo-3-1": { ...FULL },
  grok: { ...FULL },
  "hailuo-2": { ...FULL },
};

export function capabilitiesFor(slug: string | null | undefined): ModelCapability {
  return (slug && MODEL_CAPABILITIES[slug]) || FULL;
}
