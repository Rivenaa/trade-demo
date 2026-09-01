'use client';

import Link from 'next/link';
import { categories, getFeatured } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageProvider';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { lang, d } = useLanguage();
  const featured = getFeatured();

  return (
    <div>
      {/* Hero 区 */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-100">
            {d.home.heroBadge}
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            {d.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100 sm:text-lg">
            {d.home.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-accent-500 px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-accent-400"
            >
              {d.home.heroPrimary}
            </Link>
            <Link
              href="/rfq"
              className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {d.home.heroSecondary}
            </Link>
          </div>

          {/* 数据背书 */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/20 pt-8 sm:grid-cols-4">
            {d.home.stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-accent-400 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-brand-100 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 产品类目 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">{d.home.categoriesTitle}</h2>
        <p className="mt-2 text-slate-500">{d.home.categoriesSubtitle}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?cat=${c.id}`}
              className="group rounded-xl border border-slate-200 p-5 transition-all hover:border-brand-300 hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-800 group-hover:text-brand-700">
                {c.name[lang]}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{c.blurb[lang]}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-600">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 热销产品 */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">{d.home.featuredTitle}</h2>
              <p className="mt-2 text-slate-500">{d.home.featuredSubtitle}</p>
            </div>
            <Link href="/products" className="hidden shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700 sm:block">
              {d.home.viewAll} →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">{d.home.whyTitle}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {d.home.whyItems.map((item, i) => (
            <div key={item.title} className="rounded-xl bg-brand-50 p-5">
              <p className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{d.home.ctaTitle}</h2>
            <p className="mt-2 text-brand-100">{d.home.ctaSubtitle}</p>
          </div>
          <Link
            href="/rfq"
            className="shrink-0 rounded-lg bg-accent-500 px-8 py-3.5 text-sm font-bold text-slate-900 transition-colors hover:bg-accent-400"
          >
            {d.home.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
