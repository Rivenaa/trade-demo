'use client';

import { useLanguage } from '@/i18n/LanguageProvider';
import InquiryForm from '@/components/InquiryForm';

export default function ContactPage() {
  const { d } = useLanguage();

  const items = [
    { label: d.contact.addressLabel, value: d.contact.address },
    { label: d.contact.phoneLabel, value: d.contact.phone },
    { label: d.contact.emailLabel, value: d.contact.email },
    { label: d.contact.hoursLabel, value: d.contact.hours },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">{d.contact.title}</h1>
      <p className="mt-2 text-slate-500">{d.contact.subtitle}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* 联系信息卡片 */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {item.label}
              </p>
              <p className="mt-1.5 font-medium text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>

        {/* 询盘表单 */}
        <InquiryForm heading={d.contact.formTitle} subheading={d.contact.formSubtitle} />
      </div>
    </div>
  );
}
