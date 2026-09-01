import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct, products } from '@/data/products';
import ProductDetail from '@/components/ProductDetail';

// SSG：构建时为每个产品预渲染一个静态页面（面试点：generateStaticParams）
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// 按产品动态生成页面标题（SEO）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name.en,
    description: product.shortDesc.en,
  };
}

// 服务端组件：负责取数（Next.js 16 中 params 是 Promise，必须 await），
// 然后把可序列化的产品数据交给客户端组件渲染交互部分。
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
