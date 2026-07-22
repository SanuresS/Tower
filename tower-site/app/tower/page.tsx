"use client";

import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import FloorIndicator from "@/components/ui/FloorIndicator";
import TowerSlice from "@/components/ui/TowerSlice";
import { towerZones, babylonParts, towerSections, TOTAL_FLOORS } from "@/data/tower";

export default function TowerPage() {
  return (
    <PageContainer
      title="Архитектура Башни"
      subtitle={`${(TOTAL_FLOORS / 100).toFixed(0)} км мегаструктура — от основания до недостроенных этажей`}
    >
      {/* Tower visualization */}
      <section className="mb-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 p-6 rounded-lg bg-tower-surface border border-tower-border">
          <div className="shrink-0">
            <TowerSlice height={500} svgWidth={240} showBabylons showLabels />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-mono text-tower-text text-lg font-semibold mb-4 m-0">
              Структура Башни
            </h2>

            {/* Babylon legend */}
            <div className="space-y-3 mb-6">
              {babylonParts.map((part) => (
                <div
                  key={part.id}
                  className="flex items-center gap-3 p-3 rounded-md border border-tower-border/50 bg-white/[0.02] transition-shadow duration-300 hover:shadow-md"
                  style={{
                    borderLeftWidth: "2px",
                    borderLeftColor: `${part.color}60`,
                  }}
                >
                  <svg width={24} height={24} viewBox="0 0 24 24" className="shrink-0">
                    <path
                      d={
                        part.shape === "cylinder"
                          ? `M 6 20 L 6 4 L 18 4 L 18 20 Z`
                          : `M 3 20 L 7 4 L 17 4 L 21 20 Z`
                      }
                      fill="none"
                      stroke={part.color}
                      strokeWidth={1.5}
                      strokeDasharray={part.dashed ? "3 2" : "none"}
                      strokeOpacity={0.8}
                    />
                  </svg>
                  <div className="min-w-0">
                    <p className="font-mono text-tower-text text-xs font-semibold m-0">
                      {part.name}
                    </p>
                    <p className="text-tower-muted text-[10px] m-0">
                      Этажи {part.floorStart.toLocaleString()}–{part.floorEnd.toLocaleString()} ·{" "}
                      {part.shape === "cylinder" ? "Цилиндр" : "Усечённый конус"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-tower-border mb-6" />

            {/* Floor zones */}
            <h3 className="font-mono text-tower-text text-sm font-semibold mb-3 m-0">
              Зоны этажей
            </h3>
            <div className="space-y-2">
              {towerZones.map((zone) => {
                const floors = zone.floorEnd - zone.floorStart;
                const km = floors / 100;
                return (
                  <div
                    key={zone.id}
                    className="flex items-center gap-3 p-2.5 rounded-md border border-tower-border/50 bg-white/[0.02] transition-shadow duration-300 hover:shadow-md"
                    style={{
                      borderLeftWidth: "2px",
                      borderLeftColor: `${zone.color}60`,
                    }}
                  >
                    <div
                      className="w-2 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: zone.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-mono text-tower-text text-xs font-semibold m-0">
                          {zone.name}
                        </p>
                        <FloorIndicator
                          floors={`${zone.floorStart.toLocaleString()}–${zone.floorEnd.toLocaleString()}`}
                          color={zone.color}
                        />
                      </div>
                      <p className="text-tower-muted text-[10px] m-0">
                        {km} км · {floors.toLocaleString()} этажей
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Key sections */}
      <section>
        <h2 className="font-mono text-tower-text text-lg font-semibold mb-4 m-0">
          Ключевые секции
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {towerSections.map((section) => (
            <div
              key={section.id}
              className="p-4 rounded-md border border-tower-border bg-tower-surface transition-shadow duration-300 hover:shadow-md"
              style={{
                borderLeftWidth: "2px",
                borderLeftColor: "rgba(139, 69, 19, 0.4)",
              }}
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="font-mono text-tower-text text-sm font-semibold m-0">
                  {section.name}
                </h3>
                <FloorIndicator floors={section.floors} />
              </div>
              <p className="text-tower-muted text-xs leading-relaxed m-0">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
