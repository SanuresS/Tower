/* ─── Shared types across all data modules ─── */

export type Religion =
  | "atheism"
  | "free"
  | "ezibtu"
  | "rishtu"
  | "lamashtu_cult"
  | "silence_cult"
  | "forest_collective"
  | "echo_worship"
  | "yehudimism"
  | "none";

export const religionLabels: Record<Religion, string> = {
  atheism: "Атеизм",
  free: "Свободное вероисповедание",
  ezibtu: "Эзибту Ша-ЦСУ",
  rishtu: "Ришту Ша-ЦСУ",
  lamashtu_cult: "Культ Ламашту",
  silence_cult: "Культ тишины",
  forest_collective: "Коллектив леса",
  echo_worship: "Поклонение Эху",
  yehudimism: "Йехудимизм",
  none: "Нет",
};

export const religionColors: Record<Religion, string> = {
  atheism: "#6b7280",
  free: "#94a3b8",
  ezibtu: "#0ea5e9",
  rishtu: "#dc2626",
  lamashtu_cult: "#a855f7",
  silence_cult: "#7f8c9b",
  forest_collective: "#22c55e",
  echo_worship: "#ec4899",
  yehudimism: "#f59e0b",
  none: "#525252",
};
