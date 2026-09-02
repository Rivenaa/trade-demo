'use client';

// 询盘篮状态（Inquiry Basket）：B2B 买家一次采购多个 SKU，
// 把多个产品加进篮子、合并成一条询价提交——区别于 B2C 购物车的"立即下单"。
// Demo 用 localStorage 持久化；生产环境有账号体系时会改为服务端购物车。

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getProduct } from '@/data/products';

export interface BasketItem {
  slug: string;
  quantity: number;
}

interface BasketContextValue {
  items: BasketItem[];
  count: number;
  /** 客户端挂载标志：避免 SSR 首帧与 localStorage 恢复后的状态不一致（水合错误） */
  mounted: boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  has: (slug: string) => boolean;
}

const BasketContext = createContext<BasketContextValue | null>(null);

const STORAGE_KEY = 'trade-demo-basket';

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // 挂载时从 localStorage 恢复，并过滤掉数据里已不存在的产品
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BasketItem[];
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (it) => it && typeof it.slug === 'string' && it.quantity > 0 && getProduct(it.slug)
            )
          );
        }
      }
    } catch {
      // 数据损坏时忽略，用空篮子兜底
    }
    setMounted(true);
  }, []);

  // 每次变更后持久化（挂载前不写，避免把空数组覆盖掉已存数据）
  useEffect(() => {
    if (mounted) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const add = (slug: string) => {
    const product = getProduct(slug);
    if (!product) return;
    // 数量默认取该产品 MOQ —— B2B 场景细节
    setItems((prev) =>
      prev.some((it) => it.slug === slug) ? prev : [...prev, { slug, quantity: product.moq }]
    );
  };

  const remove = (slug: string) => setItems((prev) => prev.filter((it) => it.slug !== slug));

  const setQuantity = (slug: string, quantity: number) =>
    setItems((prev) => prev.map((it) => (it.slug === slug ? { ...it, quantity } : it)));

  const clear = () => setItems([]);

  const has = (slug: string) => items.some((it) => it.slug === slug);

  return (
    <BasketContext.Provider
      value={{ items, count: items.length, mounted, add, remove, setQuantity, clear, has }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket(): BasketContextValue {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error('useBasket must be used within BasketProvider');
  return ctx;
}
