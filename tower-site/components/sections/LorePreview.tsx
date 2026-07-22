"use client";

import React from "react";
import Link from "next/link";
import { loreSections } from "@/data/lore";

const previewIds = ["central-story", "apocalypse", "renaissance"];
const previewTitles: Record<string, string> = {
  "central-story": "Строительство",
  apocalypse: "Апокалипсис",
  renaissance: "Возрождение",
};

export default function LorePreview() {
  const items = previewIds
    .map((id) => loreSections.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-mono text-tower-text text-xl font-bold m-0">
              Лор мира
            </h2>
            <p className="text-tower-muted text-xs mt-1 m-0">
              От утопии к апокалипсису и обратно
            </p>
          </div>
          <Link
            href="/lore"
            className="text-tower-rust text-xs font-mono hover:underline transition-colors"
          >
            Подробнее →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((section) =>
            section ? (
              <div
                key={section.id}
                className="relative rounded-lg border border-tower-border bg-tower-surface overflow-hidden transition-shadow duration-300 hover:shadow-lg p-4"
                style={{
                  borderLeftWidth: "2px",
                  borderLeftColor: "rgba(139, 69, 19, 0.4)",
                }}
              >
                <p className="font-mono text-tower-rust text-[10px] tracking-widest uppercase mb-2 m-0">
                  {previewTitles[section.id]}
                </p>
                <p className="text-tower-muted text-xs leading-relaxed m-0 line-clamp-4">
                  {section.content.split("\n\n")[0]}
                </p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
