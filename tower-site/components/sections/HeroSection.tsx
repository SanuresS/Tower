"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-tower-bg via-tower-bg to-tower-surface" />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <p className="font-mono text-tower-rust text-xs tracking-[0.3em] uppercase mb-4 m-0">
          Постапокалиптическая мегаструктура
        </p>

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-mono text-tower-text font-bold tracking-tight leading-none mb-6"
          style={{ textShadow: "0 0 60px rgba(139, 69, 19, 0.25)" }}
        >
          ВАВИЛОНСКАЯ БАШНЯ
        </h1>

        <p className="text-tower-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Она строилась 6500 лет. Бог умер в ней. Выжившие забыли, зачем.
          <br />
          <span className="text-tower-rust">
            12 000 этажей. Процедурный мир. Живая история.
          </span>
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/lore"
            className="inline-flex items-center px-6 py-2.5 rounded-full font-mono text-[13px] tracking-wide transition-all duration-200 border"
            style={{
              backgroundColor: "rgba(139, 69, 19, 0.15)",
              color: "#d4a853",
              border: "1px solid rgba(139, 69, 19, 0.4)",
              borderLeftWidth: "3px",
              borderLeftColor: "#8b4513",
            }}
          >
            Исследовать лор
          </Link>
          <Link
            href="/tower"
            className="inline-flex items-center px-6 py-2.5 rounded-full font-mono text-[13px] tracking-wide transition-all duration-200 border"
            style={{
              backgroundColor: "transparent",
              color: "#a3a3a3",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            Архитектура Башни
          </Link>
        </div>
      </div>
    </section>
  );
}
