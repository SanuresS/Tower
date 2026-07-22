"use client";

import React from "react";
import {
  City,
  cityTypeLabels,
  cityZoneLabels,
  cityZoneColors,
  cityTypeIcons,
} from "@/data/cities";

interface CityCardProps {
  city: City;
  highlighted?: boolean;
}

function CityTypeIcon({ type, color }: { type: City["type"]; color: string }) {
  const size = 14;
  switch (type) {
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
          <path d="M8 2L14 14H2L8 2Z" stroke={color} strokeWidth="1.2" fill={`${color}20`} />
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

export default function CityCard({ city, highlighted }: CityCardProps) {
  const zColor = cityZoneColors[city.zone];

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
        {/* Header: icon + name + type badge */}
        <div className="flex items-start gap-2.5 mb-2">
          <div className="shrink-0 mt-0.5">
            <CityTypeIcon type={city.type} color={zColor} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-tower-text font-mono text-[15px] font-semibold m-0 leading-snug">
                {city.name}
              </h3>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] shrink-0 mt-0.5"
                style={{
                  backgroundColor: `${zColor}18`,
                  color: zColor,
                  border: `1px solid ${zColor}30`,
                }}
              >
                <span className="text-[9px] opacity-50">{cityTypeIcons[city.type]}</span>
                {cityTypeLabels[city.type]}
              </span>
            </div>
          </div>
        </div>

        {/* Badges row: zone + faction */}
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

          {city.faction && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#a3a3a3",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-[9px] opacity-50">Фракция:</span>
              {city.faction}
            </span>
          )}

          {city.population && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                color: "#a3a3a3",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-[9px] opacity-50">Масштаб:</span>
              {city.population}
            </span>
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
