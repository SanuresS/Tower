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

        {/* All button — prominent, centered, directly above Sects */}
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedZone("all")}
            className="px-6 py-2.5 rounded-xl font-mono text-[12px] tracking-wide transition-all duration-300 border cursor-pointer"
            style={
              selectedZone === "all"
                ? {
                    background: "linear-gradient(135deg, rgba(148,163,184,0.15), rgba(148,163,184,0.05))",
                    color: "#cbd5e1",
                    borderColor: "rgba(148,163,184,0.4)",
                    boxShadow: "0 0 20px rgba(148,163,184,0.1), inset 0 1px 0 rgba(148,163,184,0.1)",
                  }
                : {
                    background: "linear-gradient(135deg, rgba(148,163,184,0.06), rgba(148,163,184,0.02))",
                    color: "rgba(148,163,184,0.65)",
                    borderColor: "rgba(148,163,184,0.2)",
                    boxShadow: "none",
                  }
            }
          >
            Все ({factions.length})
          </button>
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
