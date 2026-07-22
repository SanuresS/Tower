import React from "react";

interface FloorIndicatorProps {
  floors: string;
  className?: string;
}

export default function FloorIndicator({
  floors,
  className = "",
}: FloorIndicatorProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[10px] text-tower-muted bg-tower-bg border border-tower-border rounded px-1.5 py-0.5 ${className}`}
    >
      <svg
        className="w-2.5 h-2.5 opacity-50"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1" />
        <line x1="2" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1" />
      </svg>
      {floors}
    </span>
  );
}
