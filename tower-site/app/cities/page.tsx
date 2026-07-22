"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import CityCard from "@/components/ui/CityCard";
import {
  cities,
  cityZoneLabels,
  cityZoneColors,
  cityTypeLabels,
  CityZone,
  CityType,
} from "@/data/cities";

const cityZones: CityZone[] = ["lower", "middle", "special"];

const cityTypes: CityType[] = [
  "capital",
  "city",
  "small_city",
  "fortress",
  "bastion",
  "trade",
  "industrial",
  "resource",
  "settlement",
];

export default function CitiesPage() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const [selectedZone, setSelectedZone] = useState<CityZone | "all">("all");
  const [selectedType, setSelectedType] = useState<CityType | "all">("all");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return cities.filter((c) => {
      if (selectedZone !== "all" && c.zone !== selectedZone) return false;
      if (selectedType !== "all" && c.type !== selectedType) return false;
      return true;
    });
  }, [selectedZone, selectedType]);

  const hasFilters = selectedZone !== "all" || selectedType !== "all";

  const scrollToCity = useCallback((cityId: string) => {
    const el = document.getElementById(`city-${cityId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(cityId);
      setTimeout(() => setHighlightedId(null), 3000);
    }
  }, []);

  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => scrollToCity(highlightId), 300);
      return () => clearTimeout(timer);
    }
  }, [highlightId, scrollToCity]);

  function resetFilters() {
    setSelectedZone("all");
    setSelectedType("all");
  }

  function countByType(t: CityType) {
    return cities.filter((c) => c.type === t).length;
  }

  const usedTypes = useMemo(() => {
    return cityTypes.filter((t) => cities.some((c) => c.type === t));
  }, []);

  return (
    <PageContainer
      title="Города"
      subtitle={`${cities.length} населённых пунктов Башни`}
    >
      {/* Filters */}
      <div className="space-y-4 mb-8">
        {/* Zone */}
        <div>
          <p className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mb-2 m-0">
            Зона
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedZone("all")}
              className="px-2.5 py-1 rounded font-mono text-[11px] transition-all duration-200 border cursor-pointer"
              style={
                selectedZone === "all"
                  ? { backgroundColor: "rgba(148,163,184,0.15)", color: "#cbd5e1", borderColor: "rgba(148,163,184,0.4)" }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }
              }
            >
              Все
            </button>
            {cityZones.map((z) => {
              const isActive = selectedZone === z;
              const color = cityZoneColors[z];
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
                  {cityZoneLabels[z]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Type */}
        <div>
          <p className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mb-2 m-0">
            Тип
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedType("all")}
              className="px-2.5 py-1 rounded font-mono text-[11px] transition-all duration-200 border cursor-pointer"
              style={
                selectedType === "all"
                  ? { backgroundColor: "rgba(148,163,184,0.15)", color: "#cbd5e1", borderColor: "rgba(148,163,184,0.4)" }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }
              }
            >
              Все
            </button>
            {usedTypes.map((t) => {
              const isActive = selectedType === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className="px-2.5 py-1 rounded font-mono text-[11px] transition-all duration-200 border cursor-pointer"
                  style={
                    isActive
                      ? { backgroundColor: "rgba(148,163,184,0.15)", color: "#cbd5e1", borderColor: "rgba(148,163,184,0.4)" }
                      : { backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }
                  }
                >
                  {cityTypeLabels[t]} ({countByType(t)})
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
          Найдено: {filtered.length} из {cities.length}
        </p>
      )}

      {/* Cities grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            highlighted={highlightedId === city.id}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-tower-muted text-sm font-mono m-0">
            Нет городов, соответствующих фильтрам.
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
