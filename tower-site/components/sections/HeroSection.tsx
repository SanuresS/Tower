"use client";

import React from "react";
import Link from "next/link";
import { Button } from "antd";
import GlitchText from "@/components/ui/GlitchText";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-tower-bg via-tower-bg to-tower-surface" />

      {/* Scanline effect area */}
      <div className="absolute inset-0 scanlines" />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <p className="font-mono text-tower-rust text-xs tracking-[0.3em] uppercase mb-4 m-0">
          Постапокалиптическая мегаструктура
        </p>

        <GlitchText
          as="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-mono text-tower-text font-bold tracking-tight leading-none mb-6"
        >
          ВАВИЛОНСКАЯ БАШНЯ
        </GlitchText>

        <p className="text-tower-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Она строилась 6500 лет. Бог умер в ней. Выжившие забыли, зачем.
          <br />
          <span className="text-tower-rust">
            12 000 этажей. Процедурный мир. Живая история.
          </span>
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/lore">
            <Button type="primary" size="large" className="!font-mono">
              Исследовать лор
            </Button>
          </Link>
          <Link href="/tower">
            <Button size="large" className="!font-mono !border-tower-border !text-tower-muted hover:!text-tower-text hover:!border-tower-rust/50">
              Архитектура Башни
            </Button>
          </Link>
        </div>

        {/* Floor scale teaser */}
        <div className="mt-16 flex flex-col items-center gap-1 opacity-40">
          {[12000, 10000, 8000, 5000, 2200, 1700, 1].map((floor, i) => (
            <div key={floor} className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-tower-muted w-10 text-right">
                {floor.toLocaleString()}
              </span>
              <div
                className="w-8 h-0.5"
                style={{
                  backgroundColor:
                    i === 0
                      ? "#94a3b8"
                      : i === 1
                        ? "#94a3b8"
                        : i === 2
                          ? "#b8860b"
                          : i === 3
                            ? "#dc2626"
                            : i === 4
                              ? "#737373"
                              : i === 5
                                ? "#22c55e"
                                : "#1a1a1a",
                }}
              />
            </div>
          ))}
          <span className="font-mono text-[8px] text-tower-muted/50 mt-1">
            ↑ 120 км
          </span>
        </div>
      </div>
    </section>
  );
}
