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
  { id: "global", name: "Глобальные системы", floorRange: "Вся Башня", color: "#94a3b8", order: 8 },
  { id: "pervasive", name: "Повсеместные секции", floorRange: "Вся Башня", color: "#6b7280", order: 7 },
  { id: "upper", name: "Верхние этажи", floorRange: "8000–12000", color: "#94a3b8", order: 6 },
  { id: "middle", name: "Средние этажи", floorRange: "5100–8000", color: "#b8860b", order: 5 },
  { id: "buffer", name: "Буферные этажи", floorRange: "5000–5100", color: "#dc2626", order: 4 },
  { id: "lower", name: "Нижние этажи", floorRange: "2200–5000", color: "#737373", order: 3 },
  { id: "life", name: "Этажи жизни", floorRange: "1700–2200", color: "#22c55e", order: 2 },
  { id: "deep", name: "Глубинные чёрные этажи", floorRange: "1–1700", color: "#1a1a1a", order: 1 },
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
    floorEnd: 7800,
    zone: "global",
    description:
      "Ядерные реакторы, питающие Башню. Всего 4: на нижних этажах 2 расплавленных, на средних — 1 отключённый и 1 работающий.",
  },
  {
    id: "ice-crypt",
    name: "Секция старой фабрики (Ледяной склеп)",
    floors: "3000, Вавилон-3",
    floorStart: 3000,
    floorEnd: 3000,
    zone: "lower",
    description:
      "Остатки крупных производственных цехов. После разрушения криогенных баков превратилась в царство вечного космического холода.",
  },
  {
    id: "cstr-omega",
    name: "ЦШТР-Ω (Глотка)",
    floors: "2000–3000, Вавилон-3",
    floorStart: 2000,
    floorEnd: 3000,
    zone: "lower",
    description:
      "Центральная Шахта Термальной Регуляции. Гигантский гравитационно-конвекционный радиатор и энергетический накопитель.",
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
  {
    id: "old-batteries",
    name: "Секция старых аккумуляторов",
    floors: "2000, Вавилон-3",
    floorStart: 2000,
    floorEnd: 2000,
    zone: "life",
    description:
      "Остатки термоэлектрических накопителей ЦШТР-Ω. Невыносимая жара, плавящая обувь, и радиация делают это место смертельно опасным.",
  },
  {
    id: "elevator-shafts",
    name: "Секция Заброшенных лифтов",
    floors: "Вся Башня",
    floorStart: 1,
    floorEnd: 12000,
    zone: "global",
    description:
      "Локальные лифты, соединяющие до 20 этажей. После апокалипсиса многие стали могилами. Некоторые до сих пор включаются сами по себе.",
  },
  {
    id: "backup-generators",
    name: "Резервные генераторы",
    floors: "Вся Башня",
    floorStart: 1,
    floorEnd: 12000,
    zone: "global",
    description:
      "Резервные ядерные реакторы по всей территории Башни. Часть расплавилась, часть отключена, некоторые всё ещё работают.",
  },
  {
    id: "big-water-tanks",
    name: "Секция Больших баков с водой",
    floors: "Вся Башня, Вавилон-3",
    floorStart: 1,
    floorEnd: 12000,
    zone: "pervasive",
    description:
      "Крупные резервуары с водой, встречающиеся каждые 10 км. Некоторые лопнули, затопив секции под собой.",
  },
  {
    id: "small-water-tanks",
    name: "Секция малых баков с водой",
    floors: "Вся Башня",
    floorStart: 1,
    floorEnd: 12000,
    zone: "pervasive",
    description:
      "Небольшие баки с водой, встречающиеся каждый 1 км. Располагаются возле водопотребительных секций.",
  },
  {
    id: "residential-zones",
    name: "Зона жилых комплексов",
    floors: "Вся Башня",
    floorStart: 1,
    floorEnd: 12000,
    zone: "pervasive",
    description:
      "Просторные многоэтажные кварталы с квартирами, школами, магазинами, спортивными залами и ресторанами.",
  },
  {
    id: "shopping-center",
    name: "Секция Торгового центра",
    floors: "Вся Башня",
    floorStart: 1,
    floorEnd: 12000,
    zone: "pervasive",
    description:
      "Торговые центры с множеством магазинов и ресторанов. Как правило, здесь можно найти много полезного.",
  },
  {
    id: "hydroponic-farms",
    name: "Гидропонные фермы",
    floors: "5500–8000",
    floorStart: 5500,
    floorEnd: 8000,
    zone: "middle",
    description:
      "Фермы на средних этажах, образующие небольшие биосферы. Либо используются как пастбища, либо приспособлены людьми для добычи пищи.",
  },
  {
    id: "frozen-corridors",
    name: "Секция Заледеневших Коридоров",
    floors: "Средние этажи",
    floorStart: 5100,
    floorEnd: 8000,
    zone: "middle",
    description:
      "Длинные заброшенные коридоры бывшей системы кондиционирования. Вечный холод, иней и ледяные кристаллы делают их смертельно опасными.",
  },
  {
    id: "flooded-halls",
    name: "Зона затопленных залов",
    floors: "5000–5100",
    floorStart: 5000,
    floorEnd: 5100,
    zone: "buffer",
    description:
      "Зона образовалась из-за повреждения двух крупных баков с водой. Некоторые комнаты затоплены по пояс, другие — полностью.",
  },
  {
    id: "burned-screens",
    name: "Секция перегоревших экранов",
    floors: "5000–5100",
    floorStart: 5000,
    floorEnd: 5100,
    zone: "buffer",
    description:
      "Бывший централизованный дисплейный зал. Место коллективного суицида от Голоса Бога. Экраны до сих пор иногда включаются, транслируя Глухую Трансляцию.",
  },
  {
    id: "destroyed-bridges",
    name: "Зона разрушенных мостов",
    floors: "5000–5100",
    floorStart: 5000,
    floorEnd: 5100,
    zone: "buffer",
    description:
      "Хаотичный лабиринт из упавших платформ, мостов и лестниц. Некоторые конструкции держатся только на старых тросах.",
  },
  {
    id: "collapsed-zone",
    name: "Рухнувшая зона",
    floors: "5000–5100",
    floorStart: 5000,
    floorEnd: 5100,
    zone: "buffer",
    description:
      "Соединена с зоной разрушенных мостов. Представляет собой рухнувшие развалины внизу и большую пустоту сверху.",
  },
  {
    id: "mirror-halls",
    name: "Секция Копий",
    floors: "5000–5100",
    floorStart: 5000,
    floorEnd: 5100,
    zone: "buffer",
    description:
      "Странный уровень, где комнаты и коридоры повторяются. Стены покрыты зеркалами. Здесь обитает больше всего Отражённых.",
  },
  {
    id: "flesh-sector",
    name: "Секция Плоти",
    floors: "5000–5100",
    floorStart: 5000,
    floorEnd: 5100,
    zone: "buffer",
    description:
      "Бывший зоопарк, превратившийся в огромную живую Плоть, вросшую в стены. Покрыта кислотой и испускает красноватые газы.",
  },
  {
    id: "water-treatment",
    name: "Секция водоочистки",
    floors: "2201–2300, Вавилон-2",
    floorStart: 2201,
    floorEnd: 2300,
    zone: "lower",
    description:
      "Центральная станция очистки сточных вод, к которой сходятся все канализационные пути и водопроводы Башни.",
  },
];
