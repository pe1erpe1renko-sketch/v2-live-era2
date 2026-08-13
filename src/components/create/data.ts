import archive1 from "@/assets/sc-archive-1.jpg";
import archive2 from "@/assets/sc-archive-2.jpg";
import archive3 from "@/assets/sc-archive-3.jpg";
import family1 from "@/assets/sc-family-1.jpg";
import family2 from "@/assets/sc-family-2.jpg";
import family3 from "@/assets/sc-family-3.jpg";
import draw1 from "@/assets/sc-draw-1.jpg";
import draw2 from "@/assets/sc-draw-2.jpg";
import draw3 from "@/assets/sc-draw-3.jpg";
import feed1 from "@/assets/sc-feed-1.jpg";
import feed2 from "@/assets/sc-feed-2.jpg";
import feed3 from "@/assets/sc-feed-3.jpg";

export type Scenario = {
  slug: string;
  title: string;
  img: string;
  note: string;
  icon: string;
};

export type Model = { slug: string; name: string; letter: string; note: string };

export const SCENARIOS: Scenario[] = [
  {
    slug: "staroe-foto",
    title: "Старое фото",
    img: archive1,
    note: "заломы и царапины уходят до анимации",
    icon: "solar:gallery-linear",
  },
  {
    slug: "portret",
    title: "Портрет",
    img: family1,
    note: "черты лица сохранены",
    icon: "solar:user-linear",
  },
  {
    slug: "foto-9-maya",
    title: "Фото к 9 Мая",
    img: archive2,
    note: "бережная мимика, без домысливания черт",
    icon: "solar:medal-ribbon-linear",
  },
  {
    slug: "foto-pitomtsa",
    title: "Фото питомца",
    img: family2,
    note: "естественное движение животного",
    icon: "solar:paw-linear",
  },
  {
    slug: "ya-v-detstve",
    title: "Встреча с собой в детстве",
    img: archive3,
    note: "два кадра сходятся в одной сцене",
    icon: "solar:users-group-rounded-linear",
  },
  {
    slug: "podarok-k-yubileyu",
    title: "Подарок к юбилею",
    img: family3,
    note: "тёплое движение для семейного ролика",
    icon: "solar:gift-linear",
  },
  {
    slug: "detskiy-risunok",
    title: "Детский рисунок",
    img: draw1,
    note: "детские линии остаются как есть",
    icon: "solar:pallete-2-linear",
  },
  {
    slug: "video-iz-foto",
    title: "Видео из фото",
    img: feed1,
    note: "движение и ход камеры из одного кадра",
    icon: "solar:camera-linear",
  },
  {
    slug: "illyustratsiya",
    title: "Иллюстрация",
    img: draw2,
    note: "стиль рисунка сохранён",
    icon: "solar:pen-new-square-linear",
  },
  {
    slug: "tanets-iz-kadra",
    title: "Танец из кадра",
    img: feed2,
    note: "фигура двигается в такт",
    icon: "solar:music-notes-linear",
  },
  {
    slug: "kartina",
    title: "Картина",
    img: draw3,
    note: "мазок и фактура холста сохраняются",
    icon: "solar:gallery-wide-linear",
  },
  {
    slug: "video-iz-teksta",
    title: "Видео из текста",
    img: feed3,
    note: "ролик собирается без снимка",
    icon: "solar:document-text-linear",
  },
];

export const MODELS: Model[] = [
  { slug: "kling-3", name: "Kling 3.0", letter: "K", note: "универсальная, держит мимику и детали" },
  {
    slug: "seedance-2",
    name: "Seedance 2.0",
    letter: "S",
    note: "ByteDance, считает быстрее и дешевле",
  },
  { slug: "veo-3-1", name: "Veo 3.1", letter: "V", note: "Google, звук в комплекте, есть 4K" },
  { slug: "sora-2", name: "Sora 2", letter: "S", note: "OpenAI, звук и синхронные губы" },
  { slug: "wan-2-7", name: "Wan 2.7", letter: "W", note: "Alibaba, плавные переходы между сценами" },
  {
    slug: "kling-motion",
    name: "Kling Motion Control",
    letter: "K",
    note: "движение с вашего видео-образца",
  },
  { slug: "hailuo-02", name: "Hailuo 02", letter: "H", note: "MiniMax, бережный расход токенов" },
  { slug: "grok-imagine", name: "Grok Imagine", letter: "G", note: "xAI, свободные соотношения сторон" },
  { slug: "happy-horse", name: "Happy Horse", letter: "H", note: "Alibaba, 1080p со звуком" },
  {
    slug: "nano-banana-2",
    name: "Nano Banana 2",
    letter: "N",
    note: "до 14 референсов в одной сцене",
  },
];
