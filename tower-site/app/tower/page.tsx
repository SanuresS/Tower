"use client";

import React from "react";
import { Card } from "antd";
import PageContainer from "@/components/layout/PageContainer";
import FloorIndicator from "@/components/ui/FloorIndicator";
import { towerZones, towerParts, towerSections } from "@/data/tower";

export default function TowerPage() {
  return (
    <PageContainer
      title="Архитектура Башни"
      subtitle="100 км мегаструктура — от основания до недостроенных этажей"
    >
      {/* Tower parts */}
      <section className="mb-12">
        <h2 className="font-mono text-tower-text text-lg font-semibold mb-4 m-0">
          Три Башни
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {towerParts.map((part) => (
            <Card
              key={part.id}
              className="!bg-tower-surface !border-tower-border"
            >
              <p className="font-mono text-tower-rust text-[10px] tracking-widest uppercase mb-1 m-0">
                {part.height}
              </p>
              <h3 className="font-mono text-tower-text text-sm font-semibold mb-2 m-0">
                {part.name}
              </h3>
              <p className="text-tower-muted text-xs mb-2 m-0">
                Форма: {part.shape}
              </p>
              <p className="text-tower-muted text-xs leading-relaxed m-0">
                {part.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Floor zones */}
      <section className="mb-12">
        <h2 className="font-mono text-tower-text text-lg font-semibold mb-4 m-0">
          Зоны этажей
        </h2>
        <div className="space-y-3">
          {towerZones.map((zone) => (
            <div
              key={zone.id}
              className="flex items-stretch gap-4 p-4 rounded bg-tower-surface border border-tower-border"
            >
              <div
                className="w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: zone.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-mono text-tower-text text-sm font-semibold m-0">
                    {zone.name}
                  </h3>
                  <FloorIndicator floors={zone.floors} />
                  <span className="font-mono text-tower-muted text-[10px]">
                    {zone.height}
                  </span>
                </div>
                <p className="text-tower-muted text-xs leading-relaxed m-0">
                  {zone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key sections */}
      <section>
        <h2 className="font-mono text-tower-text text-lg font-semibold mb-4 m-0">
          Ключевые секции
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {towerSections.map((section) => (
            <Card
              key={section.id}
              className="!bg-tower-surface !border-tower-border"
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
            </Card>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
