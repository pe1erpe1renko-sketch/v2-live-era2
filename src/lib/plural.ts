/** Склонение слова «токен» по числу: 1 токен, 2 токена, 5 токенов. */
export function tokenWord(n: number): string {
  const abs = Math.abs(Math.trunc(n));
  const two = abs % 100;
  if (two >= 11 && two <= 14) return "токенов";
  switch (abs % 10) {
    case 1:
      return "токен";
    case 2:
    case 3:
    case 4:
      return "токена";
    default:
      return "токенов";
  }
}

/** Число вместе со склонённым словом: «44 токена». Форматирование числа не меняется. */
export function tokensLabel(n: number | string): string {
  const num = typeof n === "number" ? n : Number(String(n).replace(/\s/g, ""));
  return `${n} ${tokenWord(Number.isFinite(num) ? num : 0)}`;
}
