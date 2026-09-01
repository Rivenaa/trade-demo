'use client';

import type { PriceTier } from '@/data/products';
import { useLanguage } from '@/i18n/LanguageProvider';

// B2B 核心要素之一：阶梯价（MOQ + 量价折扣）表格
export default function PriceTierTable({ tiers }: { tiers: PriceTier[] }) {
  const { d } = useLanguage();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-brand-50 text-left text-brand-800">
            <th className="px-4 py-3 font-semibold">{d.product.qty}</th>
            <th className="px-4 py-3 font-semibold">{d.product.unitPrice}</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, i) => (
            <tr key={tier.minQty} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-4 py-2.5 text-slate-600">≥ {tier.minQty}</td>
              <td className="px-4 py-2.5 font-semibold text-accent-500">
                ${tier.unitPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
