"use client";

import React, { useState, useMemo } from "react";
import { Button } from "antd";
import PageContainer from "@/components/layout/PageContainer";
import FactionCard from "@/components/ui/FactionCard";
import { factions, factionTypeLabels, FactionType } from "@/data/factions";

const types: (FactionType | "all")[] = [
  "all",
  "clan",
  "coalition",
  "religion",
  "group",
];

export default function FactionsPage() {
  const [selectedType, setSelectedType] = useState<FactionType | "all">("all");

  const filtered = useMemo(
    () =>
      selectedType === "all"
        ? factions
        : factions.filter((f) => f.type === selectedType),
    [selectedType]
  );

  return (
    <PageContainer
      title="Фракции"
      subtitle={`${factions.length} объединений, населяющих Башню`}
    >
      {/* Type filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {types.map((type) => (
          <Button
            key={type}
            size="small"
            type={selectedType === type ? "primary" : "default"}
            onClick={() => setSelectedType(type)}
            className="!font-mono !text-xs"
          >
            {type === "all"
              ? `Все (${factions.length})`
              : `${factionTypeLabels[type]} (${factions.filter((f) => f.type === type).length})`}
          </Button>
        ))}
      </div>

      {/* Factions grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((faction) => (
          <FactionCard key={faction.id} faction={faction} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-tower-muted text-sm text-center py-12">
          В этой категории пока нет фракций.
        </p>
      )}
    </PageContainer>
  );
}
