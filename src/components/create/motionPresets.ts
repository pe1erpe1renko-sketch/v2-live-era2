/** Тексты пресетов движения — меняются здесь. */
export const MOTION_PRESETS = {
  light: { label: "Лёгкое оживление", text: "лёгкое оживление" },
  normal: { label: "Живое движение", text: "живое движение" },
  keyed: { label: "Несколько ключевых движений", text: "несколько ключевых движений" },
} as const;

export type MotionPresetId = keyof typeof MOTION_PRESETS;

export const MOTION_PRESET_IDS = Object.keys(MOTION_PRESETS) as MotionPresetId[];

/** Убирает текст пресета из строки, сохраняя ручной ввод. */
export function stripPresetText(value: string, text: string): string {
  if (!text) return value;
  const idx = value.indexOf(text);
  if (idx === -1) return value;
  const before = value.slice(0, idx);
  const after = value.slice(idx + text.length);
  return `${before.replace(/[,\s]+$/, "")}${before.trim() && after.replace(/^[,\s]+/, "") ? ", " : ""}${after.replace(/^[,\s]+/, "")}`;
}

/** Подставляет текст нового пресета вместо старого. */
export function applyPresetText(value: string, oldText: string, newText: string): string {
  const base = stripPresetText(value, oldText).trim();
  if (!newText) return base;
  return base ? `${base}, ${newText}` : newText;
}
