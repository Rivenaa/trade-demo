'use client';

// RFQ 批量询价页：B2B 场景买家通常一次询多个产品，
// 用动态条目列表（增删行）+ datalist 产品联想实现。

import { useState } from 'react';
import type { FormEvent } from 'react';
import { products } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageProvider';

interface RfqItem {
  product: string;
  quantity: string;
  note: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function RfqPage() {
  const { lang, d } = useLanguage();
  const [items, setItems] = useState<RfqItem[]>([{ product: '', quantity: '', note: '' }]);
  const [status, setStatus] = useState<Status>('idle');
  const [referenceId, setReferenceId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const updateItem = (index: number, patch: Partial<RfqItem>) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, { product: '', quantity: '', note: '' }]);

  const removeItem = (index: number) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

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
      items: items
        .filter((it) => it.product.trim() !== '')
        .map((it) => ({
          product: it.product.trim(),
          quantity: Number(it.quantity),
          note: it.note.trim() || undefined,
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

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-xl font-bold text-emerald-700">{d.inquiry.successTitle}</p>
          <p className="mt-2 text-sm text-emerald-600">{d.inquiry.successMessage}</p>
          <p className="mt-4 inline-block rounded-lg bg-white px-4 py-2 font-mono text-sm font-semibold text-emerald-700">
            {referenceId}
          </p>
        </div>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100';

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">{d.rfq.title}</h1>
      <p className="mt-2 text-slate-500">{d.rfq.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* 联系方式 */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-800">{d.rfq.contactTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <input name="name" required placeholder={d.inquiry.namePlaceholder} className={inputCls} />
            <input name="email" type="email" required placeholder={d.inquiry.emailPlaceholder} className={inputCls} />
            <input name="company" placeholder={d.inquiry.companyPlaceholder} className={inputCls} />
          </div>
        </section>

        {/* 询价条目 */}
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-800">{d.rfq.itemsTitle}</h2>
          <datalist id="product-options">
            {products.map((p) => (
              <option key={p.slug} value={`${p.name[lang]} (${p.sku})`} />
            ))}
          </datalist>

          <div className="mt-4 space-y-4">
            {items.map((item, i) => (
              <div key={i} className="rounded-lg bg-slate-50 p-4">
                <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                  <input
                    list="product-options"
                    value={item.product}
                    onChange={(e) => updateItem(i, { product: e.target.value })}
                    placeholder={d.rfq.itemProductPlaceholder}
                    className={inputCls}
                  />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(i, { quantity: e.target.value })}
                    placeholder={d.rfq.itemQtyPlaceholder}
                    className={inputCls}
                  />
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    value={item.note}
                    onChange={(e) => updateItem(i, { note: e.target.value })}
                    placeholder={d.rfq.itemNotePlaceholder}
                    className={inputCls}
                  />
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(i)}
                      className="shrink-0 text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      {d.rfq.removeItem}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {d.rfq.addItem}
          </button>
        </section>

        {status === 'error' && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">{d.rfq.tip}</p>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-lg bg-brand-600 px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? d.inquiry.submitting : d.rfq.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
