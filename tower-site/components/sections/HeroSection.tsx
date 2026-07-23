"use client";

import React from "react";
import Link from "next/link";

const particles = [
  { left: "8%", size: 1, duration: 28, delay: 0, drift: 12, opacity: 0.4, color: "rgba(139, 69, 19, 0.5)" },
  { left: "15%", size: 2, duration: 22, delay: 3, drift: -8, opacity: 0.35, color: "rgba(184, 134, 11, 0.4)" },
  { left: "22%", size: 1, duration: 35, delay: 7, drift: 20, opacity: 0.3, color: "rgba(115, 115, 115, 0.4)" },
  { left: "30%", size: 3, duration: 20, delay: 1, drift: -15, opacity: 0.25, color: "rgba(139, 69, 19, 0.4)" },
  { left: "38%", size: 1, duration: 32, delay: 10, drift: 10, opacity: 0.45, color: "rgba(139, 69, 19, 0.5)" },
  { left: "45%", size: 2, duration: 26, delay: 5, drift: -12, opacity: 0.3, color: "rgba(184, 134, 11, 0.35)" },
  { left: "52%", size: 1, duration: 38, delay: 12, drift: 18, opacity: 0.35, color: "rgba(115, 115, 115, 0.35)" },
  { left: "60%", size: 2, duration: 24, delay: 2, drift: -10, opacity: 0.4, color: "rgba(139, 69, 19, 0.45)" },
  { left: "67%", size: 1, duration: 30, delay: 8, drift: 14, opacity: 0.3, color: "rgba(184, 134, 11, 0.3)" },
  { left: "75%", size: 3, duration: 18, delay: 4, drift: -18, opacity: 0.25, color: "rgba(139, 69, 19, 0.35)" },
  { left: "82%", size: 1, duration: 34, delay: 14, drift: 8, opacity: 0.4, color: "rgba(115, 115, 115, 0.4)" },
  { left: "88%", size: 2, duration: 28, delay: 6, drift: -14, opacity: 0.35, color: "rgba(139, 69, 19, 0.4)" },
  { left: "93%", size: 1, duration: 40, delay: 9, drift: 22, opacity: 0.3, color: "rgba(184, 134, 11, 0.35)" },
  { left: "5%", size: 2, duration: 25, delay: 11, drift: -6, opacity: 0.25, color: "rgba(139, 69, 19, 0.3)" },
  { left: "48%", size: 1, duration: 36, delay: 13, drift: 16, opacity: 0.35, color: "rgba(115, 115, 115, 0.3)" },
  { left: "70%", size: 2, duration: 22, delay: 0, drift: -20, opacity: 0.4, color: "rgba(139, 69, 19, 0.45)" },
  { left: "25%", size: 1, duration: 30, delay: 8, drift: 10, opacity: 0.3, color: "rgba(184, 134, 11, 0.3)" },
  { left: "55%", size: 1, duration: 28, delay: 5, drift: -12, opacity: 0.35, color: "rgba(139, 69, 19, 0.4)" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Dust particles */}
      <div className="dust-particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="dust-particle"
            style={{
              "--left": p.left,
              "--size": `${p.size}px`,
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--max-opacity": p.opacity,
              color: p.color,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Scan beam */}
      <div className="scan-beam" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <p className="font-mono text-tower-rust text-xs tracking-[0.3em] uppercase mb-4 m-0 opacity-80">
          Постапокалиптическая мегаструктура
        </p>

        <h1
          className="glitch-text text-4xl md:text-6xl lg:text-7xl font-mono text-tower-text font-bold tracking-tight leading-none mb-6"
          data-text="ВАВИЛОНСКАЯ БАШНЯ"
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
          <Link href="/lore" className="hero-btn hero-btn--primary">
            Исследовать лор
          </Link>
          <Link href="/tower" className="hero-btn hero-btn--secondary">
            Архитектура Башни
          </Link>
          <Link href="/bestiary" className="hero-btn hero-btn--secondary">
            Существа
          </Link>
          <Link href="/factions" className="hero-btn hero-btn--secondary">
            Фракции
          </Link>
        </div>
      </div>
    </section>
  );
}
