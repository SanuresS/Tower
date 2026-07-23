"use client";

import React from "react";
import Link from "next/link";
import {
  City,
  Religion,
  CitySpecialization,
  citySizeLabels,
  citySpecializationLabels,
  cityZoneLabels,
  cityZoneColors,
  religionLabels,
  religionColors,
} from "@/data/cities";
import { factions } from "@/data/factions";

interface CityCardProps {
  city: City;
  highlighted?: boolean;
}

function stripAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function findFactionIdByName(name: string): string | null {
  const normalized = stripAccents(name.toLowerCase().replace(/[«»]/g, "").trim());
  const found = factions.find((f) => {
    const fn = stripAccents(f.name.toLowerCase().replace(/[«»]/g, "").trim());
    return fn === normalized || fn.includes(normalized) || normalized.includes(fn);
  });
  return found?.id ?? null;
}

const sizeDots: Record<string, number> = {
  outpost: 1,
  small: 2,
  city: 3,
  large: 4,
  hive: 5,
};

const sizeLabels: Record<string, string> = {
  outpost: "Пост",
  small: "Малый",
  city: "Город",
  large: "Большой",
  hive: "Улей",
};

function SpecIcon({ spec, color }: { spec: CitySpecialization; color: string }) {
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

function ReligionPie({ religions }: { religions: { religion: Religion; percent: number }[] }) {
  const size = 52;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        {religions.map((r, i) => {
          const dash = (r.percent / 100) * circumference;
          const offset = -(accumulated / 100) * circumference;
          accumulated += r.percent;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={religionColors[r.religion] ?? "#555"}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
      <div className="flex flex-col gap-0.5">
        {religions.map((r, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 text-[10px] font-mono text-tower-muted/70"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: religionColors[r.religion] ?? "#555" }}
            />
            <span className="text-tower-muted/40">{r.percent}%</span>
            <span>{religionLabels[r.religion]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CityCard({ city, highlighted }: CityCardProps) {
  const zColor = cityZoneColors[city.zone];
  const primarySpec = city.specialization[0] ?? "none";
  const activeSpecs = city.specialization.filter((s) => s !== "none");
  const factionId = city.factionName ? findFactionIdByName(city.factionName) : null;
  const dots = sizeDots[city.size] ?? 3;
  const sizeLabel = sizeLabels[city.size] ?? city.size;

  return (
    <div
      id={`city-${city.id}`}
      className={`relative rounded-lg border border-tower-border bg-tower-surface overflow-hidden transition-shadow duration-300 hover:shadow-lg ${highlighted ? "city-highlight" : ""}`}
      style={{
        borderLeftWidth: "2px",
        borderLeftColor: `${zColor}60`,
        ["--zone-glow" as string]: zColor,
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
        {/* Row 1: SpecIcon + Name + Size indicator */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Left: icon + name */}
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="shrink-0 mt-0.5">
              <SpecIcon spec={primarySpec} color={zColor} />
            </div>
            <div className="min-w-0">
              <h3 className="text-tower-text font-mono text-[15px] font-semibold m-0 leading-tight">
                {city.name}
              </h3>
              {city.population && (
                <span className="text-[10px] font-mono text-tower-muted/40 mt-0.5 block">
                  {city.population}
                </span>
              )}
            </div>
          </div>

          {/* Right: size indicator */}
          <div className="shrink-0 flex flex-col items-end gap-1">
            <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-tower-muted/40">
              Размер города
            </span>
            <div className="flex items-center gap-[3px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="w-[5px] h-[5px] rounded-sm transition-colors"
                  style={{
                    backgroundColor: i < dots ? zColor : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-tower-muted/50">{sizeLabel}</span>
          </div>
        </div>

        {/* Row 2: Zone + Specializations + Faction */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Zone pill — left accent bar */}
          <span
            className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-mono"
            style={{
              backgroundColor: `${zColor}10`,
              border: `1px solid ${zColor}25`,
              borderLeftWidth: "3px",
              borderLeftColor: zColor,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M8 1L15 8L8 15L1 8L8 1Z" stroke={zColor} strokeWidth="1.5" fill={`${zColor}20`} />
            </svg>
            <span className="ml-1.5" style={{ color: zColor }}>
              {cityZoneLabels[city.zone]}
            </span>
          </span>

          {/* Specialization pills — outlined */}
          {activeSpecs.map((spec) => (
            <span
              key={spec}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors"
              style={{
                backgroundColor: "transparent",
                color: `${zColor}bb`,
                border: `1px solid ${zColor}35`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${zColor}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <SpecIcon spec={spec} color={zColor} />
              {citySpecializationLabels[spec]}
            </span>
          ))}

          {/* Faction pill — golden accent */}
          {city.factionName && (
            factionId ? (
              <Link
                href={`/factions?highlight=${factionId}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors"
                style={{
                  backgroundColor: "rgba(184,134,11,0.08)",
                  color: "#d4a853",
                  border: "1px solid rgba(184,134,11,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(184,134,11,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(184,134,11,0.08)";
                }}
              >
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" stroke="#d4a853" strokeWidth="1" fill="rgba(212,168,83,0.15)" />
                </svg>
                {city.factionName}
              </Link>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: "#737373",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" stroke="#737373" strokeWidth="1" fill="rgba(115,115,115,0.15)" />
                </svg>
                {city.factionName}
              </span>
            )
          )}
        </div>

        {/* Combined: Metrics + Religions */}
        <div className="mb-4 p-3 rounded-md border border-tower-border/50 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <p className="text-[9px] font-mono uppercase tracking-widest m-0 text-tower-muted/50">
              Показатели и религии
            </p>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* Metrics */}
          <div className="space-y-2 mb-3">
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

          {/* Divider */}
          <div className="h-px bg-white/[0.06] my-2.5" />

          {/* Religion pie + legend */}
          {city.religions && city.religions.length > 0 && (
            <ReligionPie religions={city.religions} />
          )}
        </div>

        {/* Description */}
        <p className="text-tower-muted text-[13px] leading-[1.7] m-0">
          {city.description}
        </p>
      </div>
    </div>
  );
}
