import type { CategoryId } from '@/data/products';

// 产品占位图：Demo 不使用外部图片资源，按类目生成渐变 + 电路纹理 + SKU 的占位图。
// 生产环境会替换为真实的 next/image 产品图（可配 CDN / 图片优化）。

const gradients: Record<CategoryId, string> = {
  pcb: 'from-blue-600 to-cyan-500',
  pcba: 'from-emerald-600 to-teal-400',
  components: 'from-violet-600 to-purple-400',
  services: 'from-slate-700 to-slate-500',
};

export default function ProductImage({
  category,
  sku,
  className = '',
}: {
  category: CategoryId;
  sku: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradients[category]} ${className}`}
    >
      {/* 电路走线纹理 */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M10 90 V50 H40 V20 H70" stroke="#fff" strokeWidth="1.2" fill="none" />
        <path d="M90 10 V40 H60 V70 H30" stroke="#fff" strokeWidth="1.2" fill="none" />
        <circle cx="10" cy="90" r="2.5" fill="#fff" />
        <circle cx="70" cy="20" r="2.5" fill="#fff" />
        <circle cx="90" cy="10" r="2.5" fill="#fff" />
        <circle cx="30" cy="70" r="2.5" fill="#fff" />
      </svg>
      <span className="relative rounded bg-white/20 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-white">
        {sku}
      </span>
    </div>
  );
}
