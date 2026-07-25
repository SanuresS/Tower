"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Tabs } from "antd";
import PageContainer from "@/components/layout/PageContainer";
import {
  loreSections,
  terminology,
  eraColors,
  eraLabels,
  type TermCategory,
  termCategoryLabels,
  termCategoryColors,
} from "@/data/lore";
import { factions } from "@/data/factions";
import { creatures } from "@/data/bestiary";

const factionMap = new Map(factions.map((f) => [f.id, f.name]));
const creatureMap = new Map(creatures.map((c) => [c.id, c.name]));

const termCategories: TermCategory[] = [
  "entities",
  "systems",
  "locations",
  "people",
  "phenomena",
];

export default function LorePage() {
  const [activeTab, setActiveTab] = useState("story");
  const [termFilter, setTermFilter] = useState<TermCategory | "all">("all");
  const [termSearch, setTermSearch] = useState("");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const termQuery = termSearch.trim().toLowerCase();

  const filteredTerms = terminology.filter((t) => {
    if (termQuery && !t.term.toLowerCase().includes(termQuery) && !t.definition.toLowerCase().includes(termQuery)) return false;
    if (termFilter !== "all" && t.category !== termFilter) return false;
    return true;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <PageContainer
      title="Лор мира"
      subtitle="История Вавилонской Башни от рождения до возрождения"
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "story",
            label: "История",
            children: (
              <div className="relative">
                {loreSections.map((section, i) => {
                  const eraColor = eraColors[section.era];
                  const showEraDivider =
                    i === 0 || loreSections[i - 1].era !== section.era;
                  const nextEra =
                    i < loreSections.length - 1
                      ? loreSections[i + 1].era
                      : null;
                  const lineBottom = nextEra
                    ? eraColors[nextEra]
                    : eraColor;

                  return (
                    <React.Fragment key={section.id}>
                      {showEraDivider && (
                        <div className="era-divider">
                          <span
                            className="era-divider-label"
                            style={
                              {
                                "--era-color": eraColor,
                              } as React.CSSProperties
                            }
                          >
                            <span
                              className="inline-block w-2 h-2 rounded-full"
                              style={{ background: eraColor }}
                            />
                            {eraLabels[section.era]}
                          </span>
                        </div>
                      )}

                      <article
                        ref={(el) => {
                          sectionRefs.current[i] = el;
                        }}
                        className="lore-section relative pl-12 pb-10"
                      >
                        {/* Timeline line */}
                        {i < loreSections.length - 1 && (
                          <div
                            className="lore-timeline-line"
                            style={
                              {
                                "--line-top": eraColor,
                                "--line-bottom": lineBottom,
                              } as React.CSSProperties
                            }
                          />
                        )}

                        {/* Timeline marker */}
                        <div className="timeline-marker">
                          <div
                            className="timeline-dot"
                            style={
                              {
                                "--era-color": eraColor,
                              } as React.CSSProperties
                            }
                          />
                        </div>

                        {/* Time label */}
                        <p
                          className="font-mono text-[10px] tracking-widest uppercase mb-1 m-0"
                          style={{ color: eraColor, opacity: 0.7 }}
                        >
                          {section.timelineYear}
                        </p>

                        {/* Title */}
                        <h2 className="font-mono text-tower-text text-lg font-semibold mb-3 m-0">
                          {section.title}
                        </h2>

                        {/* Content paragraphs */}
                        <div className="text-tower-muted text-sm leading-relaxed space-y-3">
                          {section.content.split("\n\n").map((paragraph, j) => (
                            <p key={j} className="m-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Quote */}
                        {section.quote && (
                          <div
                            className="lore-quote"
                            style={
                              {
                                "--era-color": eraColor,
                              } as React.CSSProperties
                            }
                          >
                            {section.quote}
                          </div>
                        )}
                      </article>
                    </React.Fragment>
                  );
                })}
              </div>
            ),
          },
          {
            key: "terms",
            label: "Терминология",
            children: (
              <div>
                {/* Search */}
                <div className="relative mb-4">
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
                    placeholder="Поиск по терминам и определениям..."
                    value={termSearch}
                    onChange={(e) => setTermSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 rounded-lg font-mono text-[12px] text-tower-text bg-tower-surface border border-tower-border placeholder:text-tower-muted/40 focus:outline-none focus:border-tower-rust/40 focus:shadow-[0_0_12px_rgba(139,69,19,0.1)] transition-all duration-200"
                  />
                  {termSearch && (
                    <button
                      onClick={() => setTermSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-tower-muted/40 hover:text-tower-muted transition-colors cursor-pointer bg-transparent border-none p-0"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mr-1">
                    Категория
                  </span>
                  <button
                    className="term-filter-btn"
                    onClick={() => setTermFilter("all")}
                    style={{
                      background:
                        termFilter === "all"
                          ? "rgba(255,255,255,0.08)"
                          : undefined,
                      color:
                        termFilter === "all"
                          ? "rgba(255,255,255,0.8)"
                          : undefined,
                      borderColor:
                        termFilter === "all"
                          ? "rgba(255,255,255,0.15)"
                          : undefined,
                    }}
                  >
                    Все
                  </button>
                  {termCategories.map((cat) => {
                    const color = termCategoryColors[cat];
                    const isActive = termFilter === cat;
                    return (
                      <button
                        key={cat}
                        className="term-filter-btn"
                        onClick={() => setTermFilter(cat)}
                        style={{
                          background: isActive
                            ? `${color}18`
                            : undefined,
                          color: isActive ? color : undefined,
                          borderColor: isActive ? `${color}50` : undefined,
                          borderLeftWidth: isActive ? "3px" : undefined,
                          borderLeftColor: isActive ? color : undefined,
                        }}
                      >
                        {termCategoryLabels[cat]}
                      </button>
                    );
                  })}
                  <span className="text-tower-muted text-xs font-mono ml-2">
                    {filteredTerms.length}
                  </span>
                </div>

                {/* Term cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTerms.map((item) => {
                    const color = termCategoryColors[item.category];
                    return (
                      <div
                        key={item.term}
                        className="p-4 rounded-md border border-tower-border bg-tower-surface transition-all duration-300 hover:shadow-md group"
                        style={{
                          borderLeftWidth: "2px",
                          borderLeftColor: `${color}60`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-mono text-tower-rust text-sm font-semibold m-0">
                            {item.term}
                          </h3>
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider"
                            style={{
                              color,
                              background: `${color}15`,
                              border: `1px solid ${color}30`,
                            }}
                          >
                            {termCategoryLabels[item.category]}
                          </span>
                        </div>
                        <p className="text-tower-muted text-xs leading-relaxed m-0">
                          {item.definition}
                        </p>

                        {/* Cross-links */}
                        {(item.relatedFactions?.length ||
                          item.relatedCreatures?.length) && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {item.relatedFactions?.map((fId) => {
                              const name = factionMap.get(fId);
                              if (!name) return null;
                              return (
                                <Link
                                  key={fId}
                                  href={`/factions?highlight=${fId}`}
                                  className="lore-badge"
                                  style={{
                                    borderColor: "rgba(139, 69, 19, 0.3)",
                                    color: "#b8860b",
                                    background: "rgba(139, 69, 19, 0.06)",
                                  }}
                                >
                                  {name}
                                </Link>
                              );
                            })}
                            {item.relatedCreatures?.map((cId) => {
                              const name = creatureMap.get(cId);
                              if (!name) return null;
                              return (
                                <Link
                                  key={cId}
                                  href={`/bestiary?highlight=${cId}`}
                                  className="lore-badge"
                                  style={{
                                    borderColor: "rgba(220, 38, 38, 0.25)",
                                    color: "#dc2626",
                                    background: "rgba(220, 38, 38, 0.05)",
                                  }}
                                >
                                  {name}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ),
          },
        ]}
      />
    </PageContainer>
  );
}
