"use client";

import React, { useState, useMemo } from "react";
import { Button } from "antd";
import PageContainer from "@/components/layout/PageContainer";
import FactionCard from "@/components/ui/FactionCard";
import {
  factions,
  locationLabels,
  locationColors,
  LocationZone,
} from "@/data/factions";

const zones: (LocationZone | "all")[] = ["all", "lower", "middle", "special"];

export default function FactionsPage() {
  const [selectedZone, setSelectedZone] = useState<LocationZone | "all">("all");

  const filtered = useMemo(
    () =>
      selectedZone === "all"
        ? factions
        : factions.filter((f) => f.zone === selectedZone),
    [selectedZone]
  );

  return (
    <PageContainer
      title="Фракции"
      subtitle={`${factions.length} объединений, населяющих Башню`}
    >
      {/* Zone filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {zones.map((zone) => {
          const isActive = selectedZone === zone;
          const count =
            zone === "all"
              ? factions.length
              : factions.filter((f) => f.zone === zone).length;
          const color = zone === "all" ? undefined : locationColors[zone];

          return (
            <Button
              key={zone}
              size="small"
              type={isActive ? "primary" : "default"}
              onClick={() => setSelectedZone(zone)}
              className="!font-mono !text-xs"
              style={
                isActive && color
                  ? { backgroundColor: color, borderColor: color }
                  : undefined
              }
            >
              {zone === "all"
                ? `Все (${count})`
                : `${locationLabels[zone]} (${count})`}
            </Button>
          );
        })}
      </div>

      {/* Factions grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
