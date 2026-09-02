'use client';

// 询盘篮页：买家把多个产品合并成一条询价提交（B2B 标志性交互）。
// 提交复用现有 /api/inquiry 接口的 type:'rfq' 分支，后端无需改动。

import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { getProduct } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useBasket } from '@/components/BasketProvider';
import ProductImage from '@/components/ProductImage';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function BasketPage() {
  const { lang, d } = useLanguage();
  const { items, mounted, remove, setQuantity, clear } = useBasket();
  const [status, setStatus] = useState<Status>('idle');
  const [referenceId, setReferenceId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 失效 slug 兜底过滤（Provider 加载时已过滤一次，这里双保险）
  const rows = items
    .map((it) => ({ item: it, product: getProduct(it.slug) }))
    .filter((r): r is { item: (typeof items)[number]; product: NonNullable<ReturnType<typeof getProduct>> } => !!r.product);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const data = new FormData(e.currentTarget);
    const payload = {
      type: 'rfq',
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim() || undefined,
      message: String(data.get('message') ?? '').trim() || undefined,
      items: rows.map(({ item, product }) => ({
        product: `${product.name.en} (${product.sku})`,
        // 数量低于 MOQ 时按 MOQ 提交（B2B 规则），高于则按填写值
        quantity: Math.max(product.moq, item.quantity || 0),
      })),
    };

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as {
        ok: boolean;
        referenceId?: string;
        errors?: Record<string, string>;
      };

      if (res.ok && body.ok) {
        setReferenceId(body.referenceId ?? '');
        setStatus('success');
        clear(); // 提交成功后清空询盘篮
      } else {
        const first = body.errors ? Object.values(body.errors)[0] : undefined;
        setErrorMsg(
          first && first in d.inquiry.errors
            ? d.inquiry.errors[first as keyof typeof d.inquiry.errors]
            : d.inquiry.failMessage
        );
        setStatus('error');
      }
    } catch {
      setErrorMsg(d.inquiry.failMessage);
      setStatus('error');
    }
  }

  // 提交成功态
  if (status === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-xl font-bold text-emerald-700">{d.inquiry.successTitle}</p>
          <p className="mt-2 text-sm text-emerald-600">{d.inquiry.successMessage}</p>
          <p className="mt-4 inline-block rounded-lg bg-white px-4 py-2 font-mono text-sm font-semibold text-emerald-700">
            {referenceId}
          </p>
          <div>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {d.basket.emptyCta}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 空态（mounted 前也先按空态渲染，避免水合闪烁）
  if (!mounted || rows.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-xl font-bold text-slate-700">{d.basket.title}</p>
        <p className="mt-3 text-slate-500">{d.basket.empty}</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-8 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {d.basket.emptyCta}
        </Link>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100';

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">{d.basket.title}</h1>
      <p className="mt-2 text-sm text-slate-500">
        {d.basket.summary.replace('{count}', String(rows.length))}
      </p>

      {/* 条目列表 */}
      <div className="mt-6 space-y-4">
        {rows.map(({ item, product }) => (
          <div
            key={item.slug}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            <Link href={`/products/${product.slug}`} className="shrink-0">
              <ProductImage category={product.category} sku={product.sku} className="h-20 w-20 rounded-lg" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${product.slug}`}
                className="block truncate font-semibold text-slate-800 hover:text-brand-700"
              >
                {product.name[lang]}
              </Link>
              <p className="mt-0.5 font-mono text-xs text-slate-400">{product.sku}</p>
              <p className="mt-1 text-xs text-slate-400">
                {d.basket.moqLabel}: {product.moq} {product.unit[lang]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400">{d.basket.quantity}</label>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  setQuantity(item.slug, Number.isFinite(n) && n > 0 ? n : 1);
                }}
                className="w-24 rounded-lg border border-slate-300 px-2.5 py-2 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <button
              onClick={() => remove(item.slug)}
              className="shrink-0 text-sm font-medium text-red-500 hover:text-red-600"
            >
              {d.basket.remove}
            </button>
          </div>
        ))}
      </div>

      {/* 联系信息 + 提交 */}
      <form onSubmit={handleSubmit} className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-800">{d.basket.contactTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <input name="name" required placeholder={d.inquiry.namePlaceholder} className={inputCls} />
          <input name="email" type="email" required placeholder={d.inquiry.emailPlaceholder} className={inputCls} />
          <input name="company" placeholder={d.inquiry.companyPlaceholder} className={inputCls} />
        </div>
        <textarea
          name="message"
          rows={3}
          placeholder={d.basket.messagePlaceholder}
          className={`${inputCls} mt-4`}
        />

        {status === 'error' && (
          <p className="mt-3 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-5 w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {status === 'submitting' ? d.inquiry.submitting : d.basket.submit}
        </button>
      </form>
    </div>
  );
}
