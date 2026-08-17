/**
 * Стоимость генерации в токенах.
 *
 * Утверждено 18.08.2026 (сверено с прайсом поставщика).
 * Меняйте стоимость только здесь — интерфейс читает этот конфиг.
 */

import { capabilitiesFor } from "./modelCapabilities";

export const TOKEN_COSTS = {
  // стоимость ролика базовой длительности, базовое качество, без звука
  base: {
    grok: 9,
    "hailuo-2": 12,
    "veo-3-1": 20,
    hedra: 27,
    "kling-3": 31,
    "minimax-h3": 36,
    "kling-motion": 44,
    "seedance-2": 62,
  } as Record<string, number>,

  multipliers: {
    // общего множителя звука нет: звук платный только у kling-3
    soundByModel: { "kling-3": 1.5 } as Record<string, number>,
    format: { "16:9": 1, "9:16": 1, "1:1": 1 } as Record<string, number>,
    duration: { perSecondOverBase: 0.2 },
  },

  extras: {
    improvePrompt: 1,
    lastFrame: 2,
  },

  restore: {
    base: 4,
    resolution: { "1x": 1, "2x": 1.5, "4x": 2.25 } as Record<string, number>,
  },
};

/**
 * Исключения в формуле расчёта. Утверждено 18.08.2026.
 */
export const PRICING_RULES = {
  perClip: ["veo-3-1"], // длительность не влияет на цену
  // звук входит в базовую цену и отдельно не тарифицируется
  soundIncluded: ["hedra", "kling-motion", "veo-3-1"],
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
  const caps = capabilitiesFor(input.model);

  const perClip = PRICING_RULES.perClip.includes(input.model);
  const soundIncluded = PRICING_RULES.soundIncluded.includes(input.model);
  const baseDuration = caps.durationMin ?? 5;

  const durationMul = perClip
    ? 1
    : caps.durationMultipliers
      ? (caps.durationMultipliers[input.duration] ?? 1)
      : 1 +
        (Math.max(input.duration, baseDuration) - baseDuration) *
          m.duration.perSecondOverBase;

  const soundMul =
    soundIncluded || !input.sound ? 1 : (m.soundByModel[input.model] ?? 1);

  // множители качества живут только в MODEL_CAPABILITIES
  const qMul = caps.qualityMultipliers[input.quality] ?? 1;

  // округление одно и единственное: итог округляется до ближайшего целого
  let total = Math.round(
    base * durationMul * qMul * soundMul * (m.format[input.format] ?? 1),
  );
  if (input.lastFrame) total += TOKEN_COSTS.extras.lastFrame;
  return total;
}
