"use client";

import React, { useState, useEffect, useRef } from "react";
import PageContainer from "@/components/layout/PageContainer";
import FloorIndicator from "@/components/ui/FloorIndicator";
import TowerSlice from "@/components/ui/TowerSlice";
import { towerZones, babylonParts, towerSections, sectionGroups, TOTAL_FLOORS } from "@/data/tower";

const placeholderStyles: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  upper: {
    text: "rgba(148, 163, 184, 0.6)",
    border: "rgba(148, 163, 184, 0.15)",
    bg: "rgba(20, 20, 20, 0.6)",
    glow: "rgba(148, 163, 184, 0.25)",
  },
  deep: {
    text: "rgba(160, 160, 160, 0.5)",
    border: "rgba(80, 80, 80, 0.25)",
    bg: "rgba(40, 40, 40, 0.5)",
    glow: "rgba(100, 116, 139, 0.15)",
  },
};

const placeholderText: Record<string, string> = {
  upper: "Застывшие во времени пустые пространства. Здесь бродят Святые ангелы и сохраняются древние технологии.",
  deep: "Смесь чёрных зон, которые не прерываются. Этажи, где обитают самые разные хтонические твари. Чем ниже этаж, тем больше их становится.",
};

export default function TowerPage() {
  const [sectionSearch, setSectionSearch] = useState("");
  const towerRef = useRef<HTMLElement | null>(null);
  const groupRefs = useRef<(HTMLElement | null)[]>([]);

  const sectionQuery = sectionSearch.trim().toLowerCase();

  const filteredSections = sectionQuery
    ? towerSections.filter((s) => s.name.toLowerCase().includes(sectionQuery))
    : towerSections;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    groupRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    if (towerRef.current) observer.observe(towerRef.current);

    return () => observer.disconnect();
  }, []);

  const sortedGroups = [...sectionGroups].sort((a, b) => b.order - a.order);

  return (
    <PageContainer
      title="Архитектура Башни"
      subtitle={`${(TOTAL_FLOORS / 100).toFixed(0)} км мегаструктура — от основания до недостроенных этажей`}
    >
      {/* Tower visualization */}
      <section ref={towerRef} className="mb-12 tower-section">
        <div className="tower-container flex flex-col lg:flex-row items-start gap-6 lg:gap-8 p-4 sm:p-6 rounded-lg">
          <div className="shrink-0 mx-auto lg:mx-0">
            <div className="relative" style={{ animation: "ambientGlow 6s ease-in-out infinite" }}>
              <TowerSlice height={500} svgWidth={240} showBabylons showLabels />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-tower-rust/60 shrink-0" />
              <h2 className="font-mono text-tower-text text-lg font-semibold m-0">
                Структура Башни
              </h2>
            </div>

            {/* Babylon legend */}
            <div className="space-y-2 sm:space-y-3 mb-6">
              {babylonParts.map((part, i) => (
                <div
                  key={part.id}
                  className="tower-fade-in tower-card flex items-center gap-3 p-3 rounded-md border border-tower-border/50 bg-white/[0.02]"
                  style={{
                    borderLeftWidth: "2px",
                    borderLeftColor: `${part.color}60`,
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${part.color}15` }}
                  >
                    <svg width={18} height={18} viewBox="0 0 24 24">
                      <path
                        d={
                          part.shape === "cylinder"
                            ? `M 6 20 L 6 4 L 18 4 L 18 20 Z`
                            : `M 3 20 L 7 4 L 17 4 L 21 20 Z`
                        }
                        fill="none"
                        stroke={part.color}
                        strokeWidth={1.5}
                        strokeDasharray={part.dashed ? "3 2" : "none"}
                        strokeOpacity={0.8}
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-tower-text text-xs font-semibold m-0">
                      {part.name}
                    </p>
                    <p className="text-tower-muted text-[10px] m-0">
                      Этажи {part.floorStart.toLocaleString()}–{part.floorEnd.toLocaleString()} ·{" "}
                      {part.shape === "cylinder" ? "Цилиндр" : "Усечённый конус"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-tower-rust/40 to-transparent" />
              <span className="text-tower-rust/30 text-[8px]">◆</span>
              <div className="h-px w-8 bg-tower-border" />
            </div>

            {/* Floor zones */}
            <h3 className="font-mono text-tower-text text-sm font-semibold mb-3 m-0">
              Зоны этажей
            </h3>
            <div className="space-y-2">
              {towerZones.map((zone, i) => {
                const floors = zone.floorEnd - zone.floorStart;
                const km = floors / 100;
                return (
                  <div
                    key={zone.id}
                    className="tower-fade-in tower-card flex items-center gap-3 p-2.5 rounded-md border border-tower-border/50 bg-white/[0.02]"
                    style={{
                      borderLeftWidth: "2px",
                      borderLeftColor: `${zone.color}60`,
                      animationDelay: `${400 + i * 80}ms`,
                    }}
                  >
                    <div
                      className="zone-bar w-2 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: zone.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-mono text-tower-text text-xs font-semibold m-0">
                          {zone.name}
                        </p>
                        <FloorIndicator
                          floors={`${zone.floorStart.toLocaleString()}–${zone.floorEnd.toLocaleString()}`}
                          color={zone.color}
                        />
                      </div>
                      <p className="text-tower-muted text-[10px] m-0">
                        {km} км · {floors.toLocaleString()} этажей
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Key sections */}
      <section>
        <h2 className="font-mono text-tower-text text-lg font-semibold mb-6 m-0">
          Ключевые секции
        </h2>

        {/* Search */}
        <div className="relative mb-6">
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
            placeholder="Поиск по названию секции..."
            value={sectionSearch}
            onChange={(e) => setSectionSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-lg font-mono text-[12px] text-tower-text bg-tower-surface border border-tower-border placeholder:text-tower-muted/40 focus:outline-none focus:border-tower-rust/40 focus:shadow-[0_0_12px_rgba(139,69,19,0.1)] transition-all duration-200"
          />
          {sectionSearch && (
            <button
              onClick={() => setSectionSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-tower-muted/40 hover:text-tower-muted transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {sortedGroups.map((group, groupIdx) => {
          const sectionsInGroup = filteredSections.filter((s) => s.zone === group.id);

          if (sectionsInGroup.length === 0 && (sectionQuery || (group.id !== "upper" && group.id !== "deep"))) return null;

          const ph = placeholderStyles[group.id];
          const isPlaceholder = sectionsInGroup.length > 0 ? false : !!placeholderText[group.id];

          return (
            <div
              key={group.id}
              ref={(el) => { groupRefs.current[groupIdx] = el; }}
              className="tower-section mb-8 last:mb-0"
            >
              {/* Zone group header */}
              <div
                className="group-header-glow flex items-center gap-3 mb-4 p-2 rounded-lg"
                style={{ "--glow-color": ph?.glow || `${group.color}40` } as React.CSSProperties}
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: group.color }}
                />
                <h3
                  className="font-mono text-sm font-semibold m-0"
                  style={{ color: group.id === "deep" ? "#64748b" : group.color }}
                >
                  {group.name}
                </h3>
                <div className="h-px flex-1" style={{ backgroundColor: `${group.color}30` }} />
                <span
                  className="font-mono text-[10px] tracking-wider"
                  style={{ color: `${group.color}99` }}
                >
                  {group.floorRange}
                </span>
              </div>

              {/* Sections in group */}
              {sectionsInGroup.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pl-4 sm:pl-6">
                  {sectionsInGroup.map((section, sIdx) => (
                    <div
                      key={section.id}
                      className="tower-card p-4 rounded-md border border-tower-border bg-tower-surface"
                      style={{
                        borderLeftWidth: "2px",
                        borderLeftColor: `${group.color}60`,
                        transitionDelay: `${sIdx * 50}ms`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h4 className="font-mono text-tower-text text-sm font-semibold m-0">
                          {section.name}
                        </h4>
                        <FloorIndicator floors={section.floors} color={group.color} />
                      </div>
                      <p className="text-tower-muted text-xs leading-relaxed m-0">
                        {section.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : isPlaceholder ? (
                <div className="pl-4 sm:pl-6">
                  <div
                    className="tower-placeholder p-4"
                    style={{
                      borderColor: ph?.border || `${group.color}20`,
                      backgroundColor: ph?.bg || "rgba(255,255,255,0.01)",
                    }}
                  >
                    <p
                      className="text-xs italic m-0"
                      style={{ color: ph?.text || `${group.color}60` }}
                    >
                      {placeholderText[group.id] || ""}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </section>
    </PageContainer>
  );
}
