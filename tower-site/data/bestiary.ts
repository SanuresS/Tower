export type CreatureCategory =
  | "humanoid"
  | "mutant"
  | "chtonic"
  | "mechanical";

export type HabitatZone =
  | "all"
  | "upper"
  | "middle"
  | "lower"
  | "buffer"
  | "life"
  | "black"
  | "special";

export interface Creature {
  id: string;
  name: string;
  category: CreatureCategory;
  habitat: HabitatZone;
  dangerLevel: 1 | 2 | 3 | 4 | 5;
  description: string;
  tags: string[];
  encounter: { upper: number; middle: number; lower: number };
}

export const categoryLabels: Record<CreatureCategory, string> = {
  humanoid: "Люди / Гуманоиды",
  mutant: "Мутанты / Био",
  chtonic: "Хтонические твари",
  mechanical: "Механические",
};

export const categoryColors: Record<CreatureCategory, string> = {
  humanoid: "#94a3b8",
  mutant: "#22c55e",
  chtonic: "#dc2626",
  mechanical: "#737373",
};

export const dangerLabels: Record<number, string> = {
  1: "Безопасен",
  2: "Низкая",
  3: "Средняя",
  4: "Высокая",
  5: "Смертельно",
};

export const dangerColors: Record<number, string> = {
  1: "#22c55e",
  2: "#84cc16",
  3: "#eab308",
  4: "#f97316",
  5: "#dc2626",
};

export const habitatLabels: Record<HabitatZone, string> = {
  all: "По всей башне",
  upper: "Верхние этажи",
  middle: "Средние этажи",
  lower: "Нижние этажи",
  buffer: "Буферные этажи",
  life: "Этажи жизни",
  black: "Чёрные зоны",
  special: "Особые",
};

export const habitatColors: Record<HabitatZone, string> = {
  all: "#94a3b8",
  upper: "#94a3b8",
  middle: "#b8860b",
  lower: "#737373",
  buffer: "#dc2626",
  life: "#22c55e",
  black: "#404040",
  special: "#a855f7",
};

export const habitatOrder: HabitatZone[] = [
  "all",
  "upper",
  "middle",
  "lower",
  "buffer",
  "life",
  "black",
  "special",
];

export const creatures: Creature[] = [
  {
    id: "pilgrims",
    name: "Паломники",
    category: "humanoid",
    habitat: "all",
    dangerLevel: 1,
    description:
      "Сошедшие с ума люди, которые достаточно долго смотрели или слушали голос Бога. Видели ангелов, слышали подзывающий на верх зов. Безобидны, если не ставить под сомнение их видения. Часто становятся лёгкими мишенями для тварей.",
    tags: ["безумие", "безобидны", "странники"],
    encounter: { upper: 3, middle: 3, lower: 4 },
  },
  {
    id: "deaf-wanderers",
    name: "Глухари",
    category: "humanoid",
    habitat: "black",
    dangerLevel: 3,
    description:
      "Паломники, ушедшие всё дальше вглубь Башни. Долгое блуждание довело их до полного безумия: кожа серая, глаза стеклянные, движения судорожные. Могут часами стоять на одном месте. При приближении бросаются на жертву.",
    tags: ["безумие", "опасны", "агрессивны"],
    encounter: { upper: 0, middle: 0, lower: 5 },
  },
  {
    id: "ghosts",
    name: "Призраки",
    category: "humanoid",
    habitat: "special",
    dangerLevel: 1,
    description:
      "Люди, чьё «я» мертво, но оболочка жива. Сознание выжжено Голосом Бога. Делают вид, что выполняют свою последнюю роль, не обращая внимания на окружающих. Похожи на людей с тяжёлой деменцией.",
    tags: ["автоматизм", "безобидны", "трагедия"],
    encounter: { upper: 2, middle: 1, lower: 1 },
  },
  {
    id: "shining",
    name: "Светящиеся",
    category: "humanoid",
    habitat: "special",
    dangerLevel: 2,
    description:
      "Особая редкая разновидность призраков. Светящиеся белые человеческие фигуры. Если прикоснуться — сущность на мгновение начнёт очень сильно светиться, а после исчезнет вместе с человеком.",
    tags: ["аномальны", "бесцельны", "исчезновение"],
    encounter: { upper: 3, middle: 1, lower: 0 },
  },
  {
    id: "devils",
    name: "Черти",
    category: "chtonic",
    habitat: "lower",
    dangerLevel: 4,
    description:
      "Гуманоидные хтонические твари. Чёрного цвета, с рептилоидной пастью. Питаются человеческим страхом. Умны и хитры, стараются не нападать на группы. Слабое место — раны заставляют их убегать.",
    tags: ["умны", "хищники", "играют с жертвой"],
    encounter: { upper: 0, middle: 2, lower: 4 },
  },
  {
    id: "spider-cablewalkers",
    name: "Пауки-Канатоходцы",
    category: "mutant",
    habitat: "lower",
    dangerLevel: 4,
    description:
      "Био-механические создания с длинными конечностями. Перемещаются по канатам, проводам и трубам. Охотятся сверху, сбрасываясь на жертву. Когти оставляют глубокие царапины на металле.",
    tags: ["охота сверху", "био-механика", "паутина"],
    encounter: { upper: 1, middle: 2, lower: 4 },
  },
  {
    id: "whisperers",
    name: "Шептуны",
    category: "chtonic",
    habitat: "lower",
    dangerLevel: 4,
    description:
      "Хтонические твари, скрывающиеся в тёмных уголках. Неподвижно сидят в тех местах, куда не падает свет, нашёптывая проходящим мимо существам. Их шёпот идёт напрямую в мозг. Если подойти слишком близко — заорут и потянут щупальцами.",
    tags: ["шёпот", "ловушки", "огнемёт эффективен"],
    encounter: { upper: 0, middle: 2, lower: 4 },
  },
  {
    id: "elevator-creatures",
    name: "Лифтовики",
    category: "chtonic",
    habitat: "lower",
    dangerLevel: 5,
    description:
      "Хтонические твари чёрного цвета, живущие внизу шахт лифтов. Внимательно слушают каждый этаж. Услышав живое существо, протягивают длинную тёмную руку и утаскивают к себе.",
    tags: ["засада", "шахты", "крупные"],
    encounter: { upper: 0, middle: 1, lower: 5 },
  },
  {
    id: "reflected",
    name: "Отражённые",
    category: "chtonic",
    habitat: "special",
    dangerLevel: 4,
    description:
      "Хтонические твари, обитающие в зеркалах. Если слишком долго смотреть в зеркало, отражение остановится и начнёт улыбаться. Затем верхняя часть тела вылезет из зеркала и поглотит оригинал.",
    tags: ["зеркала", "обман", "поглощение"],
    encounter: { upper: 2, middle: 2, lower: 1 },
  },
  {
    id: "blink-devils",
    name: "Бликовики",
    category: "chtonic",
    habitat: "upper",
    dangerLevel: 4,
    description:
      "Двумерные существа, напоминающие солнечные зайчики. Скачут по стенам. Их отражённый свет ослепляет и вызывает невыносимую боль. Загоняют жертву к отражающей поверхности, после чего прыгают в отражение, выжигая сознание.",
    tags: ["двумерные", "свет", "стая"],
    encounter: { upper: 4, middle: 2, lower: 0 },
  },
  {
    id: "scavenger-grubs",
    name: "Падальщики",
    category: "mutant",
    habitat: "all",
    dangerLevel: 1,
    description:
      "Мутировавшие гусеницы, раздутые до человеческого размера. Серого цвета, отличный камуфляж. Питаются разлагающимися трупами, гнилью и даже частично металлом. Беззащитны и уязвимы.",
    tags: ["мусорщики", "скрытны", "не опасны"],
    encounter: { upper: 2, middle: 3, lower: 4 },
  },
  {
    id: "bone-worms",
    name: "Черви",
    category: "mutant",
    habitat: "special",
    dangerLevel: 3,
    description:
      "Мутировавшая форма червей длиной 3–8 метров. Буровая коронка способна крошить бетон и металл. Прокладывают стабильные тоннели, которые сталкеры используют как проходы через завалы. Не агрессивны.",
    tags: ["строители тоннелей", "полезны", "не агрессивны"],
    encounter: { upper: 0, middle: 1, lower: 3 },
  },
  {
    id: "hripuns",
    name: "Хрипуны",
    category: "mutant",
    habitat: "lower",
    dangerLevel: 4,
    description:
      "Частный случай био-автоматона. Грибок заполнил ремонтную платформу, обрастая мозгоподобной нервной системой. Четвероногая массивная морфология. Цель — заражать спорами электронику. Встречаются возле сети ЦСУ.",
    tags: ["био-механика", "споры", "заражение"],
    encounter: { upper: 0, middle: 3, lower: 4 },
  },
  {
    id: "shavkas",
    name: "Шавки",
    category: "mutant",
    habitat: "lower",
    dangerLevel: 3,
    description:
      "Био-автоматон, поражённый мицелием Хрипуна, но не подключённый к сети ЦСУ. Меньше и слабее Хрипуна, но обладает высокой скоростью и манёвренностью. Ставит целью заражать мицелием электронику.",
    tags: ["быстрые", "споры", "заражение"],
    encounter: { upper: 0, middle: 3, lower: 3 },
  },
  {
    id: "crawlers",
    name: "Трескуны",
    category: "chtonic",
    habitat: "lower",
    dangerLevel: 3,
    description:
      "Хтоническая тварь, напоминающая гигантскую сороконожку длиной до 3 м. Покрыта ржавыми металлическими пластинами. Издаёт громкий щёлкающий звук для ориентации в темноте. Мясо несъедобно.",
    tags: ["металл", "щёлканье", "ориентация звуком"],
    encounter: { upper: 0, middle: 1, lower: 4 },
  },
  {
    id: "photids",
    name: "Фотиды",
    category: "mutant",
    habitat: "all",
    dangerLevel: 1,
    description:
      "Мутировавшие биолюминесцентные организмы освещения. Испускают мягкий рассеянный свет. Периодически сбрасывают плодовые тела «Светящиеся Спорангии». Основа трофической цепи в темноте Башни.",
    tags: ["свет", "безопасны", "биолюминесценция"],
    encounter: { upper: 2, middle: 3, lower: 4 },
  },
  {
    id: "svochi",
    name: "Светочи",
    category: "mutant",
    habitat: "special",
    dangerLevel: 1,
    description:
      "Крупные стационарные и медленно дрейфующие организмы, напоминающие гигантские медузы диаметром 2–10 метров. Излучают тёплый бело-жёлтый свет. Дрейфуют, следуя за потоками тёплого воздуха.",
    tags: ["свет", "дрейфуют", "кислород"],
    encounter: { upper: 3, middle: 2, lower: 1 },
  },
  {
    id: "silence",
    name: "Тихони",
    category: "chtonic",
    habitat: "upper",
    dangerLevel: 5,
    description:
      "Остатки акустической системы безопасности. Мерцающие в воздухе искажения. При возникновении звука громче шёпота формируют акустическую воронку, разрывая барабанные перепонки, органы и кости звуковым ударом.",
    tags: ["звук", "тишина", "смертельно опасны"],
    encounter: { upper: 5, middle: 2, lower: 0 },
  },
  {
    id: "silenciarium",
    name: "Тишинариумы",
    category: "chtonic",
    habitat: "upper",
    dangerLevel: 4,
    description:
      "Физическая аномалия — сгусток искажённой физики звуковых волн. Почти абсолютная тишина. Поглощает любой звук и накапливает энергию. При пересечении границы высвобождает звуковой удар.",
    tags: ["физическая аномалия", "тишина", "эхо"],
    encounter: { upper: 4, middle: 2, lower: 0 },
  },
  {
    id: "bitumers",
    name: "Битумники",
    category: "chtonic",
    habitat: "lower",
    dangerLevel: 3,
    description:
      "Бесформенные текучие существа из чёрной маслянистой жидкости, пахнущей мазутом и гнилью. Могут принимать смутные очертания людей. Образовались из бактерий в битумных трубопроводах.",
    tags: ["жидкость", "нефть", "коллективное сознание"],
    encounter: { upper: 0, middle: 2, lower: 3 },
  },
  {
    id: "rats",
    name: "Крысы",
    category: "mutant",
    habitat: "all",
    dangerLevel: 2,
    description:
      "Мутировавшие крысы, ставшие больше, сильнее и опаснее. Собираются в стаи, ведут кочевой образ жизни. Контроль над популяциями — важный ресурс для племён нижних этажей.",
    tags: ["стаи", "пища", "кочевники"],
    encounter: { upper: 2, middle: 3, lower: 4 },
  },
  {
    id: "trigons",
    name: "Тригоны",
    category: "mechanical",
    habitat: "all",
    dangerLevel: 1,
    description:
      "Маленькие насекомые-пчёлы, питающиеся падалью. Были собраны ещё до апокалипсиса. Производят мясной мёд — питательную белковую смесь из гнилой плоти. После апокалипсиса их стало невероятно много.",
    tags: ["пчёлы", "падаль", "мясной мёд"],
    encounter: { upper: 3, middle: 3, lower: 3 },
  },
  {
    id: "crows",
    name: "Вороны",
    category: "mutant",
    habitat: "special",
    dangerLevel: 2,
    description:
      "Крупные крылатые хищники, мутировавшие из домашних птиц. Обитают в открытых больших пространствах, вьют гнёзда там, где другие существа их не достанут.",
    tags: ["крылатые", "хищники", "гнёзда"],
    encounter: { upper: 2, middle: 2, lower: 1 },
  },
  {
    id: "iron-moths",
    name: "Железницы",
    category: "mechanical",
    habitat: "middle",
    dangerLevel: 1,
    description:
      "Мутировавшие сенсорные компоненты для мониторинга металлоконструкций. Крупная моль с размахом крыльев 5–8 см. Питаются ржавчиной. Не наносят вреда здоровому металлу.",
    tags: ["моль", "ржавчина", "безвредны"],
    encounter: { upper: 1, middle: 4, lower: 1 },
  },
  {
    id: "flesh",
    name: "Плоть",
    category: "mutant",
    habitat: "special",
    dangerLevel: 5,
    description:
      "Огромная животная и живая Плоть, вросшая в стену. Обладает глазами, носами и ушами разных форм. Покрыта ферментированной кислотой. Испускает красноватые газы, вызывающие потерю сознания.",
    tags: ["единичный экземпляр", "кислота", "газы"],
    encounter: { upper: 0, middle: 1, lower: 2 },
  },
];
