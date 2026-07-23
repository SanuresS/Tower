"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TowerSlice from "@/components/ui/TowerSlice";
import { babylonParts } from "@/data/tower";

export default function TowerPreview() {
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

  return (
    <section className="py-16 bg-tower-surface/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div
            className="shrink-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scaleY(1) translateY(0)" : "scaleY(0.85) translateY(20px)",
              transformOrigin: "bottom center",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <TowerSlice height={400} svgWidth={200} showBabylons />
          </div>
          <div
            className="flex-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="font-mono text-tower-text text-xl font-bold m-0">
                  Архитектура Башни
                </h2>
                <p className="text-tower-muted text-xs mt-1 m-0">
                  120 км мегаструктура, 3 вложенные части, 6 зон
                </p>
              </div>
              <Link
                href="/tower"
                className="text-tower-rust text-xs font-mono hover:underline transition-colors"
              >
                Подробнее →
              </Link>
            </div>

            <div className="space-y-3">
              {babylonParts.map((part, i) => (
                <div
                  key={part.id}
                  className="flex items-start gap-3 p-3 rounded-md border border-tower-border/50 bg-white/[0.02] transition-shadow duration-300 hover:shadow-md"
                  style={{
                    borderLeftWidth: "2px",
                    borderLeftColor: `${part.color}60`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-15px)",
                    transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="w-1 h-full rounded-full shrink-0 self-stretch"
                    style={{
                      backgroundColor: part.color,
                      opacity: 0.6,
                      borderStyle: part.dashed ? "dashed" : "solid",
                    }}
                  />
                  <div>
                    <p className="font-mono text-tower-text text-xs font-semibold m-0">
                      {part.name}
                    </p>
                    <p className="text-tower-muted text-xs m-0 mt-0.5">
                      {part.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
