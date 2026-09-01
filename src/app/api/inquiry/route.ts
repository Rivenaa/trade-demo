import { NextResponse } from 'next/server';

// 询盘 / RFQ 接收接口（Next.js Route Handler）。
// Demo 说明：数据校验通过后只生成询盘编号并打印日志，不做持久化。
// 生产环境的标准做法：写入数据库 + 触发邮件/WhatsApp 通知销售 + 对接 CRM（见 README）。

type ErrorCode =
  | 'nameRequired'
  | 'emailRequired'
  | 'emailInvalid'
  | 'messageRequired'
  | 'itemsRequired'
  | 'quantityInvalid';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(errors: Record<string, ErrorCode>) {
  return NextResponse.json({ ok: false, errors }, { status: 400 });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const errors: Record<string, ErrorCode> = {};

  // 通用字段：姓名 + 邮箱
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (name.length < 2) errors.name = 'nameRequired';
  if (!email) errors.email = 'emailRequired';
  else if (!EMAIL_RE.test(email)) errors.email = 'emailInvalid';

  if (body.type === 'rfq') {
    // RFQ：至少一条「产品 + 有效数量」的条目
    const items = Array.isArray(body.items) ? body.items : [];
    const validItems = items.filter(
      (it) =>
        it &&
        typeof it === 'object' &&
        typeof (it as { product?: unknown }).product === 'string' &&
        (it as { product: string }).product.trim() !== '' &&
        Number((it as { quantity?: unknown }).quantity) > 0
    );
    if (validItems.length === 0) errors.items = 'itemsRequired';
  } else {
    // 普通询盘：留言必填；数量选填但填了必须是正数
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (message.length < 10) errors.message = 'messageRequired';
    if (body.quantity !== undefined && body.quantity !== '') {
      const qty = Number(body.quantity);
      if (!Number.isFinite(qty) || qty <= 0) errors.quantity = 'quantityInvalid';
    }
  }

  if (Object.keys(errors).length > 0) return badRequest(errors);

  // 生成询盘编号（生产环境由数据库自增 ID 或 UUID 替代）
  const referenceId = `INQ-${Date.now().toString(36).toUpperCase()}`;
  console.log('[inquiry] received:', referenceId, JSON.stringify(body));

  return NextResponse.json({ ok: true, referenceId });
}
