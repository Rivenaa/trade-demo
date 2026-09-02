# ProtoCircuit — 外贸 B2B 网站 Demo

一个面向海外买家的 **PCB 制造外贸 B2B 网站** 作品集项目。实现了外贸 B2B 站的核心业务闭环：**产品目录 → 阶梯价展示 → 询盘（Inquiry）→ 批量询价（RFQ）**，中英双语，响应式。

> ⚠️ 说明：本项目为**个人作品集 Demo**，公司与产品数据均为虚构的原创内容，仅用于展示开发能力。

## 技术栈

- **Next.js 16**（App Router）+ **React 19** + **TypeScript**
- **Tailwind CSS v4**（CSS-first 主题配置）
- 产品数据：本地 TS 数据文件模拟后端目录（便于演示数据建模）
- 询盘后端：Next.js **Route Handler**（`/api/inquiry`），字段级校验 + 错误码约定

## 功能清单（对应 B2B 业务概念）

| 功能 | 业务概念 |
|---|---|
| 首页 Hero / 类目 / 热销 / 工厂实力 / CTA | 营销型落地页 |
| 产品列表：类目筛选 + 关键词搜索 | 产品目录 / SKU 体系 |
| 产品详情：规格表、MOQ、交期 | 工业品类目详情 |
| 阶梯价表格（量价折扣，FOB 深圳） | B2B 定价模式 |
| 询盘表单（产品预填、双语错误提示） | Inquiry 询盘系统 |
| 询盘篮（多产品加篮合并提交，localStorage 持久化，Header 角标） | B2B 询盘篮（多 SKU 合并询价，类阿里国际站） |
| RFQ 批量询价（动态增删条目） | RFQ 报价流程 |
| 中 / 英语言切换（localStorage 记忆） | 外贸多语言 |
| `generateStaticParams` 静态生成 16 个产品页 + `generateMetadata` 动态标题 | SSG / SEO |

## 本地运行

```bash
npm install
npm run dev        # 开发：http://localhost:3000
npm run build      # 生产构建
npm run start      # 生产模式运行
```

## 目录结构

```
src/
  app/
    page.tsx                 # 首页
    products/page.tsx        # 产品列表（筛选 + 搜索，useSearchParams + Suspense）
    products/[slug]/page.tsx # 产品详情（服务端组件，SSG + 动态 metadata）
    rfq/page.tsx             # RFQ 批量询价
    basket/page.tsx          # 询盘篮（多产品合并提交，复用 /api/inquiry 的 rfq 分支）
    about/page.tsx           # 关于我们
    contact/page.tsx         # 联系我们
    api/inquiry/route.ts     # 询盘/RFQ 接收接口
  components/                # Header / Footer / ProductCard / InquiryForm / BasketProvider 等
  data/products.ts           # 产品目录数据（类型化建模）
  i18n/                      # 轻量多语言：字典 + Context（en / zh 类型强制同步）
```

## API 说明

`POST /api/inquiry`

- 普通询盘：`{ type: "inquiry", name, email, company?, quantity?, message }`
- RFQ：`{ type: "rfq", name, email, company?, items: [{ product, quantity, note? }] }`
- 成功：`200 { ok: true, referenceId }`
- 校验失败：`400 { ok: false, errors: { 字段: 错误码 } }`，客户端按当前语言把错误码映射为提示文案

> **Demo 边界**：校验通过后仅生成询盘编号并打印日志，不持久化。生产环境标准做法：写入数据库 → 触发邮件/WhatsApp 通知销售 → 对接 CRM 分配询盘，并加验证码/限流防垃圾询盘。

## 部署（Vercel 免费）

1. 把本仓库 push 到 GitHub
2. 登录 [vercel.com](https://vercel.com)（可用 GitHub 账号直接登录）
3. **Add New → Project** → 导入该仓库 → 保持默认配置点 **Deploy**
4. 约 1 分钟后获得 `https://<项目名>.vercel.app` 链接，即可发给 HR

## 配套文档

- [INTERVIEW.md](./INTERVIEW.md) —— 面试讲解稿：这个项目怎么讲、常问问题怎么答
