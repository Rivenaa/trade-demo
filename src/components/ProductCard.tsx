'use client';

import Link from 'next/link';
import type { Product } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageProvider';
import ProductImage from './ProductImage';

export default function ProductCard({ product }: { product: Product }) {
  const { lang, d } = useLanguage();
  const lowestPrice = Math.min(...product.priceTiers.map((t) => t.unitPrice));

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <ProductImage category={product.category} sku={product.sku} className="h-44 w-full" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-slate-800 transition-colors group-hover:text-brand-700">
          {product.name[lang]}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-500">
          {product.shortDesc[lang]}
        </p>
        <div className="mt-3 flex items-end justify-between">
          <div className="text-sm">
            <span className="text-slate-400">{d.products.moq}: </span>
            <span className="font-medium text-slate-700">
              {product.moq} {product.unit[lang]}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-xs text-slate-400">{d.products.from}</span>
            <span className="text-lg font-bold text-accent-500">${lowestPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
