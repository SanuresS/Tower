import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-tower-border bg-tower-bg mt-auto">
      {/* Ornamental divider */}
      <div className="flex items-center justify-center -mt-px">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-tower-rust/20" />
        <span className="text-tower-rust/40 text-[10px] px-2">◆</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-tower-rust/20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-tower-rust/50">
            <rect x="5" y="2" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="0.8" />
            <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="0.8" />
            <line x1="5" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          <p className="text-tower-muted text-xs font-mono m-0">
            Вавилонская Башня — проект
          </p>
        </div>
        <p className="text-tower-muted/50 text-[10px] font-mono m-0">
          12 000 этажей · Процедурный мир · Живая история
        </p>
      </div>
    </footer>
  );
}
