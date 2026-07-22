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


      </div>
    </section>
  );
}
