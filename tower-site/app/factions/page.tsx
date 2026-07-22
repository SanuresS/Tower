"use client";

import React, { useState, useMemo } from "react";
import PageContainer from "@/components/layout/PageContainer";
import FactionCard from "@/components/ui/FactionCard";
import {
  factions,
  locationLabels,
  locationColors,
  LocationZone,
} from "@/data/factions";

const locationZones: LocationZone[] = ["lower", "middle", "special"];
const sectsColor = locationColors.sects;

export default function FactionsPage() {
  const [selectedZone, setSelectedZone] = useState<LocationZone | "all">("all");

  const filtered = useMemo(() => {
    if (selectedZone === "all") return factions;
    return factions.filter((f) => f.zone === selectedZone);
  }, [selectedZone]);

  const hasFilters = selectedZone !== "all";

  function resetFilters() {
    setSelectedZone("all");
  }

  function countByZone(z: LocationZone | "all") {
    if (z === "all") return factions.length;
    return factions.filter((f) => f.zone === z).length;
  }

  return (
    <PageContainer
      title="Фракции"
      subtitle={`${factions.length} объединений, населяющих Башню`}
    >
      {/* Filters */}
      <div className="space-y-4 mb-8">
        {/* Location zone filter */}
        <div>
          <p className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mb-2 m-0">
            Местоположение
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedZone("all")}
              className="px-2.5 py-1 rounded font-mono text-[11px] transition-all duration-200 border cursor-pointer"
              style={
                selectedZone === "all"
                  ? { backgroundColor: "rgba(148,163,184,0.12)", color: "#94a3b8", borderColor: "rgba(148,163,184,0.3)" }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }
              }
            >
              Все ({factions.length})
            </button>
            {locationZones.map((z) => {
              const isActive = selectedZone === z;
              const color = locationColors[z];
              const count = countByZone(z);
              return (
                <button
                  key={z}
                  onClick={() => setSelectedZone(z)}
                  className="px-2.5 py-1 rounded font-mono text-[11px] transition-all duration-200 border cursor-pointer"
                  style={
                    isActive
                      ? { backgroundColor: `${color}20`, color, borderColor: `${color}50` }
                      : { backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }
                  }
                >
                  {locationLabels[z]} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider + Sects button */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-tower-border/40 to-transparent" />
          <button
            onClick={() => setSelectedZone(selectedZone === "sects" ? "all" : "sects")}
            className="px-5 py-2 rounded-lg font-mono text-[12px] transition-all duration-300 cursor-pointer"
            style={
              selectedZone === "sects"
                ? {
                    background: `linear-gradient(135deg, ${sectsColor}25, ${sectsColor}10)`,
                    border: `1px solid ${sectsColor}50`,
                    color: sectsColor,
                    boxShadow: `0 0 24px ${sectsColor}15, inset 0 1px 0 ${sectsColor}10`,
                  }
                : {
                    backgroundColor: "transparent",
                    border: `1px solid ${sectsColor}20`,
                    color: "rgba(255,255,255,0.45)",
                  }
            }
          >
            ✦ Секты ({countByZone("sects")}) ✦
          </button>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-tower-border/40 to-transparent" />
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
          Найдено: {filtered.length} из {factions.length}
        </p>
      )}

      {/* Factions grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((faction) => (
          <FactionCard key={faction.id} faction={faction} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-tower-muted text-sm font-mono m-0">
            Нет фракций, соответствующих фильтрам.
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
