"use client";

import React from "react";
import {
  Faction,
  factionTypeLabels,
  locationLabels,
  locationColors,
  religionLabels,
  religionColors,
  LocationZone,
} from "@/data/factions";

interface FactionCardProps {
  faction: Faction;
}

function ZoneIcon({ zone, color }: { zone: LocationZone; color: string }) {
  const size = 14;
  switch (zone) {
    case "lower":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 14H2L8 2Z" stroke={color} strokeWidth="1.5" fill={`${color}20`} />
        </svg>
      );
    case "middle":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="12" rx="2" stroke={color} strokeWidth="1.5" fill={`${color}20`} />
        </svg>
      );
    case "special":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <path d="M8 1L10 6L15 8L10 10L8 15L6 10L1 8L6 6L8 1Z" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
        </svg>
      );
    case "sects":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" fill={`${color}20`} />
          <circle cx="8" cy="8" r="2" fill={color} opacity="0.6" />
        </svg>
      );
  }
}

function getTagline(description: string): string {
  const sentences = description.split(/[.!?]\s/);
  if (sentences.length > 0 && sentences[0].length > 5) {
    return sentences[0].includes("«") || sentences[0].length < 80
      ? sentences[0]
      : sentences[0].slice(0, 70) + "...";
  }
  return "";
}

export default function FactionCard({ faction }: FactionCardProps) {
  const zColor = locationColors[faction.zone];
  const rColor = religionColors[faction.religion];
  const tagline = getTagline(faction.description);

  return (
    <div
      className="relative group rounded-lg border border-tower-border bg-tower-surface overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        borderLeftWidth: "2px",
        borderLeftColor: "transparent",
        ["--zone-glow" as string]: zColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeftColor = `${zColor}80`;
        e.currentTarget.style.boxShadow = `0 8px 32px -8px ${zColor}15, 0 0 0 1px ${zColor}10`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeftColor = "transparent";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Top accent stripe */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${zColor}cc 0%, ${zColor}40 60%, transparent 100%)`,
        }}
      />

      <div className="p-5 pt-4">
        {/* Header: icon + name + type badge */}
        <div className="flex items-start gap-2.5 mb-2">
          <div className="shrink-0 mt-0.5">
            <ZoneIcon zone={faction.zone} color={zColor} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-tower-text font-mono text-[15px] font-semibold m-0 leading-snug">
                {faction.name}
              </h3>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] shrink-0 mt-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#a3a3a3",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#737373" }} />
                {factionTypeLabels[faction.type]}
              </span>
            </div>
            {tagline && (
              <p className="text-tower-muted/50 text-[11px] italic mt-0.5 m-0 leading-snug">
                {tagline}
              </p>
            )}
          </div>
        </div>

        {/* Badges row: zone + religion + population */}
        <div className="flex flex-wrap gap-1.5 mb-4 mt-3">
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
          <div className="mb-4 p-3 rounded-md border border-tower-border/50" style={{ backgroundColor: `${zColor}06` }}>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-px flex-1" style={{ backgroundColor: `${zColor}20` }} />
              <p className="text-[9px] font-mono uppercase tracking-widest m-0" style={{ color: `${zColor}80` }}>
                Города и поселения
              </p>
              <div className="h-px flex-1" style={{ backgroundColor: `${zColor}20` }} />
            </div>

            {/* Capital */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: "#b8860b" }}
              />
              <span className="text-[12px] font-mono font-semibold text-tower-text/90">
                {faction.cities[0]}
              </span>
              <span className="text-[8px] font-mono text-tower-amber/50 uppercase tracking-wider">
                столица
              </span>
            </div>

            {/* Other cities */}
            {faction.cities.length > 1 && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 pl-0.5">
                {faction.cities.slice(1).map((city, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: zColor, opacity: 0.5 }}
                    />
                    <span className="text-[12px] font-mono text-tower-text/80">
                      {city}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Protected communities block */}
        {faction.protectedCommunities && faction.protectedCommunities.length > 0 && (
          <div className="mb-4 p-3 rounded-md border border-dashed border-tower-border/40 bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <p className="text-[9px] font-mono uppercase tracking-widest m-0 text-tower-muted/50">
                Под крышей клана
              </p>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 pl-0.5">
              {faction.protectedCommunities.map((community, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-tower-muted/40 text-[10px] shrink-0">◇</span>
                  <span className="text-[12px] font-mono text-tower-text/60">
                    {community.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-tower-muted text-[13px] leading-[1.7] m-0">
          {faction.description}
        </p>
      </div>
    </div>
  );
}
