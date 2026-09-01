'use client';

// 询盘表单（B2B 网站的 Inquiry 核心流程）：
// 客户端先做基础校验，提交到 /api/inquiry；服务端返回字段级错误码，客户端按当前语言映射成提示文案。

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// 与服务端约定的错误码 → 多语言文案的 key 一一对应
type ErrorCode = keyof ReturnType<typeof useLanguage>['d']['inquiry']['errors'];

interface ApiResponse {
  ok: boolean;
  referenceId?: string;
  errors?: Partial<Record<string, ErrorCode>>;
}

export default function InquiryForm({
  defaultProduct = '',
  heading,
  subheading,
}: {
  defaultProduct?: string;
  heading?: string;
  subheading?: string;
}) {
  const { d } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<string, ErrorCode>>>({});
  const [referenceId, setReferenceId] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      type: 'inquiry',
      product: defaultProduct || undefined,
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim() || undefined,
      quantity: String(data.get('quantity') ?? '').trim() || undefined,
      message: String(data.get('message') ?? '').trim(),
    };

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as ApiResponse;

      if (res.ok && body.ok) {
        setReferenceId(body.referenceId ?? '');
        setStatus('success');
        form.reset();
      } else {
        setErrors(body.errors ?? {});
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-bold text-emerald-700">{d.inquiry.successTitle}</p>
        <p className="mt-2 text-sm text-emerald-600">{d.inquiry.successMessage}</p>
        <p className="mt-3 inline-block rounded-lg bg-white px-4 py-2 font-mono text-sm font-semibold text-emerald-700">
          {referenceId}
        </p>
        <div>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 rounded-lg border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
          >
            {d.inquiry.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100';
  const errorCls = 'mt-1 text-xs text-red-500';

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm" noValidate>
      <h3 className="text-lg font-bold text-slate-800">{heading ?? d.inquiry.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{subheading ?? d.inquiry.subtitle}</p>

      {defaultProduct && (
        <div className="mt-4 rounded-lg bg-brand-50 px-3.5 py-2.5 text-sm text-brand-800">
          <span className="font-medium">{d.inquiry.product}: </span>
          {defaultProduct}
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{d.inquiry.name} *</label>
          <input name="name" className={inputCls} placeholder={d.inquiry.namePlaceholder} />
          {errors.name && <p className={errorCls}>{d.inquiry.errors[errors.name]}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{d.inquiry.email} *</label>
          <input name="email" type="email" className={inputCls} placeholder={d.inquiry.emailPlaceholder} />
          {errors.email && <p className={errorCls}>{d.inquiry.errors[errors.email]}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{d.inquiry.company}</label>
          <input name="company" className={inputCls} placeholder={d.inquiry.companyPlaceholder} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{d.inquiry.quantity}</label>
          <input name="quantity" type="number" min="1" className={inputCls} placeholder={d.inquiry.quantityPlaceholder} />
          {errors.quantity && <p className={errorCls}>{d.inquiry.errors[errors.quantity]}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">{d.inquiry.message} *</label>
        <textarea name="message" rows={4} className={inputCls} placeholder={d.inquiry.messagePlaceholder} />
        {errors.message && <p className={errorCls}>{d.inquiry.errors[errors.message]}</p>}
      </div>

      {status === 'error' && Object.keys(errors).length === 0 && (
        <p className="mt-3 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          {d.inquiry.failTitle} · {d.inquiry.failMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-5 w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === 'submitting' ? d.inquiry.submitting : d.inquiry.submit}
      </button>
    </form>
  );
}
