'use client';

import Link from 'next/link';
import type { Product } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageProvider';
import ProductImage from './ProductImage';
import AddToBasketButton from './AddToBasketButton';

// 结构说明：图片+名称区域是整卡跳转链接，底部 MOQ/价格 + 「加入询盘篮」按钮独立一行，
// 避免按钮嵌套在 <Link> 里（嵌套交互元素既无效也无障碍不友好）。
export default function ProductCard({ product }: { product: Product }) {
  const { lang, d } = useLanguage();
  const lowestPrice = Math.min(...product.priceTiers.map((t) => t.unitPrice));

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <ProductImage category={product.category} sku={product.sku} className="h-44 w-full" />
        <div className="flex-1 p-4 pb-0">
          <h3 className="font-semibold text-slate-800 transition-colors group-hover:text-brand-700">
            {product.name[lang]}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.shortDesc[lang]}</p>
        </div>
      </Link>
      <div className="mt-3 flex items-end justify-between gap-2 p-4 pt-0">
        <div>
          <p className="text-xs text-slate-400">
            {d.products.moq}:{' '}
            <span className="font-medium text-slate-700">
              {product.moq} {product.unit[lang]}
            </span>
          </p>
          <p className="mt-0.5">
            <span className="text-xs text-slate-400">{d.products.from} </span>
            <span className="text-lg font-bold text-accent-500">${lowestPrice.toFixed(2)}</span>
          </p>
        </div>
        <AddToBasketButton slug={product.slug} />
      </div>
    </div>
  );
}
