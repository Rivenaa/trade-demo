'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useBasket } from './BasketProvider';

export default function Header() {
  const { d, toggleLang } = useLanguage();
  const { count, mounted } = useBasket();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', label: d.nav.home },
    { href: '/products', label: d.nav.products },
    { href: '/rfq', label: d.nav.rfq },
    { href: '/about', label: d.nav.about },
    { href: '/contact', label: d.nav.contact },
  ];

  // 询盘篮图标 + 数量角标（mounted 后才显示数量，避免水合不一致）
  const basketLink = (
    <Link
      href="/basket"
      aria-label={d.basket.title}
      className="relative p-1 text-slate-600 transition-colors hover:text-brand-700"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 8h16l-1.6 11.2a1 1 0 01-1 .8H6.6a1 1 0 01-1-.8L4 8z" />
        <path d="M8.5 8V6.5a3.5 3.5 0 017 0V8" />
      </svg>
      {mounted && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-slate-900">
          {count}
        </span>
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#1d4ed8" />
            <circle cx="11" cy="11" r="3" fill="#fbbf24" />
            <circle cx="21" cy="21" r="3" fill="#fbbf24" />
            <path d="M14 11h7v7" stroke="#fff" strokeWidth="2" />
            <path d="M11 14v7h7" stroke="#fff" strokeWidth="2" />
          </svg>
          <span className="text-lg font-bold text-brand-800">{d.siteName}</span>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
          {basketLink}
          <button
            onClick={toggleLang}
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-500 hover:text-brand-700"
          >
            {d.langSwitch}
          </button>
          <Link
            href="/contact"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {d.nav.getQuote}
          </Link>
        </nav>

        {/* 移动端：询盘篮 + 语言切换 + 汉堡按钮 */}
        <div className="flex items-center gap-3 md:hidden">
          {basketLink}
          <button
            onClick={toggleLang}
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {d.langSwitch}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-2 text-slate-700"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            {d.nav.getQuote}
          </Link>
        </nav>
      )}
    </header>
  );
}
