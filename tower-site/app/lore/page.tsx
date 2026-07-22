"use client";

import React, { useState } from "react";
import { Tabs } from "antd";
import PageContainer from "@/components/layout/PageContainer";
import { loreSections, terminology } from "@/data/lore";

export default function LorePage() {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <PageContainer
      title="Лор мира"
      subtitle="История Вавилонской Башни от рождения до возрождения"
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "story",
            label: "История",
            children: (
              <div className="space-y-8">
                {loreSections.map((section, i) => (
                  <article
                    key={section.id}
                    className="relative pl-6 border-l border-tower-border"
                  >
                    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-tower-rust -translate-x-[5px] mt-1.5" />
                    <p className="font-mono text-tower-rust text-[10px] tracking-widest uppercase mb-1 m-0">
                      Часть {i + 1}
                    </p>
                    <h2 className="font-mono text-tower-text text-lg font-semibold mb-3 m-0">
                      {section.title}
                    </h2>
                    <div className="text-tower-muted text-sm leading-relaxed space-y-3">
                      {section.content.split("\n\n").map((paragraph, j) => (
                        <p key={j} className="m-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ),
          },
          {
            key: "terms",
            label: "Терминология",
            children: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {terminology.map((item) => (
                  <div
                    key={item.term}
                    className="p-4 rounded bg-tower-surface border border-tower-border"
                  >
                    <h3 className="font-mono text-tower-rust text-sm font-semibold mb-1 m-0">
                      {item.term}
                    </h3>
                    <p className="text-tower-muted text-xs leading-relaxed m-0">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />
    </PageContainer>
  );
}
