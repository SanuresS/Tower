"use client";

import React from "react";
import {
  City,
  citySizeLabels,
  citySpecializationLabels,
  cityZoneLabels,
  cityZoneColors,
  religionLabels,
  religionColors,
} from "@/data/cities";

interface CityCardProps {
  city: City;
  highlighted?: boolean;
}

function SpecIcon({ spec, color }: { spec: City["specialization"]; color: string }) {
  const size = 14;
  switch (spec) {
    case "capital":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <path d="M8 1L10 6L15 8L10 10L8 15L6 10L1 8L6 6L8 1Z" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
        </svg>
      );
    case "fortress":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <rect x="2" y="6" width="12" height="8" rx="1" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
          <path d="M4 6V3H6V6M7 6V3H9V6M10 6V3H12V6" stroke={color} strokeWidth="1" />
        </svg>
      );
    case "bastion":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5" stroke={color} strokeWidth="1.2" fill="none" />
          <circle cx="8" cy="8" r="2" stroke={color} strokeWidth="1" fill={`${color}20`} />
          <path d="M8 3V1M8 15v-2M3 8H1M15 8h-2" stroke={color} strokeWidth="1.2" />
        </svg>
      );
    case "trade":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
          <path d="M6 6L10 10M10 6L6 10" stroke={color} strokeWidth="1" />
        </svg>
      );
    case "resource":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 14H2L8 2Z" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
        </svg>
      );
    case "industrial":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <polygon points="8,2 14,8 8,14 2,8" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <rect x="3" y="3" width="10" height="10" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
        </svg>
      );
  }
}

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

function lerpColor3(a: string, b: string, c: string, t: number): string {
  if (t <= 0.5) return lerpColor(a, b, t * 2);
  return lerpColor(b, c, (t - 0.5) * 2);
}

function MetricBar({
  label,
  value,
  gradientFrom,
  gradientMid,
  gradientTo,
}: {
  label: string;
  value: number;
  gradientFrom: string;
  gradientMid?: string;
  gradientTo: string;
}) {
  const t = value / 100;
  const color = gradientMid
    ? lerpColor3(gradientFrom, gradientMid, gradientTo, t)
    : lerpColor(gradientFrom, gradientTo, t);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-mono text-tower-muted/60 w-28 shrink-0">{label}</span>
      <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span
        className="text-[11px] font-mono w-10 text-right shrink-0"
        style={{ color }}
      >
        {value}%
      </span>
    </div>
  );
}

export default function CityCard({ city, highlighted }: CityCardProps) {
  const zColor = cityZoneColors[city.zone];
  const rColor = religionColors[city.religion];

  return (
    <div
      id={`city-${city.id}`}
      className={`relative group rounded-lg border border-tower-border bg-tower-surface overflow-hidden transition-all duration-300 hover:shadow-xl ${highlighted ? "city-highlight" : ""}`}
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
        {/* Header: icon + name */}
        <div className="flex items-start gap-2.5 mb-2">
          <div className="shrink-0 mt-0.5">
            <SpecIcon spec={city.specialization} color={zColor} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-tower-text font-mono text-[15px] font-semibold m-0 leading-snug">
                {city.name}
              </h3>
              {city.specialization !== "none" && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] shrink-0 mt-0.5"
                  style={{
                    backgroundColor: `${zColor}18`,
                    color: zColor,
                    border: `1px solid ${zColor}30`,
                  }}
                >
                  {citySpecializationLabels[city.specialization]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Badges row: zone + size + faction */}
        <div className="flex flex-wrap gap-1.5 mb-3 mt-2">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
            style={{
              backgroundColor: `${zColor}18`,
              color: zColor,
              border: `1px solid ${zColor}30`,
            }}
          >
            <span className="text-[9px] opacity-50">Зона:</span>
            {cityZoneLabels[city.zone]}
          </span>

          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "#a3a3a3",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="text-[9px] opacity-50">Размер:</span>
            {citySizeLabels[city.size]}
          </span>

          {city.factionName && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#a3a3a3",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-[9px] opacity-50">Фракция:</span>
              {city.factionName}
            </span>
          )}
        </div>

        {/* Religion badge */}
        <div className="mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[10px]"
            style={{
              backgroundColor: `${rColor}15`,
              color: rColor,
              border: `1px solid ${rColor}30`,
            }}
          >
            <span className="text-[9px] opacity-60">✦</span>
            {religionLabels[city.religion]}
          </span>
        </div>

        {/* Metrics block */}
        <div className="mb-4 p-3 rounded-md border border-tower-border/50 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <p className="text-[9px] font-mono uppercase tracking-widest m-0 text-tower-muted/50">
              Показатели
            </p>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="space-y-2">
            <MetricBar
              label="Религиозность"
              value={city.religiosity}
              gradientFrom="#737373"
              gradientTo="#a855f7"
            />
            <MetricBar
              label="Стабильность"
              value={city.powerStability}
              gradientFrom="#dc2626"
              gradientMid="#facc15"
              gradientTo="#22c55e"
            />
            <MetricBar
              label="Контроль Преступности"
              value={city.crimeLevel}
              gradientFrom="#dc2626"
              gradientMid="#facc15"
              gradientTo="#22c55e"
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-tower-muted text-[13px] leading-[1.7] m-0">
          {city.description}
        </p>
      </div>
    </div>
  );
}
