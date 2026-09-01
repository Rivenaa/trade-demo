'use client';

// 产品列表页：类目筛选 + 关键词搜索（客户端过滤）。
// useSearchParams 需要包一层 Suspense（Next.js 预渲染要求），所以拆成内外两个组件。

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories, products } from '@/data/products';
import type { CategoryId } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageProvider';
import ProductCard from '@/components/ProductCard';

function ProductsBrowser() {
  const { lang, d } = useLanguage();
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat');
  const [activeCat, setActiveCat] = useState<CategoryId | 'all'>(
    categories.some((c) => c.id === initialCat) ? (initialCat as CategoryId) : 'all'
  );
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (activeCat !== 'all' && p.category !== activeCat) return false;
      if (!q) return true;
      return (
        p.name.en.toLowerCase().includes(q) ||
        p.name.zh.includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shortDesc.en.toLowerCase().includes(q) ||
        p.shortDesc.zh.includes(q)
      );
    });
  }, [activeCat, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">{d.products.title}</h1>
      <p className="mt-2 text-slate-500">{d.products.subtitle}</p>

      {/* 搜索 + 类目筛选 */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={activeCat === 'all'}
            label={d.products.all}
            onClick={() => setActiveCat('all')}
          />
          {categories.map((c) => (
            <FilterPill
              key={c.id}
              active={activeCat === c.id}
              label={c.name[lang]}
              onClick={() => setActiveCat(c.id)}
            />
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={d.products.searchPlaceholder}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 lg:w-80"
        />
      </div>

      {/* 结果 */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-slate-400">{d.products.noResults}</p>
      )}
    </div>
  );
}

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-brand-600 text-white'
          : 'border border-slate-300 text-slate-600 hover:border-brand-400 hover:text-brand-700'
      }`}
    >
      {label}
    </button>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsBrowser />
    </Suspense>
  );
}
