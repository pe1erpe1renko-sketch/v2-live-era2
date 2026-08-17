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
  "KLING 3.0": "kling-3",
  "Kling 3.0": "kling-3",
  "Kling 3.0 Motion Control": "kling-motion",
  "MiniMax H3": "minimax-h3",
  Hedra: "hedra",
  "Seedance 2.0": "seedance-2",
  "Veo 3.1": "veo-3-1",
  Grok: "grok",
  "Hailuo 2": "hailuo-2",
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
