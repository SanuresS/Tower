"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import CityCard from "@/components/ui/CityCard";
import {
  cities,
  cityZoneLabels,
  cityZoneColors,
  citySizeLabels,
  citySpecializationLabels,
  cityFactionGroupLabels,
  religionLabels,
  religionColors,
  CityZone,
  CitySize,
  CitySpecialization,
  CityFactionGroup,
  Religion,
} from "@/data/cities";

const cityZones: CityZone[] = ["lower", "middle", "special"];
const citySizes: CitySize[] = ["hive", "large", "city", "small", "outpost"];
const citySpecs: CitySpecialization[] = [
  "capital",
  "fortress",
  "bastion",
  "trade",
  "resource",
  "industrial",
  "none",
];
const cityFactionGroups: CityFactionGroup[] = [
  "clans",
  "coalition",
  "witnesses",
  "military",
  "other",
];
const cityReligions: Religion[] = [
  "ezibtu",
  "rishtu",
  "atheism",
  "free",
  "echo_worship",
  "silence_cult",
  "forest_collective",
  "lamashtu_cult",
];

function FilterGroup({
  label,
  items,
  labels,
  selected,
  onSelect,
  colorFn,
}: {
  label: string;
  items: readonly string[];
  labels: Record<string, string>;
  selected: string;
  onSelect: (v: string) => void;
  colorFn?: (v: string) => string;
}) {
  return (
    <div>
      <p className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mb-2 m-0">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onSelect("all")}
          className="px-2.5 py-1 rounded font-mono text-[11px] transition-all duration-200 border cursor-pointer"
          style={
            selected === "all"
              ? { backgroundColor: "rgba(148,163,184,0.15)", color: "#cbd5e1", borderColor: "rgba(148,163,184,0.4)" }
              : { backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }
          }
        >
          Все
        </button>
        {items.map((v) => {
          const isActive = selected === v;
          const color = colorFn ? colorFn(v) : "#cbd5e1";
          return (
            <button
              key={v}
              onClick={() => onSelect(v)}
              className="px-2.5 py-1 rounded font-mono text-[11px] transition-all duration-200 border cursor-pointer"
              style={
                isActive
                  ? { backgroundColor: `${color}20`, color, borderColor: `${color}50` }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.08)" }
              }
            >
              {labels[v]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CitiesContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const [selectedZone, setSelectedZone] = useState<CityZone | "all">("all");
  const [selectedSize, setSelectedSize] = useState<CitySize | "all">("all");
  const [selectedSpec, setSelectedSpec] = useState<CitySpecialization | "all">("all");
  const [selectedFaction, setSelectedFaction] = useState<CityFactionGroup | "all">("all");
  const [selectedReligion, setSelectedReligion] = useState<Religion | "all">("all");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return cities.filter((c) => {
      if (selectedZone !== "all" && c.zone !== selectedZone) return false;
      if (selectedSize !== "all" && c.size !== selectedSize) return false;
      if (selectedSpec !== "all" && !c.specialization.includes(selectedSpec)) return false;
      if (selectedFaction !== "all" && c.factionGroup !== selectedFaction) return false;
      if (selectedReligion !== "all" && c.religion !== selectedReligion) return false;
      return true;
    });
  }, [selectedZone, selectedSize, selectedSpec, selectedFaction, selectedReligion]);

  const hasFilters =
    selectedZone !== "all" ||
    selectedSize !== "all" ||
    selectedSpec !== "all" ||
    selectedFaction !== "all" ||
    selectedReligion !== "all";

  const scrollToCity = useCallback((cityId: string) => {
    const el = document.getElementById(`city-${cityId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(cityId);
      setTimeout(() => setHighlightedId(null), 5000);
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
    setSelectedSize("all");
    setSelectedSpec("all");
    setSelectedFaction("all");
    setSelectedReligion("all");
  }

  return (
    <PageContainer
      title="Города"
      subtitle={`${cities.length} населённых пунктов Башни`}
    >
      {/* Filters */}
      <div className="space-y-4 mb-8">
        <FilterGroup
          label="Зона"
          items={cityZones}
          labels={cityZoneLabels}
          selected={selectedZone}
          onSelect={(v) => setSelectedZone(v as CityZone | "all")}
          colorFn={(v) => cityZoneColors[v as CityZone] ?? "#cbd5e1"}
        />

        <FilterGroup
          label="Размер"
          items={citySizes}
          labels={citySizeLabels}
          selected={selectedSize}
          onSelect={(v) => setSelectedSize(v as CitySize | "all")}
        />

        <FilterGroup
          label="Специализация"
          items={citySpecs}
          labels={citySpecializationLabels}
          selected={selectedSpec}
          onSelect={(v) => setSelectedSpec(v as CitySpecialization | "all")}
        />

        <FilterGroup
          label="Фракция"
          items={cityFactionGroups}
          labels={cityFactionGroupLabels}
          selected={selectedFaction}
          onSelect={(v) => setSelectedFaction(v as CityFactionGroup | "all")}
        />

        <FilterGroup
          label="Религия"
          items={cityReligions}
          labels={religionLabels}
          selected={selectedReligion}
          onSelect={(v) => setSelectedReligion(v as Religion | "all")}
          colorFn={(v) => religionColors[v as Religion] ?? "#cbd5e1"}
        />

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

export default function CitiesPage() {
  return (
    <Suspense>
      <CitiesContent />
    </Suspense>
  );
}
