"use client";

import React from "react";
import {
  Faction,
  factionTypeLabels,
  locationLabels,
  locationColors,
  religionLabels,
  religionColors,
} from "@/data/factions";

interface FactionCardProps {
  faction: Faction;
}

export default function FactionCard({ faction }: FactionCardProps) {
  const zColor = locationColors[faction.zone];
  const rColor = religionColors[faction.religion];

  return (
    <div
      className="relative group rounded-lg border border-tower-border bg-tower-surface overflow-hidden transition-all duration-300 hover:border-tower-rust/40 hover:shadow-lg hover:shadow-tower-rust/5"
    >
      {/* Top accent stripe */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: zColor, opacity: 0.7 }}
      />

      <div className="p-5">
        {/* Header: name + type badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-tower-text font-mono text-base font-semibold m-0 leading-tight">
            {faction.name}
          </h3>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] shrink-0"
            style={{
              backgroundColor: `${faction.color}18`,
              color: faction.color,
              border: `1px solid ${faction.color}30`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: faction.color }} />
            {factionTypeLabels[faction.type]}
          </span>
        </div>

        {/* Badges row: zone + religion + population */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {/* Zone */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
            style={{
              backgroundColor: `${zColor}18`,
              color: zColor,
              border: `1px solid ${zColor}30`,
            }}
          >
            <span className="text-[9px] opacity-50">Зона:</span>
            {locationLabels[faction.zone]}
          </span>

          {/* Religion */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
            style={{
              backgroundColor: `${rColor}18`,
              color: rColor,
              border: `1px solid ${rColor}30`,
            }}
          >
            <span className="text-[9px] opacity-50">Религия:</span>
            {religionLabels[faction.religion]}
          </span>

          {/* Population */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "#a3a3a3",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="text-[9px] opacity-50">Население:</span>
            {faction.population}
          </span>
        </div>

        {/* Cities block */}
        {faction.cities.length > 0 && (
          <div className="mb-4 p-3 rounded bg-tower-bg/50 border border-tower-border/50">
            <p className="text-[9px] font-mono text-tower-muted/40 uppercase tracking-widest m-0 mb-1.5">
              Города и поселения
            </p>
            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
              {faction.cities.map((city, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: zColor, opacity: 0.6 }}
                  />
                  <span className="text-xs font-mono text-tower-text/80">
                    {city}
                  </span>
                  {i < faction.cities.length - 1 && (
                    <span className="text-tower-muted/20 ml-1 hidden last:inline">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-tower-muted text-sm leading-relaxed m-0">
          {faction.description}
        </p>
      </div>
    </div>
  );
}
