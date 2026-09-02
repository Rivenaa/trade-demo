// 多语言字典类型定义：en.ts 与 zh.ts 都实现这个接口，
// TypeScript 会强制两种语言的字段保持一致（少写 key 会编译报错）。

export interface Dictionary {
  siteName: string;
  nav: {
    home: string;
    products: string;
    rfq: string;
    about: string;
    contact: string;
    getQuote: string;
  };
  langSwitch: string;
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroPrimary: string;
    heroSecondary: string;
    stats: { value: string; label: string }[];
    categoriesTitle: string;
    categoriesSubtitle: string;
    featuredTitle: string;
    featuredSubtitle: string;
    viewAll: string;
    whyTitle: string;
    whyItems: { title: string; desc: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  products: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    all: string;
    noResults: string;
    moq: string;
    from: string;
    detail: string;
  };
  product: {
    back: string;
    sku: string;
    category: string;
    moq: string;
    leadTime: string;
    priceTiers: string;
    qty: string;
    unitPrice: string;
    specs: string;
    inquiryTitle: string;
    related: string;
  };
  inquiry: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    quantity: string;
    quantityPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    product: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    failTitle: string;
    failMessage: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      itemsRequired: string;
      quantityInvalid: string;
    };
  };
  rfq: {
    title: string;
    subtitle: string;
    contactTitle: string;
    itemsTitle: string;
    itemProduct: string;
    itemProductPlaceholder: string;
    itemQty: string;
    itemQtyPlaceholder: string;
    itemNote: string;
    itemNotePlaceholder: string;
    addItem: string;
    removeItem: string;
    submit: string;
    tip: string;
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    strengthsTitle: string;
    strengths: { title: string; desc: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    hoursLabel: string;
    hours: string;
    formTitle: string;
    formSubtitle: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    contactUs: string;
    rights: string;
    demoNote: string;
  };
  basket: {
    title: string;
    empty: string;
    emptyCta: string;
    addToBasket: string;
    added: string;
    remove: string;
    quantity: string;
    moqLabel: string;
    contactTitle: string;
    messageOptional: string;
    messagePlaceholder: string;
    submit: string;
    summary: string; // 含 {count} 占位符，渲染时替换
  };
}
