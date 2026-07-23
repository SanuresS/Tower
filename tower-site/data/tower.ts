export const TOTAL_FLOORS = 12000;

export interface TowerZone {
  id: string;
  name: string;
  floorStart: number;
  floorEnd: number;
  color: string;
  description: string;
}

export const towerZones: TowerZone[] = [
  {
    id: "deep",
    name: "Глубинные чёрные этажи",
    floorStart: 1,
    floorEnd: 1700,
    color: "#1a1a1a",
    description:
      "Смесь чёрных зон, которые не прерываются. Этажи, где обитают самые разные хтонические твари. Чем ниже этаж, тем больше встречается тварей.",
  },
  {
    id: "life",
    name: "Этажи жизни",
    floorStart: 1700,
    floorEnd: 2200,
    color: "#22c55e",
    description:
      "Этажи с чрезвычайно агрессивной биофауной. Здесь располагается Огромный резервуар с водой и самая большая в Башне гидропонная ГМО-ферма — Разросшийся лес.",
  },
  {
    id: "lower",
    name: "Нижние этажи",
    floorStart: 2200,
    floorEnd: 5000,
    color: "#737373",
    description:
      "Уровни, где живёт большинство выживших. Здесь люди стали жертвой мутировавших био-устройств и хтонических тварей из чёрных зон.",
  },
  {
    id: "buffer",
    name: "Буферные этажи",
    floorStart: 5000,
    floorEnd: 5100,
    color: "#dc2626",
    description:
      "Естественный разграничителем между Нижними и Средними этажами. Крупные «Чёрные зоны».",
  },
  {
    id: "middle",
    name: "Средние этажи",
    floorStart: 5100,
    floorEnd: 8000,
    color: "#b8860b",
    description:
      "Излучают эхо коммунистической эпохи. Здесь сохранились остатки старого порядка. Сохранились гидропонные фермы и действующий реактор.",
  },
  {
    id: "upper",
    name: "Верхние этажи",
    floorStart: 8000,
    floorEnd: 12000,
    color: "#94a3b8",
    description:
      "Застывшие во времени пустые пространства с технологиями. Здесь бродят Святые ангелы. Выше 10000 этажа — недостроенные этажи Вавилона-3.",
  },
];

export interface BabylonPart {
  id: string;
  name: string;
  floorStart: number;
  floorEnd: number;
  shape: "cylinder" | "truncated-cone";
  widthBottom: number;
  widthTop: number;
  color: string;
  dashed?: boolean;
  description: string;
}

export const babylonParts: BabylonPart[] = [
  {
    id: "v3-unfinished",
    name: "Недостроенные этажи Вавилона-3",
    floorStart: 10000,
    floorEnd: 12000,
    shape: "truncated-cone",
    widthBottom: 100,
    widthTop: 80,
    color: "#94a3b8",
    dashed: true,
    description:
      "Недостроенная верхняя часть Вавилона-3. Строительство было прекращено из-за апокалипсиса.",
  },
  {
    id: "v3",
    name: "Вавилон-3",
    floorStart: 0,
    floorEnd: 10000,
    shape: "truncated-cone",
    widthBottom: 180,
    widthTop: 100,
    color: "#94a3b8",
    description:
      "100 км, усечённый конус. Внешняя оболочка Башни. Содержит шахту ЦШТР-Ω (Глотку) и крупные производственные цеха.",
  },
  {
    id: "v2",
    name: "Вавилон-2",
    floorStart: 0,
    floorEnd: 8000,
    shape: "truncated-cone",
    widthBottom: 140,
    widthTop: 90,
    color: "#b8860b",
    description:
      "80 км, усечённый конус. Город вокруг первой башни. В нижней части — Океан и гидропонные фермы. Содержит серверы ЦСУ и реактор.",
  },
  {
    id: "v1",
    name: "Вавилон-1",
    floorStart: 0,
    floorEnd: 5000,
    shape: "cylinder",
    widthBottom: 50,
    widthTop: 50,
    color: "#8b4513",
    description:
      "50 км, цилиндр. Изначально строился как памятник эпохе. Переделан под ЦТУ — Центральный Транспортный Узел.",
  },
];

export interface TowerSection {
  id: string;
  name: string;
  floors: string;
  floorStart: number;
  floorEnd: number;
  zone: string;
  description: string;
}

export interface SectionGroup {
  id: string;
  name: string;
  floorRange: string;
  color: string;
  order: number;
}

export const sectionGroups: SectionGroup[] = [
  { id: "global", name: "Глобальные системы", floorRange: "Вся Башня", color: "#94a3b8", order: 5 },
  { id: "upper", name: "Верхние этажи", floorRange: "8000–12000", color: "#94a3b8", order: 4 },
  { id: "middle", name: "Средние этажи", floorRange: "5100–8000", color: "#b8860b", order: 3 },
  { id: "lower", name: "Нижние этажи", floorRange: "2200–5000", color: "#737373", order: 2 },
  { id: "life", name: "Этажи жизни", floorRange: "1700–2200", color: "#22c55e", order: 1 },
];

export const towerSections: TowerSection[] = [
  {
    id: "ctu",
    name: "Центральный Транспортный Узел (ЦТУ)",
    floors: "Весь Вавилон-1, центр Вавилона-2",
    floorStart: 1,
    floorEnd: 12000,
    zone: "global",
    description:
      "Огромная шахта с лифтами и вертикальными поездами. Крайне опасное место — пристанище пауков-канатоходцев и автоматонов.",
  },
  {
    id: "ltu",
    name: "Локальный Транспортный Узел (ЛТУ)",
    floors: "Вся Башня",
    floorStart: 1,
    floorEnd: 12000,
    zone: "global",
    description:
      "Сеть скоростных горизонтально-вертикальных лифтов-поездов. Несколько изолированных сетей по всей Башне.",
  },
  {
    id: "csu-servers",
    name: "Секция серверов ЦСУ",
    floors: "5200–7800, Вавилон-2",
    floorStart: 5200,
    floorEnd: 7800,
    zone: "middle",
    description:
      "Кластер из серверных комнат и пульта взаимодействия с ЦСУ.",
  },
  {
    id: "library",
    name: "40-этажная Библиотека",
    floors: "Средние этажи (до 8000)",
    floorStart: 5100,
    floorEnd: 8000,
    zone: "middle",
    description:
      "Вавилонская Библиотека. 99% книг поражены грибком. Здесь живут Библиотекари.",
  },
  {
    id: "reactors",
    name: "Секция реакторов",
    floors: "2500–4000, 5200–7800 (4 шт)",
    floorStart: 2500,
    floorEnd: 4000,
    zone: "lower",
    description:
      "Ядерные реакторы, питающие Башню. На нижних — 2 расплавленных, на средних — 1 отключённый и 1 работающий.",
  },
  {
    id: "ice-crypt",
    name: "Ледяной склеп",
    floors: "3000, Вавилон-3",
    floorStart: 3000,
    floorEnd: 3000,
    zone: "lower",
    description:
      "После разрушения криогенных баков превратилась в царство вечного холода.",
  },
  {
    id: "cstr-omega",
    name: "ЦШТР-Ω (Глотка)",
    floors: "2000–3000, Вавилон-3",
    floorStart: 2000,
    floorEnd: 3000,
    zone: "life",
    description:
      "Центральная Шахта Термальной Регуляции. Гигантский гравитационно-конвекционный радиатор.",
  },
  {
    id: "ocean",
    name: "Океан",
    floors: "1700–2200",
    floorStart: 1700,
    floorEnd: 2200,
    zone: "life",
    description:
      "Огромный резервуар с водой и собственной атмосферой. Естественная преграда между нижними и глубинными этажами.",
  },
  {
    id: "overgrown-forest",
    name: "Разросшийся лес",
    floors: "1700–2200",
    floorStart: 1700,
    floorEnd: 2200,
    zone: "life",
    description:
      "Растения с гидропонной фермы вступили в симбиоз и разрослись на многие этажи. Живая биофауна.",
  },
  {
    id: "mushroom-forest",
    name: "Грибной лес",
    floors: "1700–2200",
    floorStart: 1700,
    floorEnd: 2200,
    zone: "life",
    description:
      "Гриб разросся по всей лаборатории и вышел за её пределы. Споры чрезвычайно ядовиты.",
  },
];
