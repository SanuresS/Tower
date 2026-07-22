import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function PageContainer({
  children,
  title,
  subtitle,
}: PageContainerProps) {
  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {title && (
          <div className="mb-8">
            <h1 className="font-mono text-tower-text text-2xl md:text-3xl font-bold tracking-tight m-0">
              {title}
            </h1>
            {subtitle && (
              <p className="text-tower-muted text-sm mt-2 m-0">{subtitle}</p>
            )}
            <div className="mt-4 h-px bg-gradient-to-r from-tower-rust/60 via-tower-rust/20 to-transparent" />
          </div>
        )}
        {children}
      </div>
    </main>
  );
}
