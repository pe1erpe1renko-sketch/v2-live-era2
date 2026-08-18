/**
 * Правило первой бесплатной генерации.
 *
 * TODO backend: признак freeGenerationUsed хранится на сервере, проверка права
 * выполняется на сервере при каждом запросе генерации. Фронт только отображает состояние.
 */

import { baseDurationFor, capabilitiesFor } from "./modelCapabilities";

/** модели, на которых действует бесплатная генерация */
export const FREE_MODELS = ["grok", "hailuo-2", "kling-3"] as const;

export const FREE_MODEL_NAMES = "Grok, Hailuo 2 и KLING 3.0";

export function isFreeModel(slug: string) {
  return (FREE_MODELS as readonly string[]).includes(slug);
}

/** базовые параметры модели: базовое разрешение и минимальная длительность */
export function baseParamsFor(slug: string) {
  const caps = capabilitiesFor(slug);
  return {
    quality: caps.qualities[0] ?? "720p",
    duration: baseDurationFor(caps),
  };
}

/** генерация подпадает под бесплатную только в базовых параметрах */
export function isFreeEligible(input: {
  model: string;
  quality: string;
  duration: number;
  sound: boolean;
  expert: boolean;
  lastFrame: boolean;
}) {
  if (!isFreeModel(input.model)) return false;
  const base = baseParamsFor(input.model);
  return (
    input.quality === base.quality &&
    input.duration === base.duration &&
    !input.sound &&
    !input.expert &&
    !input.lastFrame
  );
}
