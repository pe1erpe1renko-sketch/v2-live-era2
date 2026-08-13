import archive1 from "@/assets/sc-archive-1.jpg";
import archive2 from "@/assets/sc-archive-2.jpg";
import archive3 from "@/assets/sc-archive-3.jpg";
import family1 from "@/assets/sc-family-1.jpg";
import family2 from "@/assets/sc-family-2.jpg";
import draw1 from "@/assets/sc-draw-1.jpg";
import draw2 from "@/assets/sc-draw-2.jpg";
import feed1 from "@/assets/sc-feed-1.jpg";
import feed3 from "@/assets/sc-feed-3.jpg";

export type ExampleCategory = "Архив" | "Портреты" | "Питомцы" | "Рисунки" | "Лента";

export type Example = {
  id: string;
  category: ExampleCategory;
  scenario: string;
  title: string;
  text: string;
  meta: string;
  /** Заглушка: позже здесь будет постер + видео-файл ролика. */
  poster: string;
};

export const EXAMPLE_FILTERS: ("Все" | ExampleCategory)[] = [
  "Все",
  "Архив",
  "Портреты",
  "Питомцы",
  "Рисунки",
  "Лента",
];

export const EXAMPLES: Example[] = [
  {
    id: "arch-1",
    category: "Архив",
    scenario: "Старое фото",
    title: "Портрет 1958 года",
    text: "Скан с заломом через лицо. Реставрация убрала повреждение, затем добавилось дыхание и моргание.",
    meta: "KLING 3.0 · 5 СЕК · 9:16",
    poster: archive1,
  },
  {
    id: "arch-2",
    category: "Архив",
    scenario: "Фото к 9 Мая",
    title: "Фронтовая карточка",
    text: "Снимок из семейного альбома. Мимика сдержанная, черты не додумывались.",
    meta: "SEEDANCE 2.0 · 5 СЕК · 1:1",
    poster: archive2,
  },
  {
    id: "arch-3",
    category: "Архив",
    scenario: "Старое фото",
    title: "Групповой кадр",
    text: "Четыре человека. Лица на переднем плане двигаются точно, дальние почти статичны.",
    meta: "KLING 3.0 · 5 СЕК · 16:9",
    poster: archive3,
  },
  {
    id: "port-1",
    category: "Портреты",
    scenario: "Портрет",
    title: "Студийный портрет",
    text: "Взгляд в камеру и лёгкий поворот головы. Освещение сохранено.",
    meta: "VEO 3.1 · 10 СЕК · 9:16",
    poster: family1,
  },
  {
    id: "port-2",
    category: "Портреты",
    scenario: "Подарок к юбилею",
    title: "Свадебное фото",
    text: "Двое в кадре, синхронное движение без искажения лиц.",
    meta: "KLING 3.0 · 5 СЕК · 1:1",
    poster: feed1,
  },
  {
    id: "pet-1",
    category: "Питомцы",
    scenario: "Фото питомца",
    title: "Кот на подоконнике",
    text: "Потягивается и поворачивает морду к камере. Шерсть не плывёт.",
    meta: "SEEDANCE 2.0 · 5 СЕК · 9:16",
    poster: family2,
  },
  {
    id: "draw-1",
    category: "Рисунки",
    scenario: "Детский рисунок",
    title: "Карандашный дракон",
    text: "Детский рисунок. Линии и пропорции сохранены, движение добавлено поверх стиля.",
    meta: "VEO 3.1 · 10 СЕК · 1:1",
    poster: draw1,
  },
  {
    id: "draw-2",
    category: "Рисунки",
    scenario: "Картина",
    title: "Акварельный пейзаж",
    text: "Вода и облака пришли в движение, мазок остался читаемым.",
    meta: "MINIMAX H3 · 5 СЕК · 16:9",
    poster: draw2,
  },
  {
    id: "feed-1",
    category: "Лента",
    scenario: "Видео из фото",
    title: "Кадр из поездки",
    text: "Панорама с ходом камеры вглубь. Снято на телефон.",
    meta: "MINIMAX H3 · 10 СЕК · 9:16",
    poster: feed3,
  },
];
