"use client";

import React from "react";
import { towerZones } from "@/data/tower";

interface TowerSliceProps {
  height?: number;
  showLabels?: boolean;
}

export default function TowerSlice({
  height = 480,
  showLabels = true,
}: TowerSliceProps) {
  const totalFloors = 10000;

  return (
    <div className="flex gap-4 items-stretch" style={{ height }}>
      {/* Tower visual */}
      <div className="relative flex flex-col overflow-hidden rounded border border-tower-border bg-tower-surface"
           style={{ width: 60 }}>
        {towerZones.map((zone) => {
          const floorStart = parseInt(zone.floors?.split("–")[0]?.replace("+", "") || "0");
          const floorEnd = parseInt(zone.floors?.split("–")[1]?.replace("+", "") || zone.floors?.replace("+", "") || "10000");
          const start = Math.max(0, floorStart);
          const end = Math.min(totalFloors, floorEnd);
          const percentage = ((end - start) / totalFloors) * 100;

          return (
            <div
              key={zone.id}
              className="relative flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                height: `${percentage}%`,
                backgroundColor: zone.color,
                opacity: 0.7,
              }}
              title={`${zone.name} (${zone.floors})`}
            >
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                style={{ backgroundColor: zone.color }}
              >
                <span className="text-[8px] font-mono text-white/90 px-0.5 text-center leading-tight">
                  {zone.floors}
                </span>
              </div>
            </div>
          );
        })}
        {/* Tower outline overlay */}
        <div className="absolute inset-0 border border-tower-border/30 pointer-events-none" />
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex flex-col justify-between py-1">
          {towerZones.map((zone) => {
            const floorStart = parseInt(zone.floors?.split("–")[0]?.replace("+", "") || "0");
            const floorEnd = parseInt(zone.floors?.split("–")[1]?.replace("+", "") || zone.floors?.replace("+", "") || "10000");
            const start = Math.max(0, floorStart);
            const end = Math.min(totalFloors, floorEnd);
            const percentage = ((end - start) / totalFloors) * 100;

            return (
              <div
                key={zone.id}
                className="flex items-center gap-2"
                style={{ height: `${percentage}%` }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: zone.color }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-mono text-tower-text truncate">
                    {zone.name}
                  </p>
                  <p className="text-[10px] font-mono text-tower-muted">
                    {zone.floors}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
