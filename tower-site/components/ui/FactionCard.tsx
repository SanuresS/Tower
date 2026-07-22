"use client";

import React from "react";
import { Card, Tag } from "antd";
import { Faction, factionTypeLabels } from "@/data/factions";

interface FactionCardProps {
  faction: Faction;
}

const typeColors: Record<string, string> = {
  clan: "red",
  coalition: "orange",
  religion: "blue",
  group: "default",
};

export default function FactionCard({ faction }: FactionCardProps) {
  return (
    <Card
      hoverable
      className="!bg-tower-surface !border-tower-border hover:!border-tower-rust/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-tower-text font-mono text-sm font-semibold m-0">
          {faction.name}
        </h3>
        <Tag className="!text-[10px] !m-0 shrink-0" color={typeColors[faction.type]}>
          {factionTypeLabels[faction.type]}
        </Tag>
      </div>

      <div className="flex gap-2 mb-2">
        <Tag className="!text-[10px] !border-tower-border !bg-tower-bg !text-tower-muted">
          {faction.location}
        </Tag>
        <Tag className="!text-[10px] !border-tower-border !bg-tower-bg !text-tower-muted">
          {faction.population}
        </Tag>
      </div>

      <p className="text-tower-muted text-xs leading-relaxed m-0">
        {faction.description}
      </p>
    </Card>
  );
}
