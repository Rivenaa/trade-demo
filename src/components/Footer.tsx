'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function Footer() {
  const { d } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{d.siteName}</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">{d.footer.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">
            {d.footer.quickLinks}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-accent-400">{d.nav.products}</Link></li>
            <li><Link href="/rfq" className="hover:text-accent-400">{d.nav.rfq}</Link></li>
            <li><Link href="/about" className="hover:text-accent-400">{d.nav.about}</Link></li>
            <li><Link href="/contact" className="hover:text-accent-400">{d.nav.contact}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">
            {d.footer.contactUs}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>{d.contact.address}</li>
            <li>{d.contact.phone}</li>
            <li>{d.contact.email}</li>
            <li>{d.contact.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">
        <p>© 2026 ProtoCircuit Technology Co., Limited. {d.footer.rights}</p>
        <p className="mt-1">{d.footer.demoNote}</p>
      </div>
    </footer>
  );
}
