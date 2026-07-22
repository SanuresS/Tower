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

function EncounterBar({ label, icon, value }: { label: string; icon: React.ReactNode; value: number }) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <span className="text-[9px] text-tower-muted/50 shrink-0">{icon}</span>
      <div className="flex items-center gap-0.5 min-w-0">
        {[1, 2, 3, 4, 5].map((lvl) => (
          <div
            key={lvl}
            className="h-1 rounded-full"
            style={{
              width: 6,
              backgroundColor: lvl <= value ? encounterBarColors[value] : "rgba(255,255,255,0.05)",
            }}
          />
        ))}
      </div>
      <span className="text-[9px] font-mono text-tower-muted/60 shrink-0 w-3 text-right">{value}</span>
    </div>
  );
}

export default function CreatureCard({ creature }: CreatureCardProps) {
  const catColor = categoryColors[creature.category];
  const dColor = dangerColors[creature.dangerLevel];
  const hColor = habitatColors[creature.habitat];

  return (
    <div
      className="relative group rounded-lg border border-tower-border bg-tower-surface overflow-hidden transition-all duration-300 hover:border-tower-rust/40 hover:shadow-lg hover:shadow-tower-rust/5"
    >
      {/* Top accent stripe */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: catColor, opacity: 0.7 }}
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
                className="w-1.5 h-1.5 rounded-full transition-colors"
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
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
            style={{
              backgroundColor: `${catColor}18`,
              color: catColor,
              border: `1px solid ${catColor}30`,
            }}
          >
            <span className="text-[9px] opacity-50">Класс:</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColor }} />
            {categoryLabels[creature.category]}
          </span>

          {/* Habitat zone */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
            style={{
              backgroundColor: `${hColor}18`,
              color: creature.habitat === "black" ? "#a3a3a3" : hColor,
              border: `1px solid ${hColor}30`,
            }}
          >
            <span className="text-[9px] opacity-50">Зона:</span>
            {habitatLabels[creature.habitat]}
          </span>

          {/* Danger label */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
            style={{
              backgroundColor: `${dColor}18`,
              color: dColor,
              border: `1px solid ${dColor}30`,
            }}
          >
            <span className="text-[9px] opacity-50">Опасность:</span>
            {dangerLabels[creature.dangerLevel]}
          </span>
        </div>

        {/* Description */}
        <p className="text-tower-muted text-xs leading-relaxed mb-3 m-0">
          {creature.description}
        </p>

        {/* Encounter probability */}
        <div className="flex flex-col gap-1 mb-3 p-2 rounded bg-tower-bg/50 border border-tower-border/50">
          <p className="text-[9px] font-mono text-tower-muted/40 uppercase tracking-widest m-0 mb-0.5">
            Вероятность встречи
          </p>
          <EncounterBar
            label="Верх"
            value={creature.encounter.upper}
            icon={
              <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3 L13 10 L3 10 Z" />
              </svg>
            }
          />
          <EncounterBar
            label="Середина"
            value={creature.encounter.middle}
            icon={
              <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="6" width="10" height="4" />
              </svg>
            }
          />
          <EncounterBar
            label="Низ"
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
                className="px-1.5 py-0.5 rounded text-[9px] font-mono text-tower-muted/70 bg-tower-bg/50 border border-tower-border/50"
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
