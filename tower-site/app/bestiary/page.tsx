"use client";

import React, { useState, useMemo } from "react";
import { Button } from "antd";
import PageContainer from "@/components/layout/PageContainer";
import CreatureCard from "@/components/ui/CreatureCard";
import {
  creatures,
  categoryLabels,
  CreatureCategory,
} from "@/data/bestiary";

const categories: (CreatureCategory | "all")[] = [
  "all",
  "humanoid",
  "mutant",
  "chtonic",
  "flora",
  "anomaly",
  "mechanical",
];

export default function BestiaryPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    CreatureCategory | "all"
  >("all");

  const filtered = useMemo(
    () =>
      selectedCategory === "all"
        ? creatures
        : creatures.filter((c) => c.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <PageContainer
      title="Существа"
      subtitle={`${creatures.length} существ, обитающих в разных зонах Башни`}
    >
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            size="small"
            type={selectedCategory === cat ? "primary" : "default"}
            onClick={() => setSelectedCategory(cat)}
            className="!font-mono !text-xs"
          >
            {cat === "all"
              ? `Все (${creatures.length})`
              : `${categoryLabels[cat]} (${creatures.filter((c) => c.category === cat).length})`}
          </Button>
        ))}
      </div>

      {/* Creatures grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((creature) => (
          <CreatureCard key={creature.id} creature={creature} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-tower-muted text-sm text-center py-12">
          В этой категории пока нет существ.
        </p>
      )}
    </PageContainer>
  );
}
