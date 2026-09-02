'use client';

import { useRouter } from 'next/navigation';
import { useBasket } from './BasketProvider';
import { useLanguage } from '@/i18n/LanguageProvider';

// 「加入询盘篮」按钮：未加入 → 加入；已加入 → 点击跳询盘篮页。
// mounted 前按"未加入"渲染，避免水合不一致；挂载后如有该项会自动切换成"已加入"。
export default function AddToBasketButton({
  slug,
  size = 'sm',
}: {
  slug: string;
  size?: 'sm' | 'lg';
}) {
  const { add, has, mounted } = useBasket();
  const { d } = useLanguage();
  const router = useRouter();

  const isAdded = mounted && has(slug);
  const sizeCls =
    size === 'lg' ? 'rounded-lg px-8 py-3.5 text-sm' : 'rounded-md px-3 py-1.5 text-xs';

  if (isAdded) {
    return (
      <button
        onClick={() => router.push('/basket')}
        className={`${sizeCls} border border-emerald-500 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50`}
      >
        {d.basket.added}
      </button>
    );
  }

  return (
    <button
      onClick={() => add(slug)}
      className={`${sizeCls} bg-accent-500 font-bold text-slate-900 transition-colors hover:bg-accent-400`}
    >
      {d.basket.addToBasket}
    </button>
  );
}
