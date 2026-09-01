'use client';

import { useLanguage } from '@/i18n/LanguageProvider';

export default function AboutPage() {
  const { d } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">{d.about.title}</h1>
      <p className="mt-2 text-slate-500">{d.about.subtitle}</p>

      <div className="mt-8 space-y-5 leading-8 text-slate-600">
        {d.about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold text-slate-800">{d.about.strengthsTitle}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {d.about.strengths.map((s) => (
          <div key={s.title} className="rounded-xl bg-brand-50 p-5">
            <h3 className="font-semibold text-brand-800">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
