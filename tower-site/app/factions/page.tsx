"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function FactionsContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const [selectedZone, setSelectedZone] = useState<LocationZone | "all">("all");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (selectedZone === "all") return factions;
    return factions.filter((f) => f.zone === selectedZone);
  }, [selectedZone]);

  const hasFilters = selectedZone !== "all";

  const scrollToFaction = useCallback((factionId: string) => {
    const el = document.getElementById(`faction-${factionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(factionId);
      setTimeout(() => setHighlightedId(null), 5000);
    }
  }, []);

  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => scrollToFaction(highlightId), 300);
      return () => clearTimeout(timer);
    }
  }, [highlightId, scrollToFaction]);

  function resetFilters() {
    setSelectedZone("all");
  }

  function getFilterStyle(isActive: boolean, color: string) {
    if (isActive) {
      return {
        backgroundColor: `${color}15`,
        color,
        border: `1px solid ${color}50`,
        borderLeftWidth: "3px",
        borderLeftColor: color,
      };
    }
    return {
      backgroundColor: "transparent",
      color: "rgba(255,255,255,0.4)",
      border: "1px solid rgba(255,255,255,0.08)",
    };
  }

  return (
    <PageContainer
      title="Фракции"
      subtitle={`${factions.length} объединений, населяющих Башню`}
    >
      {/* Filters */}
      <div className="space-y-3 mb-8">
        {/* All button — prominent, centered */}
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedZone("all")}
            className="px-6 py-2 rounded-full font-mono text-[12px] tracking-wide transition-all duration-200 border cursor-pointer"
            style={getFilterStyle(selectedZone === "all", "#94a3b8")}
          >
            Все
          </button>
        </div>

        {/* Divider + Sects button */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <button
            onClick={() => setSelectedZone(selectedZone === "sects" ? "all" : "sects")}
            className="px-5 py-1.5 rounded-full font-mono text-[11px] transition-all duration-200 cursor-pointer"
            style={
              selectedZone === "sects"
                ? {
                    backgroundColor: `${sectsColor}15`,
                    border: `1px solid ${sectsColor}50`,
                    borderLeftWidth: "3px",
                    borderLeftColor: sectsColor,
                    color: sectsColor,
                  }
                : {
                    backgroundColor: "transparent",
                    border: `1px solid ${sectsColor}20`,
                    color: "rgba(255,255,255,0.4)",
                  }
            }
          >
            ✦ Секты ✦
          </button>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Zone buttons — same pill style */}
        <div className="flex justify-center gap-3">
          {locationZones.map((z) => {
            const color = locationColors[z];
            return (
              <button
                key={z}
                onClick={() => setSelectedZone(z)}
                className="px-5 py-1.5 rounded-full font-mono text-[12px] tracking-wide transition-all duration-200 border cursor-pointer"
                style={getFilterStyle(selectedZone === z, color)}
              >
                {locationLabels[z]}
              </button>
            );
          })}
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
          <FactionCard
            key={faction.id}
            faction={faction}
            highlighted={highlightedId === faction.id}
          />
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

export default function FactionsPage() {
  return (
    <Suspense>
      <FactionsContent />
    </Suspense>
  );
}
