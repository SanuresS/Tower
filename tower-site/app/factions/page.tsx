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
import { getFilterStyle } from "@/lib/filters";

const locationZones: LocationZone[] = ["lower", "middle", "special"];
const sectsColor = locationColors.sects;

function FactionsContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const [selectedZone, setSelectedZone] = useState<LocationZone | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const query = searchQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    return factions.filter((f) => {
      if (query && !f.name.toLowerCase().includes(query)) return false;
      if (selectedZone !== "all" && f.zone !== selectedZone) return false;
      return true;
    });
  }, [query, selectedZone]);

  const hasFilters = query !== "" || selectedZone !== "all";

  const scrollToFaction = useCallback((factionId: string) => {
    const el = document.getElementById(`faction-${factionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(factionId);
      setTimeout(() => setHighlightedId(null), 6000);
    }
  }, []);

  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => scrollToFaction(highlightId), 300);
      return () => clearTimeout(timer);
    }
  }, [highlightId, scrollToFaction]);

  function resetFilters() {
    setSearchQuery("");
    setSelectedZone("all");
  }

  return (
    <PageContainer
      title="Фракции"
      subtitle={`${factions.length} объединений, населяющих Башню`}
    >
      {/* Filters */}
      <div className="space-y-3 mb-8">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="7" cy="7" r="5" stroke="#737373" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-lg font-mono text-[12px] text-tower-text bg-tower-surface border border-tower-border placeholder:text-tower-muted/40 focus:outline-none focus:border-tower-rust/40 focus:shadow-[0_0_12px_rgba(139,69,19,0.1)] transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-tower-muted/40 hover:text-tower-muted transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

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
