/**
 * Стоимость генерации в токенах.
 *
 * ВНИМАНИЕ: цифры предварительные и подлежат уточнению после подключения
 * реальных моделей. Меняйте стоимость только здесь.
 */

export const TOKEN_COSTS = {
  // базовая стоимость ролика 5 секунд, 720p, без звука
  base: {
    "kling-3": 15,
    "veo-3-1": 14,
    "seedance-2": 4,
    "sora-2": 12,
    "wan-2-7": 5,
    "kling-motion": 18,
    "hailuo-02": 4,
    "grok-imagine": 5,
    "happy-horse": 6,
    "nano-banana-2": 8,
  } as Record<string, number>,
  // множители настроек
  multipliers: {
    duration: {
      // за каждую секунду сверх пяти
      perSecondOver5: 0.2,
    },
    quality: {
      "480p": 0.8,
      "720p": 1,
      "1080p": 1.5,
      "4K": 2.5,
    } as Record<string, number>,
    sound: {
      on: 1.3,
      off: 1,
    },
    format: {
      "16:9": 1,
      "9:16": 1,
      "1:1": 1,
    } as Record<string, number>,
  },
  // фиксированные доплаты
  extras: {
    improvePrompt: 1,
    lastFrame: 2,
  },
  // реставрация снимка (страница /restore)
  restore: {
    base: 6,
    resolution: { "1x": 1, "2x": 1.4, "4x": 2.2 } as Record<string, number>,
  },
};

export function computeRestoreCost(resolution: string) {
  const r = TOKEN_COSTS.restore;
  return Math.ceil(r.base * (r.resolution[resolution] ?? 1));
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
  let total =
    base *
    (1 + (input.duration - 5) * m.duration.perSecondOver5) *
    (m.quality[input.quality] ?? 1) *
    (input.sound ? m.sound.on : m.sound.off) *
    (m.format[input.format] ?? 1);
  if (input.lastFrame) total += TOKEN_COSTS.extras.lastFrame;
  return Math.ceil(total);
}
