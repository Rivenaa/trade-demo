'use client';

import Link from 'next/link';
import type { Product } from '@/data/products';
import { getCategory, getRelated } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageProvider';
import ProductImage from './ProductImage';
import ProductCard from './ProductCard';
import PriceTierTable from './PriceTierTable';
import InquiryForm from './InquiryForm';
import AddToBasketButton from './AddToBasketButton';

export default function ProductDetail({ product }: { product: Product }) {
  const { lang, d } = useLanguage();
  const category = getCategory(product.category);
  const related = getRelated(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link href="/products" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        ← {d.product.back}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* 左：产品图 + 阶梯价 */}
        <div>
          <ProductImage category={product.category} sku={product.sku} className="h-80 w-full rounded-2xl" />
          <h2 className="mt-8 text-lg font-bold text-slate-800">{d.product.priceTiers}</h2>
          <div className="mt-3">
            <PriceTierTable tiers={product.priceTiers} />
          </div>
        </div>

        {/* 右：基础信息 + 规格 */}
        <div>
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {category.name[lang]}
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-800 sm:text-3xl">
            {product.name[lang]}
          </h1>
          <p className="mt-3 leading-7 text-slate-500">{product.description[lang]}</p>

          <dl className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-slate-50 p-4 text-sm">
            <div>
              <dt className="text-slate-400">{d.product.sku}</dt>
              <dd className="mt-1 font-mono font-semibold text-slate-700">{product.sku}</dd>
            </div>
            <div>
              <dt className="text-slate-400">{d.product.moq}</dt>
              <dd className="mt-1 font-semibold text-slate-700">
                {product.moq} {product.unit[lang]}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">{d.product.leadTime}</dt>
              <dd className="mt-1 font-semibold text-slate-700">{product.leadTime[lang]}</dd>
            </div>
          </dl>

          {/* 加入询盘篮（B2B 核心转化动作） */}
          <div className="mt-6">
            <AddToBasketButton slug={product.slug} size="lg" />
          </div>

          <h2 className="mt-8 text-lg font-bold text-slate-800">{d.product.specs}</h2>
          <dl className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
            {product.specs.map((spec) => (
              <div key={spec.name.en} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                <dt className="text-slate-500">{spec.name[lang]}</dt>
                <dd className="text-right font-medium text-slate-700">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* 询盘表单（预填产品名） */}
      <div className="mt-12">
        <InquiryForm
          defaultProduct={`${product.name[lang]} (${product.sku})`}
          heading={d.product.inquiryTitle}
        />
      </div>

      {/* 相关产品 */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-slate-800">{d.product.related}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
