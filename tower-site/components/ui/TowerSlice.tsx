"use client";

import React from "react";
import { TOTAL_FLOORS, towerZones, babylonParts } from "@/data/tower";

interface TowerSliceProps {
  height?: number;
  svgWidth?: number;
  showLabels?: boolean;
  showBabylons?: boolean;
}

function floorToY(floor: number, svgHeight: number): number {
  return ((TOTAL_FLOORS - floor) / TOTAL_FLOORS) * svgHeight;
}

function getBabylonPath(
  widthBottom: number,
  widthTop: number,
  floorStart: number,
  floorEnd: number,
  svgHeight: number,
  centerX: number
): string {
  const yBottom = floorToY(floorStart, svgHeight);
  const yTop = floorToY(floorEnd, svgHeight);
  const xLeftBottom = centerX - widthBottom / 2;
  const xRightBottom = centerX + widthBottom / 2;
  const xLeftTop = centerX - widthTop / 2;
  const xRightTop = centerX + widthTop / 2;

  return `M ${xLeftBottom} ${yBottom} L ${xLeftTop} ${yTop} L ${xRightTop} ${yTop} L ${xRightBottom} ${yBottom} Z`;
}

export default function TowerSlice({
  height = 400,
  svgWidth = 200,
  showLabels = true,
  showBabylons = true,
}: TowerSliceProps) {
  const svgHeight = height;
  const centerX = svgWidth / 2;

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start" style={{ minHeight: svgHeight }}>
      {/* SVG Tower */}
      <div className="relative w-full md:w-auto shrink-0 max-w-[240px]">
        <svg
          width="100%"
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="block"
        >
          {/* Zone backgrounds */}
          {towerZones.map((zone, index) => {
            const yTop = floorToY(zone.floorEnd, svgHeight);
            const yBottom = floorToY(zone.floorStart, svgHeight);
            const zoneHeight = yBottom - yTop;

            return (
              <rect
                key={zone.id}
                x={0}
                y={yTop}
                width={svgWidth}
                height={zoneHeight}
                fill={zone.color}
                opacity={0.35}
                style={{
                  animation: `zonePulse ${12 + index * 2}s ease-in-out infinite`,
                  animationDelay: `${index * 1.5}s`,
                }}
              >
                <title>{`${zone.name} (${zone.floorStart}–${zone.floorEnd})`}</title>
              </rect>
            );
          })}

          {/* Zone divider lines */}
          {towerZones.map((zone) => {
            const y = floorToY(zone.floorEnd, svgHeight);
            return (
              <line
                key={`divider-${zone.id}`}
                x1={0}
                y1={y}
                x2={svgWidth}
                y2={y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.5}
              />
            );
          })}

          {/* Babylon outlines */}
          {showBabylons &&
            babylonParts.map((part) => {
              const path = getBabylonPath(
                part.widthBottom,
                part.widthTop,
                part.floorStart,
                part.floorEnd,
                svgHeight,
                centerX
              );

              return (
                <path
                  key={part.id}
                  d={path}
                  fill="none"
                  stroke={part.color}
                  strokeWidth={1.5}
                  strokeOpacity={0.6}
                  strokeDasharray={part.dashed ? "6 4" : "none"}
                >
                  <title>{`${part.name} (${part.floorStart}–${part.floorEnd} этажей)`}</title>
                </path>
              );
            })}

          {/* Border */}
          <rect
            x={0.5}
            y={0.5}
            width={svgWidth - 1}
            height={svgHeight - 1}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
            rx={2}
          />
        </svg>
      </div>

      {/* Labels — absolute positioning at zone centers, reversed order */}
      {showLabels && (
        <>
          <div className="hidden md:block relative shrink-0" style={{ width: 140, height: svgHeight }}>
            {[...towerZones].reverse().map((zone) => {
              const yTop = floorToY(zone.floorEnd, svgHeight);
              const yBottom = floorToY(zone.floorStart, svgHeight);
              const centerY = (yTop + yBottom) / 2;

              return (
                <div
                  key={zone.id}
                  className="absolute flex items-center gap-2"
                  style={{
                    top: centerY,
                    transform: "translateY(-50%)",
                    left: 0,
                    right: 0,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: zone.color }}
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-tower-text leading-tight m-0">
                      {zone.name}
                    </p>
                    <p className="text-[9px] font-mono text-tower-muted leading-tight m-0">
                      {zone.floorStart}–{zone.floorEnd}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="md:hidden flex flex-wrap gap-x-3 gap-y-1 w-full">
            {towerZones.map((zone) => (
              <div key={zone.id} className="flex items-center gap-1">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: zone.color }}
                />
                <span className="text-[10px] font-mono text-tower-text whitespace-nowrap leading-tight">
                  {zone.name}
                </span>
                <span className="text-[8px] font-mono text-tower-muted whitespace-nowrap leading-tight">
                  {zone.floorStart}–{zone.floorEnd}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
