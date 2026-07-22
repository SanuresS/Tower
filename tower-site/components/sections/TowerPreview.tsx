"use client";

import React from "react";
import Link from "next/link";
import { Button } from "antd";
import TowerSlice from "@/components/ui/TowerSlice";

export default function TowerPreview() {
  return (
    <section className="py-16 bg-tower-surface/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="shrink-0">
            <TowerSlice height={360} />
          </div>
          <div className="flex-1">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="font-mono text-tower-text text-xl font-bold m-0">
                  Архитектура Башни
                </h2>
                <p className="text-tower-muted text-xs mt-1 m-0">
                  100 км мегаструктура, 3 части, 6 зон
                </p>
              </div>
              <Link href="/tower">
                <Button
                  type="link"
                  className="!text-tower-rust !font-mono !text-xs"
                >
                  Подробнее →
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: "Вавилон-1",
                  desc: "50 км, цилиндр. Бывший памятник, переделанный под ЦТУ.",
                },
                {
                  name: "Вавилон-2",
                  desc: "80 км, усечённый конус. Город вокруг первой башни. Реактор и серверы ЦСУ.",
                },
                {
                  name: "Вавилон-3",
                  desc: "100 км, недостроенный. Производственные цеха и Глотка (ЦШТР-Ω).",
                },
              ].map((part) => (
                <div
                  key={part.name}
                  className="flex items-start gap-3 p-3 rounded bg-tower-bg border border-tower-border"
                >
                  <div className="w-1 h-full bg-tower-rust/40 rounded-full shrink-0 self-stretch" />
                  <div>
                    <p className="font-mono text-tower-text text-xs font-semibold m-0">
                      {part.name}
                    </p>
                    <p className="text-tower-muted text-xs m-0 mt-0.5">
                      {part.desc}
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
