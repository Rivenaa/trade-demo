import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { BasketProvider } from '@/components/BasketProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// SEO 基础：标题模板 + 描述 + 关键词（详情页另有 generateMetadata 按产品生成标题）
export const metadata: Metadata = {
  title: {
    default: 'ProtoCircuit — PCB Fabrication & Assembly Manufacturer',
    template: '%s | ProtoCircuit',
  },
  description:
    'One-stop PCB fabrication, component sourcing and SMT assembly manufacturer in Shenzhen, China. Fast prototyping, tiered factory-direct pricing, global shipping.',
  keywords: ['PCB', 'PCBA', 'PCB prototype', 'SMT assembly', 'B2B electronics', 'Shenzhen PCB factory'],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <BasketProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </BasketProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
