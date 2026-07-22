import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-tower-border bg-tower-bg mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-tower-muted text-xs font-mono m-0">
          Вавилонская Башня — проект
        </p>
        <p className="text-tower-muted/50 text-[10px] font-mono m-0">
          Постапокалиптическая мегаструктура
        </p>
      </div>
    </footer>
  );
}
