"use client";

import React from "react";
import { getFilterStyle } from "@/lib/filters";

interface FilterBarProps {
  label: string;
  items: readonly string[];
  labels: Record<string, string>;
  selected: string;
  onSelect: (value: string) => void;
  colorFn?: (value: string) => string;
  countFn?: (value: string) => number;
}

export default function FilterBar({
  label,
  items,
  labels,
  selected,
  onSelect,
  colorFn,
  countFn,
}: FilterBarProps) {
  return (
    <div>
      <p className="text-[10px] font-mono text-tower-muted/60 uppercase tracking-widest mb-2 m-0">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onSelect("all")}
          className="px-2.5 py-1 rounded-full font-mono text-[11px] transition-all duration-200 border cursor-pointer"
          style={getFilterStyle(selected === "all", "#94a3b8")}
        >
          Все
        </button>
        {items.map((v) => {
          const isActive = selected === v;
          const color = colorFn ? colorFn(v) : "#94a3b8";
          const count = countFn ? countFn(v) : undefined;
          return (
            <button
              key={v}
              onClick={() => onSelect(v)}
              className="px-2.5 py-1 rounded-full font-mono text-[11px] transition-all duration-200 border cursor-pointer"
              style={getFilterStyle(isActive, color)}
            >
              {labels[v]}{count !== undefined ? ` (${count})` : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
