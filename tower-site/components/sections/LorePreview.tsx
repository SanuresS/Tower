"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { loreSections } from "@/data/lore";

const previewIds = ["central-story", "apocalypse", "renaissance"];
const previewTitles: Record<string, string> = {
  "central-story": "Строительство",
  apocalypse: "Апокалипсис",
  renaissance: "Возрождение",
};

export default function LorePreview() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = previewIds
    .map((id) => loreSections.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <section className="py-16" ref={ref}>
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
          {items.map((section, i) =>
            section ? (
              <div
                key={section.id}
                className="lore-card relative rounded-lg border border-tower-border bg-tower-surface overflow-hidden p-4"
                style={{
                  borderLeftWidth: "2px",
                  borderLeftColor: "rgba(139, 69, 19, 0.4)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
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
