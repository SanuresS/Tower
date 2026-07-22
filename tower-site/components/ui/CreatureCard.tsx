"use client";

import React from "react";
import { Card, Tag } from "antd";
import {
  Creature,
  categoryLabels,
  categoryColors,
} from "@/data/bestiary";

interface CreatureCardProps {
  creature: Creature;
}

const dangerLabels = ["", "Безопасен", "Низкая", "Средняя", "Высокая", "Смертельно"];

export default function CreatureCard({ creature }: CreatureCardProps) {
  return (
    <Card
      hoverable
      className="!bg-tower-surface !border-tower-border hover:!border-tower-rust/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-tower-text font-mono text-sm font-semibold m-0">
          {creature.name}
        </h3>
        <Tag
          className="!text-[10px] !m-0 shrink-0"
          color={categoryColors[creature.category]}
        >
          {categoryLabels[creature.category]}
        </Tag>
      </div>

      <p className="text-tower-muted text-xs leading-relaxed mb-3 line-clamp-3">
        {creature.description}
      </p>

      <div className="flex flex-wrap gap-1">
        <Tag className="!text-[10px] !border-tower-border !bg-tower-bg !text-tower-muted">
          {creature.floors}
        </Tag>
        <Tag
          className="!text-[10px]"
          color={creature.dangerLevel >= 4 ? "red" : creature.dangerLevel >= 2 ? "orange" : "default"}
        >
          {dangerLabels[creature.dangerLevel]}
        </Tag>
        {creature.tags.slice(0, 2).map((tag) => (
          <Tag
            key={tag}
            className="!text-[10px] !border-tower-border !bg-tower-bg !text-tower-muted"
          >
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
}
