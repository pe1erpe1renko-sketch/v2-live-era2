export const SCENARIO_SLUGS: Record<string, string> = {
  "Старое фото": "staroe-foto",
  "Фото к 9 Мая": "foto-9-maya",
  "Встреча с собой в детстве": "ya-v-detstve",
  Портрет: "portret",
  "Фото питомца": "foto-pitomtsa",
  "Подарок к юбилею": "podarok-k-yubileyu",
  "Детский рисунок": "detskiy-risunok",
  Иллюстрация: "illyustratsiya",
  Картина: "kartina",
  "Видео из фото": "video-iz-foto",
  "Танец из кадра": "tanets-iz-kadra",
  "Видео из текста": "video-iz-teksta",
  "Оживить рисунок": "detskiy-risunok",
};

export const MODEL_SLUGS: Record<string, string> = {
  "Kling 3.0": "kling-3",
  "Veo 3.1": "veo-3-1",
  "Seedance 2.0": "seedance-2",
  "Sora 2": "sora-2",
  "Wan 2.7": "wan-2-7",
  "Kling Motion Control": "kling-motion",
  "Hailuo 02": "hailuo-02",
  "Grok Imagine": "grok-imagine",
  "Happy Horse": "happy-horse",
  "Nano Banana 2": "nano-banana-2",
};

export const CREATE = "/create";

export function scenarioHref(title: string) {
  const slug = SCENARIO_SLUGS[title];
  return slug ? `/create?scenario=${slug}` : CREATE;
}

export function modelHref(name: string) {
  const slug = MODEL_SLUGS[name];
  return slug ? `/create?model=${slug}` : CREATE;
}
