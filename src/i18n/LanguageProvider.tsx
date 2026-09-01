'use client';

// 轻量级多语言方案：React Context + 字典对象。
// 选型说明（面试可讲）：Demo 规模下不需要 next-intl 这类路由级方案；
// 生产环境面向海外 SEO 时会改用 [lang] 动态路由 + hreflang 的方案。

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Dictionary } from './types';
import { en } from './en';
import { zh } from './zh';

export type Lang = 'en' | 'zh';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  d: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'trade-demo-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  // 首次挂载时读取用户上次选择的语言（localStorage 持久化）
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh' || saved === 'en') setLang(saved);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'zh' : 'en';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const d = lang === 'zh' ? zh : en;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, d }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
