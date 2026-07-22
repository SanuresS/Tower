"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";

const menuItems = [
  { key: "/", label: <Link href="/">Главная</Link> },
  { key: "/lore", label: <Link href="/lore">Лор</Link> },
  { key: "/tower", label: <Link href="/tower">Башня</Link> },
  { key: "/bestiary", label: <Link href="/bestiary">Существа</Link> },
  { key: "/cities", label: <Link href="/cities">Города</Link> },
  { key: "/factions", label: <Link href="/factions">Фракции</Link> },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeKey =
    menuItems.find((item) => item.key !== "/" && pathname.startsWith(item.key))
      ?.key ?? "/";

  return (
    <header className="sticky top-0 z-50 bg-tower-bg/95 backdrop-blur border-b border-tower-border">
      <div className="max-w-6xl mx-auto px-4 flex items-center h-12">
        {/* Logo / Title */}
        <Link href="/" className="mr-6 shrink-0">
          <span className="font-mono text-tower-rust text-sm font-bold tracking-wider">
            БАШНЯ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block flex-1">
          <Menu
            mode="horizontal"
            selectedKeys={[activeKey]}
            items={menuItems}
            className="!bg-transparent !border-none !text-tower-text"
            style={{ lineHeight: "48px" }}
          />
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden ml-auto text-tower-muted hover:text-tower-text transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {mobileOpen ? (
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <>
                <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-tower-border bg-tower-bg">
          <Menu
            mode="vertical"
            selectedKeys={[activeKey]}
            items={menuItems}
            onClick={() => setMobileOpen(false)}
            className="!bg-transparent !border-none"
          />
        </nav>
      )}
    </header>
  );
}
