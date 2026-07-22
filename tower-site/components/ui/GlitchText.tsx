"use client";

import React from "react";

interface GlitchTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  className?: string;
}

export default function GlitchText({
  children,
  as: Tag = "span",
  className = "",
}: GlitchTextProps) {
  return (
    <Tag
      className={`glitch-text cursor-default ${className}`}
      data-text={children}
    >
      {children}
    </Tag>
  );
}
