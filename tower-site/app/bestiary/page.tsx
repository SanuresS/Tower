"use client";

import React, { useState, useMemo } from "react";
import PageContainer from "@/components/layout/PageContainer";
import CreatureCard from "@/components/ui/CreatureCard";
import {
  creatures,
  categoryLabels,
  categoryColors,
  dangerLabels,
  dangerColors,
  habitatLabels,
  habitatColors,
  habitatOrder,
  CreatureCategory,
  HabitatZone,
} from "@/data/bestiary";
import { getFilterStyle } from "@/lib/filters";

const categories: (CreatureCategory | "all")[] = [
  "all",
  "humanoid",
  "mutant",
  "chtonic",
  "mechanical",
];

const dangerLevels: (number | "all")[] = ["all", 1, 2, 3, 4, 5];

export default function BestiaryPage() {
  const [selectedCategory, setSelectedCategory] = useState<CreatureCategory | "all">("all");
  const [selectedHabitat, setSelectedHabitat] = useState<HabitatZone | "all">("all");
  const [selectedDanger, setSelectedDanger] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    return creatures.filter((c) => {
      if (selectedCategory !== "all" && c.category !== selectedCategory) return false;
      if (selectedHabitat !== "all" && c.habitat !== selectedHabitat) return false;
      if (selectedDanger !== "all" && c.dangerLevel !== selectedDanger) return false;
      return true;
    });
  }, [selectedCategory, selectedHabitat, selectedDanger]);

  const hasFilters = selectedCategory !== "all" || selectedHabitat !== "all" || selectedDanger !== "all";

  function resetFilters() {
    setSelectedCategory("all");
    setSelectedHabitat("all");
    setSelectedDanger("all");
  }

  function countByCategory(cat: CreatureCategory | "all") {
    if (cat === "all") return creatures.length;
    return creatures.filter((c) => c.category === cat).length;
  }

  function countByHabitat(h: HabitatZone | "all") {
    if (h === "all") return creatures.length;
    return creatures.filter((c) => c.habitat === h).length;
  }

  function countByDanger(d: number) {
    return creatures.filter((c) => c.dangerLevel === d).length;
  }

  return (
    <PageContainer
      title="Существа"
      subtitle={`${creatures.length} существ, обитающих в разных зонах Башни`}
    >
      {/* Filters */}
      <div className="space-y-4 mb-8">
        {/* Category */}
        <div>
          <p className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mb-2 m-0">
            Классификация
          </p>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const color = cat === "all" ? "#94a3b8" : categoryColors[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-2.5 py-1 rounded-full font-mono text-[11px] transition-all duration-200 border cursor-pointer"
                  style={getFilterStyle(selectedCategory === cat, color)}
                >
                  {cat === "all" ? `Все (${creatures.length})` : `${categoryLabels[cat]} (${countByCategory(cat)})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Habitat zone */}
        <div>
          <p className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mb-2 m-0">
            Зона обитания
          </p>
          <div className="flex flex-wrap gap-1.5">
            {habitatOrder.map((h) => {
              const color = h === "all" ? "#94a3b8" : habitatColors[h];
              const count = countByHabitat(h);
              if (count === 0 && h !== "all") return null;
              return (
                <button
                  key={h}
                  onClick={() => setSelectedHabitat(h)}
                  className="px-2.5 py-1 rounded-full font-mono text-[11px] transition-all duration-200 border cursor-pointer"
                  style={getFilterStyle(selectedHabitat === h, color)}
                >
                  {h === "all" ? `Все (${creatures.length})` : `${habitatLabels[h]} (${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Danger level */}
        <div>
          <p className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mb-2 m-0">
            Уровень опасности
          </p>
          <div className="flex flex-wrap gap-1.5">
            {dangerLevels.map((d) => {
              const color = d === "all" ? "#94a3b8" : dangerColors[d];
              const label = d === "all" ? "Все" : dangerLabels[d];
              const count = d === "all" ? creatures.length : countByDanger(d);
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDanger(d)}
                  className="px-2.5 py-1 rounded-full font-mono text-[11px] transition-all duration-200 border cursor-pointer"
                  style={getFilterStyle(selectedDanger === d, color)}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {hasFilters && (
          <button
            onClick={resetFilters}
            className="text-[11px] font-mono text-tower-rust/70 hover:text-tower-rust transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      {hasFilters && (
        <p className="text-tower-muted text-xs font-mono mb-4 m-0">
          Найдено: {filtered.length} из {creatures.length}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((creature) => (
          <CreatureCard key={creature.id} creature={creature} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-tower-muted text-sm font-mono m-0">
            Нет существ, соответствующих фильтрам.
          </p>
          <button
            onClick={resetFilters}
            className="text-tower-rust text-xs font-mono mt-2 hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </PageContainer>
  );
}
