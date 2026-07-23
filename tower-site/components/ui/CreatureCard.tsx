"use client";

import React from "react";
import {
  Creature,
  categoryLabels,
  categoryColors,
  dangerLabels,
  dangerColors,
  habitatLabels,
  habitatColors,
} from "@/data/bestiary";

interface CreatureCardProps {
  creature: Creature;
}

const encounterBarColors = [
  "rgba(255,255,255,0.06)",
  "#22c55e",
  "#84cc16",
  "#eab308",
  "#f97316",
  "#dc2626",
];

function lerpColor(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}

function EncounterBar({ label, icon, value }: { label: string; icon: React.ReactNode; value: number }) {
  const t = value / 5;
  const color = lerpColor("#22c55e", "#dc2626", t);
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <span className="text-[9px] text-tower-muted/50 flex items-center gap-1 w-[90px] shrink-0">
        {icon}
        <span className="text-[9px] text-tower-muted/40 whitespace-nowrap">{label}</span>
      </span>
      <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(value / 5) * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span className="text-[9px] font-mono shrink-0 w-3 text-right" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

export default function CreatureCard({ creature }: CreatureCardProps) {
  const catColor = categoryColors[creature.category];
  const dColor = dangerColors[creature.dangerLevel];
  const hColor = habitatColors[creature.habitat];

  return (
    <div
      className="relative rounded-lg border border-tower-border bg-tower-surface overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      style={{
        borderLeftWidth: "2px",
        borderLeftColor: `${catColor}60`,
      }}
    >
      {/* Top accent stripe */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${catColor}cc 0%, ${catColor}40 60%, transparent 100%)`,
        }}
      />

      <div className="p-4">
        {/* Header: name + danger dots */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-tower-text font-mono text-sm font-semibold m-0 leading-tight">
            {creature.name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0" title={`Опасность: ${dangerLabels[creature.dangerLevel]}`}>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className="w-1.5 h-1.5 rounded-sm transition-colors"
                style={{
                  backgroundColor: lvl <= creature.dangerLevel ? dColor : "rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Badges row: category + habitat + danger */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* Category */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono"
            style={{
              backgroundColor: `${catColor}10`,
              color: catColor,
              border: `1px solid ${catColor}25`,
              borderLeftWidth: "3px",
              borderLeftColor: catColor,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M8 1L15 8L8 15L1 8L8 1Z" stroke={catColor} strokeWidth="1.5" fill={`${catColor}20`} />
            </svg>
            <span className="ml-1">{categoryLabels[creature.category]}</span>
          </span>

          {/* Habitat zone */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono"
            style={{
              backgroundColor: `${hColor}10`,
              color: creature.habitat === "black" ? "#a3a3a3" : hColor,
              border: `1px solid ${hColor}25`,
              borderLeftWidth: "3px",
              borderLeftColor: hColor,
            }}
          >
            {habitatLabels[creature.habitat]}
          </span>

          {/* Danger label */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono"
            style={{
              backgroundColor: `${dColor}10`,
              color: dColor,
              border: `1px solid ${dColor}25`,
              borderLeftWidth: "3px",
              borderLeftColor: dColor,
            }}
          >
            {dangerLabels[creature.dangerLevel]}
          </span>
        </div>

        {/* Description */}
        <p className="text-tower-muted text-xs leading-relaxed mb-3 m-0">
          {creature.description}
        </p>

        {/* Encounter probability */}
        <div className="flex flex-col gap-1.5 mb-3 p-2.5 rounded-md border border-tower-border/50 bg-white/[0.02]">
          <p className="text-[9px] font-mono text-tower-muted/40 uppercase tracking-widest m-0 mb-0.5">
            Вероятность встречи
          </p>
          <EncounterBar
            label="Верхние этажи"
            value={creature.encounter.upper}
            icon={
              <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3 L13 10 L3 10 Z" />
              </svg>
            }
          />
          <EncounterBar
            label="Средние этажи"
            value={creature.encounter.middle}
            icon={
              <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="6" width="10" height="4" />
              </svg>
            }
          />
          <EncounterBar
            label="Нижние этажи"
            value={creature.encounter.lower}
            icon={
              <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6 L13 6 L8 13 Z" />
              </svg>
            }
          />
        </div>

        {/* Tags */}
        {creature.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {creature.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[9px] font-mono text-tower-muted/60 border border-tower-border/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
