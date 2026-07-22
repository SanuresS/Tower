export type CityZone = "lower" | "middle" | "special";

export type CitySize = "hive" | "large" | "city" | "small" | "outpost";

export type CitySpecialization =
  | "none"
  | "capital"
  | "fortress"
  | "bastion"
  | "trade"
  | "resource"
  | "industrial";

export type CityFactionGroup =
  | "clans"
  | "coalition"
  | "witnesses"
  | "military"
  | "other";

export interface City {
  id: string;
  name: string;
  zone: CityZone;
  size: CitySize;
  specialization: CitySpecialization;
  factionGroup: CityFactionGroup;
  factionName?: string;
  population?: string;
  description: string;
  color: string;
}

/* ─── Labels ─── */

export const cityZoneLabels: Record<CityZone, string> = {
  lower: "Нижние этажи",
  middle: "Средние этажи",
  special: "Особые этажи",
};

export const cityZoneColors: Record<CityZone, string> = {
  lower: "#b8860b",
  middle: "#94a3b8",
  special: "#22c55e",
};

export const citySizeLabels: Record<CitySize, string> = {
  hive: "Город-Улей",
  large: "Крупный город",
  city: "Город",
  small: "Небольшой город",
  outpost: "Форпост",
};

export const citySpecializationLabels: Record<CitySpecialization, string> = {
  none: "Без специализации",
  capital: "Столица",
  fortress: "Город-Крепость",
  bastion: "Бастион",
  trade: "Торговый город",
  resource: "Сырьевой город",
  industrial: "Производственный город",
};

export const cityFactionGroupLabels: Record<CityFactionGroup, string> = {
  clans: "Кланы",
  coalition: "Коалиция",
  witnesses: "Свидетели Эха",
  military: "Военные",
  other: "Другие",
};

/* ─── Data ─── */

export const cities: City[] = [
  // ═══════════════════════════════════════
  //  НИЖНИЕ ЭТАЖИ — КЛАН ЗУБАККАР
  // ═══════════════════════════════════════

  {
    id: "ekal-sharri",
    name: "Экал-Шарри",
    zone: "lower",
    size: "large",
    specialization: "capital",
    factionGroup: "clans",
    factionName: 'Клан «Зубаккар»',
    population: "Крупный",
    description:
      "«Дворец Царя». Столица клана Зубаккар, перестроенная секция бывшего административно-складского комплекса. Включает жилые кварталы, арсенал, рынок, мастерские и Колизей, где Шаррум устраивает битвы гладиаторов-рабов. Здесь живут рабовладельцы и влиятельные люди клана.",
    color: "#b8860b",
  },
  {
    id: "bit-nagi",
    name: "Бит-Наги",
    zone: "lower",
    size: "city",
    specialization: "industrial",
    factionGroup: "clans",
    factionName: 'Клан «Зубаккар»',
    description:
      "«Дом Покорённых». Мрачное поселение-мастерская, бывшая жилая секция. Рабы трудятся на ткацких станках, в кузницах и на сортировке металлолома. Управляется надсмотрщиками из клана.",
    color: "#b8860b",
  },
  {
    id: "kar-ashshur",
    name: "Кар-Ашшур",
    zone: "lower",
    size: "city",
    specialization: "resource",
    factionGroup: "clans",
    factionName: 'Клан «Зубаккар»',
    description:
      "«Крепость Ашшура». Сырьевой город рядом с гидропонной фермой. Земледельцы и охрана обеспечивают бесперебойную работу фермы. Фактически часть клана, но формально «союзная община». 75% урожая клану в обмен на защиту.",
    color: "#b8860b",
  },
  {
    id: "zhelezny-ustup",
    name: "Рудник «Железный Уступ»",
    zone: "lower",
    size: "city",
    specialization: "resource",
    factionGroup: "clans",
    factionName: 'Клан «Зубаккар»',
    description:
      "Сырьевой город шахтёров и плавильщиков. Добыча чёрного металла из развалин старых конструкций. 80% добычи поступает в казну клана. Монопольное право клана на изготовление оружия из чёрного металла.",
    color: "#b8860b",
  },
  {
    id: "rektar",
    name: "Ректар",
    zone: "lower",
    size: "small",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Зубаккар»',
    description:
      "Небольшой город, религиозный центр Ришту Ша-ЦСУ. Община сформировалась беглыми Плотниками, отказавшимися почитать культ ЦСУ. Шаррум подчинил её, поддержав местные устои и распространив на весь клан.",
    color: "#b8860b",
  },

  // ═══════════════════════════════════════
  //  НИЖНИЕ ЭТАЖИ — КЛАН ГАНТАЛЬ
  // ═══════════════════════════════════════

  {
    id: "dur-nun",
    name: "Дур-Нун",
    zone: "lower",
    size: "hive",
    specialization: "fortress",
    factionGroup: "clans",
    factionName: 'Клан «Ганталь»',
    population: "Крупный",
    description:
      "Город-крепость и город-улей, бывший многоуровневый военный склад. Столица клана Ганталь. Оружейные мастерские снабжают добрую половину банд нижних этажей. Два крупных мобильных отряда базируются здесь.",
    color: "#b8860b",
  },
  {
    id: "bit-kuri",
    name: "Бит-Кури",
    zone: "lower",
    size: "city",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Ганталь»',
    description:
      "Город клана Ганталь, один из крупных населённых пунктов под контролем железного кулака. Основная специализация — обеспечение клана продовольствием и рабочей силой.",
    color: "#b8860b",
  },
  {
    id: "kar-apla",
    name: "Кар-Апла",
    zone: "lower",
    size: "city",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Ганталь»',
    description:
      "Город клана Ганталь. Расположен вблизи транспортных путей, контролируемых кланом. Играет роль в логистике и снабжении военных подразделений.",
    color: "#b8860b",
  },

  // ═══════════════════════════════════════
  //  НИЖНИЕ ЭТАЖИ — КЛАН БАРЗАХ
  // ═══════════════════════════════════════

  {
    id: "kal-barzakh",
    name: "Кал-Барзах",
    zone: "lower",
    size: "city",
    specialization: "capital",
    factionGroup: "clans",
    factionName: 'Клан «Барзах»',
    population: "Средний",
    description:
      "Столица клана Барзах, бывшая секция логистического предприятия. Военная коллегиальная диктатура, управляемая Советом Пяти. Контролируют торговые маршруты и ЛТУ, взимают пошлины за проход.",
    color: "#b8860b",
  },
  {
    id: "tatatentan",
    name: "Тататентан",
    zone: "lower",
    size: "city",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Барзах»',
    description:
      "Город клана Барзах, один из опорных пунктов на торговых маршрутах. Здесь располагается один из фортпостов, контролирующих проход через локальные транспортные узлы.",
    color: "#b8860b",
  },
  {
    id: "ouskhen-at",
    name: "Оусхэн-Ат",
    zone: "lower",
    size: "city",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Барзах»',
    description:
      "Город клана Барзах. Расположен вблизи промышленных секций, где производятся яды «Адады» и противоядия — основная продукция клана.",
    color: "#b8860b",
  },
  {
    id: "shi-masl",
    name: "Ши-Масл",
    zone: "lower",
    size: "small",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Барзах»',
    description:
      "Небольшой город клана Барзах. Обслуживает транспортные маршруты и обеспечивает клан проводниками для караванов, следующих по ЛТУ.",
    color: "#b8860b",
  },

  // ═══════════════════════════════════════
  //  НИЖНИЕ ЭТАЖИ — КЛАН ЛАМАШТУ
  // ═══════════════════════════════════════

  {
    id: "maru-ishtu",
    name: "Мару-Ишту",
    zone: "lower",
    size: "hive",
    specialization: "capital",
    factionGroup: "clans",
    factionName: 'Клан «Ламашту»',
    description:
      "«Горькое Гнездо». Столица клана Ламашту, город-улей. Мрачный, чудовищно перенаселённый лабиринт. Здесь производят «Слёзы Ламашту» — уникальный органический клей. Управляется Советом Двенадцати Семей.",
    color: "#b8860b",
  },
  {
    id: "in-nisu",
    name: "Ин-Нису",
    zone: "lower",
    size: "city",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Ламашту»',
    description:
      "«Гнездо Забытых». Город клана Ламашту, специализирующийся на кузнечном и стекольном производстве. Здесь работают наиболее квалифицированные рабочие клана.",
    color: "#b8860b",
  },
  {
    id: "eribu",
    name: "Эрибу",
    zone: "lower",
    size: "city",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Ламашту»',
    description:
      "Самый «цивилизованный» город клана Ламашту. Торговый центр, где происходит обмен продукцией между стаями и внешними партнёрами. Наиболее безопасное место среди владений клана.",
    color: "#b8860b",
  },

  // ═══════════════════════════════════════
  //  НИЖНИЕ ЭТАЖИ — КЛАН АСКАРИ
  // ═══════════════════════════════════════

  {
    id: "bit-askari",
    name: "Бит-Аскари",
    zone: "lower",
    size: "city",
    specialization: "capital",
    factionGroup: "clans",
    factionName: 'Клан «Аскари»',
    population: "Средний",
    description:
      "Столица клана Аскари, крупный производственный город в бывшей секции био-фармацевтического комплекса. Производят лучшие медикаменты, стероиды и наркотики. Личность Атамана скрыта за «Правилом Серебряной Маски».",
    color: "#b8860b",
  },
  {
    id: "tlat-ishkhat",
    name: "Тлат-Ишхат",
    zone: "lower",
    size: "city",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Аскари»',
    description:
      "Город клана Аскари, один из центров производства фармацевтической продукции. Здесь расположены основные лаборатории по синтезу препаратов.",
    color: "#b8860b",
  },
  {
    id: "maklu",
    name: "Ма́клу",
    zone: "lower",
    size: "small",
    specialization: "none",
    factionGroup: "clans",
    factionName: 'Клан «Аскари»',
    description:
      "Небольшой город клана Аскари. Обеспечивает клан сырьём для производства медикаментов и наркотиков, а также служит перевалочным пунктом для подпольной сети «Шамашшу».",
    color: "#b8860b",
  },

  // ═══════════════════════════════════════
  //  НИЖНИЕ ЭТАЖИ — КОАЛИЦИЯ
  // ═══════════════════════════════════════

  {
    id: "namtar",
    name: "Намтар",
    zone: "lower",
    size: "large",
    specialization: "none",
    factionGroup: "coalition",
    factionName: "Коалиция",
    population: "Крупный",
    description:
      "Старейший и крупнейший город Коалиции. Расположен в гигантской секции бывшего Административного Центра Планирования. Центр торговли и финансов, здесь располагаются Совет Консулов, Верховный Арбитраж и Штаб-Квартира Легиона.",
    color: "#b8860b",
  },
  {
    id: "faliviv",
    name: "Фаливив",
    zone: "lower",
    size: "large",
    specialization: "trade",
    factionGroup: "coalition",
    factionName: "Коалиция",
    population: "Крупный",
    description:
      "Крупный торговый город, построенный кланом Барзах. Город развлечений и услуг, Колизей Фаливива — самая престижная арена на нижних этажах. Школы гладиаторов, бордели, рестораны. Крупный центр работорговли.",
    color: "#b8860b",
  },
  {
    id: "eshman",
    name: "Эшман",
    zone: "lower",
    size: "large",
    specialization: "trade",
    factionGroup: "coalition",
    factionName: "Коалиция",
    description:
      "Город-храм, священное сердце культа Эзибту Ша-ЦСУ. Место мученической смерти Иешуа Ибн Пантера Га-ноцри. Торгует религиозно-научными трудами, сложными имплантами и аналоговыми приборами. Половина населения — паломники и Плотники.",
    color: "#b8860b",
  },
  {
    id: "ulmash",
    name: "Ульмаш",
    zone: "lower",
    size: "city",
    specialization: "fortress",
    factionGroup: "coalition",
    factionName: "Коалиция",
    description:
      "Город-крепость, символ воинской доблести Коалиции. Расположен в бывшей секции производства фильтров и насосов. Главный производитель насосов, труб, огнемётов и сложной гидравлики. Лидер фракции «ястребов».",
    color: "#b8860b",
  },
  {
    id: "nibru",
    name: "Нибру",
    zone: "lower",
    size: "small",
    specialization: "trade",
    factionGroup: "coalition",
    factionName: "Коалиция",
    description:
      "Небольшой торговый город, вытянутый вдоль коридоров. Город сталкеров, зарабатывающих поиском до апокалиптических ценностей. Лучшие проводники и картографы нижних этажей. Почтовый хаб Коалиции.",
    color: "#b8860b",
  },
  {
    id: "dullu",
    name: "Дуллу",
    zone: "lower",
    size: "small",
    specialization: "none",
    factionGroup: "coalition",
    factionName: "Коалиция",
    description:
      "Город-улей, компактное, густонаселённое бедное поселение в перестроенных резервуарах. Место выделки кожи и меха, производства примитивной взрывчатки и химикатов. «Страна Бомжей».",
    color: "#b8860b",
  },
  {
    id: "guzalu",
    name: "Гузалу",
    zone: "lower",
    size: "small",
    specialization: "resource",
    factionGroup: "coalition",
    factionName: "Коалиция",
    description:
      "Небольшой сырьевой город вокруг геотермальной аномалии «Дыхание Башни». Главный аграрный центр Коалиции. Поставщик овощей, грибов и целебных трав. Плотники — эксперты в примитивных биотехнологиях.",
    color: "#b8860b",
  },
  {
    id: "gira",
    name: "Гира",
    zone: "lower",
    size: "small",
    specialization: "bastion",
    factionGroup: "coalition",
    factionName: "Коалиция",
    description:
      "Бастион на колоссальном мосту через Глотку (ЦШТР-Ω). Стратегически важный пункт, бутылочное горлышко для прохода к западной части Вавилона-3. Торгует проходом через мост и услугами проводников.",
    color: "#b8860b",
  },

  // ═══════════════════════════════════════
  //  НИЖНИЕ ЭТАЖИ — ПРОЧИЕ
  // ═══════════════════════════════════════

  {
    id: "styk",
    name: "Торжище «Стык»",
    zone: "lower",
    size: "large",
    specialization: "trade",
    factionGroup: "other",
    description:
      "Крупнейший торговый узел нижних этажей. Нейтральный город-государство в огромной секции торгового центра. Неписаный закон: «Кровь не льётся там, где звенит монета». Управляет Совет Старейшин.",
    color: "#b8860b",
  },
  {
    id: "kromka",
    name: "Кромка",
    zone: "lower",
    size: "small",
    specialization: "none",
    factionGroup: "other",
    description:
      "Поселение изгоев, охотников и добытчиков на границе Разросшегося и Грибного лесов. Анархия с элементом взаимовыручки. Главный товар — «продукты леса»: шкуры, яды, информация.",
    color: "#b8860b",
  },

  // ═══════════════════════════════════════
  //  СРЕДНИЕ ЭТАЖИ
  // ═══════════════════════════════════════

  {
    id: "witnesses-buffer",
    name: "Город у буферной зоны",
    zone: "middle",
    size: "small",
    specialization: "none",
    factionGroup: "witnesses",
    factionName: "Свидетели Эха",
    description:
      "Небольшой город недалеко от буферной зоны. Сборище Паломников и последователей культа. Религиозная община, сохраняющая рассудок благодаря духовным практикам. Паломники добираются до Секции перегоревших Экранов.",
    color: "#94a3b8",
  },
  {
    id: "witnesses-upper",
    name: "Город на средних этажах",
    zone: "middle",
    size: "city",
    specialization: "none",
    factionGroup: "witnesses",
    factionName: "Свидетели Эха",
    description:
      "Город Свидетелей Эха на границе с высокими этажами. Перевалочный пункт для Паломников. Харизматичные священники убеждают остаться, принося пользу городу. Свидетели не строят город выше, опасаясь святых ангелов.",
    color: "#94a3b8",
  },
  {
    id: "military-settlement-1",
    name: "Поселение Военных (1)",
    zone: "middle",
    size: "outpost",
    specialization: "none",
    factionGroup: "military",
    factionName: "Военные",
    description:
      "Одно из двух поселений Военных на средних этажах. Город Граждан, обеспечивающий самообеспечение: выращивание круп и скота, создание вооружения, синтез препаратов. Граждане не могут самовольно покидать город.",
    color: "#94a3b8",
  },
  {
    id: "military-settlement-2",
    name: "Поселение Военных (2)",
    zone: "middle",
    size: "outpost",
    specialization: "none",
    factionGroup: "military",
    factionName: "Военные",
    description:
      "Второе поселение Военных на средних этажах. Аналогичная структура: Граждане, Воины, Скот. Связь с другими поселениями через кастрированную сеть ЦСУ. База для охоты на монстров и управления FPV-дронами.",
    color: "#94a3b8",
  },
  {
    id: "librarians-city",
    name: "Город в Библиотеке",
    zone: "middle",
    size: "small",
    specialization: "none",
    factionGroup: "other",
    factionName: "Орден Библиотекарей",
    description:
      "Город в хорошо сохранившейся части 40-этажной Вавилонской Библиотеки. Затворнический орден учёных-монахов. Хранители знаний, культ тишины. Торгуют копиями книг и информацией.",
    color: "#94a3b8",
  },
  {
    id: "silent-brotherhood-city",
    name: "Город Молчальников",
    zone: "middle",
    size: "small",
    specialization: "none",
    factionGroup: "other",
    factionName: "Молчальники",
    description:
      "Небольшой город в пустой жилой секции. Обет полного молчания — общаются жестами и записками. Заложили большинство проходов кирпичом и бетоном. Раз в год каждый имеет право произнести одно слово.",
    color: "#94a3b8",
  },
  {
    id: "dawn-colony-city",
    name: "Город Рассвета",
    zone: "middle",
    size: "city",
    specialization: "none",
    factionGroup: "other",
    factionName: 'Колония «Рассвет»',
    description:
      "Крупный город техно-коммуны в секции жилых комплексов. Основан интеллектуалами и инженерами, нашедшими архивы социалистического периода. Управление — Совет Инженеров, решения по протоколам прошлого.",
    color: "#94a3b8",
  },

  // ═══════════════════════════════════════
  //  ОСОБЫЕ ЭТАЖИ
  // ═══════════════════════════════════════

  {
    id: "forest-city-1",
    name: "Город Леса (1)",
    zone: "special",
    size: "small",
    specialization: "none",
    factionGroup: "other",
    factionName: "Лесные жители",
    description:
      "Жилые секции, вплетённые в структуру Разросшегося леса. Здания стоят, но стены и перекрытия пронизаны корнями и лианами. Обитатели — потомки людей, принявших симбиоз с лесом. Зеленоватый оттенок кожи, светящиеся глаза.",
    color: "#22c55e",
  },
  {
    id: "forest-city-2",
    name: "Город Леса (2)",
    zone: "special",
    size: "small",
    specialization: "none",
    factionGroup: "other",
    factionName: "Лесные жители",
    description:
      "Второй город лесных жителей в Разросшемся лесе. Коллективное сознание через «роевой интеллект». Обязаны обслуживать лес: лечить деревья, направлять реки, разделывать хтонических тварей для удобрений.",
    color: "#22c55e",
  },
];
