"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import CityCard from "@/components/ui/CityCard";
import FilterBar from "@/components/ui/FilterBar";
import {
  cities,
  cityZoneLabels,
  cityZoneColors,
  citySizeLabels,
  citySpecializationLabels,
  cityFactionGroupLabels,
  CityZone,
  CitySize,
  CitySpecialization,
  CityFactionGroup,
} from "@/data/cities";
import { Religion, religionLabels, religionColors } from "@/data/types";

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
      setTimeout(() => setHighlightedId(null), 6000);
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
        <FilterBar
          label="Зона"
          items={cityZones}
          labels={cityZoneLabels}
          selected={selectedZone}
          onSelect={(v) => setSelectedZone(v as CityZone | "all")}
          colorFn={(v) => cityZoneColors[v as CityZone] ?? "#94a3b8"}
        />

        <FilterBar
          label="Размер"
          items={citySizes}
          labels={citySizeLabels}
          selected={selectedSize}
          onSelect={(v) => setSelectedSize(v as CitySize | "all")}
        />

        <FilterBar
          label="Специализация"
          items={citySpecs}
          labels={citySpecializationLabels}
          selected={selectedSpec}
          onSelect={(v) => setSelectedSpec(v as CitySpecialization | "all")}
        />

        <FilterBar
          label="Фракция"
          items={cityFactionGroups}
          labels={cityFactionGroupLabels}
          selected={selectedFaction}
          onSelect={(v) => setSelectedFaction(v as CityFactionGroup | "all")}
        />

        <FilterBar
          label="Религия"
          items={cityReligions}
          labels={religionLabels}
          selected={selectedReligion}
          onSelect={(v) => setSelectedReligion(v as Religion | "all")}
          colorFn={(v) => religionColors[v as Religion] ?? "#94a3b8"}
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
