/**
 * Стоимость генерации в токенах.
 *
 * Утверждено 13.08.2026.
 * Меняйте стоимость только здесь — интерфейс читает этот конфиг.
 */

import { capabilitiesFor } from "./modelCapabilities";

export const TOKEN_COSTS = {
  // стоимость ролика 5 секунд, базовое качество, без звука
  base: {
    "hailuo-2": 12,
    "veo-3-1": 20,
    grok: 27,
    hedra: 27,
    "kling-3": 31,
    "kling-motion": 44,
    "minimax-h3": 36,
    "seedance-2": 83,
  } as Record<string, number>,

  multipliers: {
    sound: { on: 1.4, off: 1 },
    format: { "16:9": 1, "9:16": 1, "1:1": 1 } as Record<string, number>,
    duration: { perSecondOver5: 0.2 },
  },

  extras: {
    improvePrompt: 1,
    lastFrame: 2,
  },

  restore: {
    base: 4,
    resolution: { "1x": 1, "2x": 1.4, "4x": 2.2 } as Record<string, number>,
  },
};

/**
 * Исключения в формуле расчёта. Утверждено 13.08.2026.
 */
export const PRICING_RULES = {
  perClip: ["veo-3-1", "hailuo-2"], // длительность не влияет на цену
  // звук входит в базовую цену и отдельно не тарифицируется:
  // hedra — всегда включён, kling-motion — берётся из видео-эталона
  soundIncluded: ["hedra", "kling-motion"],
};

export function computeRestoreCost(resolution: string) {
  const r = TOKEN_COSTS.restore;
  return Math.round(r.base * (r.resolution[resolution] ?? 1));
}

export function computeCost(input: {
  model: string;
  duration: number;
  quality: string;
  sound: boolean;
  format: string;
  lastFrame: boolean;
}) {
  const m = TOKEN_COSTS.multipliers;
  const base = TOKEN_COSTS.base[input.model] ?? 0;

  const perClip = PRICING_RULES.perClip.includes(input.model);
  const soundIncluded = PRICING_RULES.soundIncluded.includes(input.model);

  const durationMul = perClip
    ? 1
    : 1 + (Math.max(input.duration, 5) - 5) * m.duration.perSecondOver5;
  const soundMul = soundIncluded ? 1 : input.sound ? m.sound.on : m.sound.off;

  // множители качества живут только в MODEL_CAPABILITIES
  const caps = capabilitiesFor(input.model);
  const qMul = caps.qualityMultipliers[input.quality] ?? 1;

  // округление одно и единственное: итог округляется до ближайшего целого
  let total = Math.round(
    base * durationMul * qMul * soundMul * (m.format[input.format] ?? 1),
  );
  if (input.lastFrame) total += TOKEN_COSTS.extras.lastFrame;
  return total;
}
