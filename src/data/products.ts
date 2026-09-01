// 产品目录数据（Demo）：用本地数据文件模拟真实项目中由后端/数据库返回的产品目录。
// 主题：PCB / 电子制造外贸工厂站，所有公司与产品信息均为虚构的原创演示内容。

export type CategoryId = 'pcb' | 'pcba' | 'components' | 'services';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface PriceTier {
  minQty: number;
  unitPrice: number; // USD
}

export interface ProductSpec {
  name: LocalizedText;
  value: string;
}

export interface Category {
  id: CategoryId;
  name: LocalizedText;
  blurb: LocalizedText;
}

export interface Product {
  slug: string;
  sku: string;
  category: CategoryId;
  name: LocalizedText;
  shortDesc: LocalizedText;
  description: LocalizedText;
  moq: number;
  unit: LocalizedText;
  leadTime: LocalizedText;
  priceTiers: PriceTier[];
  specs: ProductSpec[];
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: 'pcb',
    name: { en: 'PCB Fabrication', zh: '线路板制造' },
    blurb: {
      en: 'Prototype to mass production, 1–8 layers, FR-4 / aluminum / flex.',
      zh: '从打样到量产，1–8 层，FR-4 / 铝基 / 柔性板。',
    },
  },
  {
    id: 'pcba',
    name: { en: 'PCB Assembly', zh: 'PCBA 贴片组装' },
    blurb: {
      en: 'SMT / through-hole / turnkey assembly with AOI & X-ray inspection.',
      zh: 'SMT / 插件 / 包工包料整机组装，AOI 与 X-ray 检测。',
    },
  },
  {
    id: 'components',
    name: { en: 'Components Sourcing', zh: '元器件采购' },
    blurb: {
      en: 'MCUs, passives and connectors with full traceability.',
      zh: '主控芯片、被动元件与连接器，全程可追溯。',
    },
  },
  {
    id: 'services',
    name: { en: 'Stencil & Testing', zh: '钢网与测试' },
    blurb: {
      en: 'Laser-cut stencils, flying probe test and conformal coating.',
      zh: '激光钢网、飞针测试与三防漆涂覆服务。',
    },
  },
];

export const products: Product[] = [
  {
    slug: '2-layer-fr4-pcb',
    sku: 'PCB-2L-FR4',
    category: 'pcb',
    name: { en: '2-Layer FR-4 Prototype PCB', zh: '双层 FR-4 打样线路板' },
    shortDesc: {
      en: 'Cost-effective 2-layer boards for rapid prototyping, 24h expedited available.',
      zh: '高性价比双面板，适合快速打样，支持 24 小时加急。',
    },
    description: {
      en: 'Our 2-layer FR-4 boards are the workhorse for prototypes and small batches. Manufactured with automated exposure and etching lines, every panel passes 100% electrical test before shipment.',
      zh: '双层 FR-4 板是打样与小批量的主力产品。采用全自动曝光蚀刻产线制造，每块板出货前 100% 电测。',
    },
    moq: 5,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '3–4 days', zh: '3–4 天' },
    priceTiers: [
      { minQty: 5, unitPrice: 2.8 },
      { minQty: 50, unitPrice: 1.9 },
      { minQty: 200, unitPrice: 1.2 },
    ],
    specs: [
      { name: { en: 'Base Material', zh: '基材' }, value: 'FR-4, TG150' },
      { name: { en: 'Board Thickness', zh: '板厚' }, value: '0.8–2.0 mm' },
      { name: { en: 'Copper Weight', zh: '铜厚' }, value: '1 oz / 2 oz' },
      { name: { en: 'Surface Finish', zh: '表面处理' }, value: 'HASL / Lead-free HASL / ENIG' },
      { name: { en: 'Min Trace / Space', zh: '最小线宽线距' }, value: '6 / 6 mil' },
      { name: { en: 'Min Hole Size', zh: '最小孔径' }, value: '0.3 mm' },
    ],
    featured: true,
  },
  {
    slug: '4-layer-multilayer-pcb',
    sku: 'PCB-4L-ENIG',
    category: 'pcb',
    name: { en: '4-Layer Multilayer PCB', zh: '四层多层线路板' },
    shortDesc: {
      en: '4-layer stack-up with ENIG finish for industrial control and IoT products.',
      zh: '四层板沉金工艺，适用于工控与物联网产品。',
    },
    description: {
      en: 'Balanced performance and cost for mid-complexity designs. Standard 1.6 mm stack-up with dedicated ground/power planes improves signal integrity for MCU and RF-adjacent layouts.',
      zh: '中等复杂度设计的性价比之选。标准 1.6mm 层压结构，独立地/电源平面，提升主控与射频相关布线的信号完整性。',
    },
    moq: 5,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '5–6 days', zh: '5–6 天' },
    priceTiers: [
      { minQty: 5, unitPrice: 8.9 },
      { minQty: 50, unitPrice: 6.5 },
      { minQty: 200, unitPrice: 4.8 },
    ],
    specs: [
      { name: { en: 'Base Material', zh: '基材' }, value: 'FR-4, TG170' },
      { name: { en: 'Layer Count', zh: '层数' }, value: '4' },
      { name: { en: 'Board Thickness', zh: '板厚' }, value: '1.0–2.0 mm' },
      { name: { en: 'Surface Finish', zh: '表面处理' }, value: 'ENIG (2–3 µin Au)' },
      { name: { en: 'Min Trace / Space', zh: '最小线宽线距' }, value: '5 / 5 mil' },
      { name: { en: 'Impedance Control', zh: '阻抗控制' }, value: '±10%' },
    ],
  },
  {
    slug: '6-layer-hdi-pcb',
    sku: 'PCB-6L-HDI',
    category: 'pcb',
    name: { en: '6-Layer HDI PCB', zh: '六层 HDI 高密度板' },
    shortDesc: {
      en: 'Blind/buried vias and microvias for compact, high-density designs.',
      zh: '盲埋孔与微孔工艺，面向小型化高密度设计。',
    },
    description: {
      en: 'For space-constrained products such as wearables and compact modules. Laser-drilled microvias and sequential lamination support fine-pitch BGA fan-out down to 0.4 mm pitch.',
      zh: '面向可穿戴设备与紧凑型模组等空间受限产品。激光微孔与逐次压合工艺，支持 0.4mm 间距 BGA 扇出。',
    },
    moq: 5,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '8–10 days', zh: '8–10 天' },
    priceTiers: [
      { minQty: 5, unitPrice: 19.9 },
      { minQty: 50, unitPrice: 15.5 },
      { minQty: 200, unitPrice: 11.9 },
    ],
    specs: [
      { name: { en: 'Base Material', zh: '基材' }, value: 'FR-4, TG170' },
      { name: { en: 'Layer Count', zh: '层数' }, value: '6 (1+N+1 HDI)' },
      { name: { en: 'Microvia Size', zh: '微孔孔径' }, value: '0.1 mm laser' },
      { name: { en: 'Min BGA Pitch', zh: '最小 BGA 间距' }, value: '0.4 mm' },
      { name: { en: 'Surface Finish', zh: '表面处理' }, value: 'ENIG / OSP' },
      { name: { en: 'Min Trace / Space', zh: '最小线宽线距' }, value: '3.5 / 3.5 mil' },
    ],
  },
  {
    slug: 'aluminum-pcb-led',
    sku: 'PCB-AL-LED',
    category: 'pcb',
    name: { en: 'Aluminum PCB for LED Lighting', zh: 'LED 照明铝基板' },
    shortDesc: {
      en: 'Excellent thermal dissipation for high-power LED modules.',
      zh: '高导热性能，专为大功率 LED 模组设计。',
    },
    description: {
      en: 'Aluminum-core boards move heat away from LED junctions, extending lifespan and maintaining luminous efficiency. Available in single and double layer constructions with thermal conductivity up to 3.0 W/m·K.',
      zh: '铝基板可将热量快速带离 LED 结温，延长寿命并维持光效。提供单/双层结构，导热系数最高 3.0 W/m·K。',
    },
    moq: 10,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '4–5 days', zh: '4–5 天' },
    priceTiers: [
      { minQty: 10, unitPrice: 3.5 },
      { minQty: 100, unitPrice: 2.6 },
      { minQty: 500, unitPrice: 1.8 },
    ],
    specs: [
      { name: { en: 'Base Material', zh: '基材' }, value: 'Aluminum 5052' },
      { name: { en: 'Thermal Conductivity', zh: '导热系数' }, value: '1.0–3.0 W/m·K' },
      { name: { en: 'Copper Weight', zh: '铜厚' }, value: '1–3 oz' },
      { name: { en: 'Surface Finish', zh: '表面处理' }, value: 'HASL / OSP' },
      { name: { en: 'Breakdown Voltage', zh: '耐压' }, value: '≥ 2 kV' },
      { name: { en: 'Max Size', zh: '最大尺寸' }, value: '600 × 1200 mm' },
    ],
    featured: true,
  },
  {
    slug: 'flexible-pcb-fpc',
    sku: 'PCB-FPC-2L',
    category: 'pcb',
    name: { en: 'Flexible PCB (FPC)', zh: '柔性线路板 FPC' },
    shortDesc: {
      en: 'Polyimide flex circuits for hinges, wearables and camera modules.',
      zh: '聚酰亚胺软板，适用于转轴、可穿戴与摄像头模组。',
    },
    description: {
      en: 'Single and double-sided flex circuits with stiffener options. Dynamic flexing endurance tested to over 100k cycles for hinge and moving-cable applications.',
      zh: '单/双面软板，可选补强板。动态弯折寿命实测超过 10 万次，适用于转轴与运动线缆场景。',
    },
    moq: 10,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '6–8 days', zh: '6–8 天' },
    priceTiers: [
      { minQty: 10, unitPrice: 9.8 },
      { minQty: 100, unitPrice: 7.4 },
      { minQty: 500, unitPrice: 5.2 },
    ],
    specs: [
      { name: { en: 'Base Material', zh: '基材' }, value: 'Polyimide (PI)' },
      { name: { en: 'Layer Count', zh: '层数' }, value: '1–2' },
      { name: { en: 'Thickness', zh: '厚度' }, value: '0.1–0.3 mm' },
      { name: { en: 'Stiffener', zh: '补强' }, value: 'PI / FR-4 / Steel' },
      { name: { en: 'Min Trace / Space', zh: '最小线宽线距' }, value: '4 / 4 mil' },
      { name: { en: 'Surface Finish', zh: '表面处理' }, value: 'ENIG' },
    ],
  },
  {
    slug: 'smt-prototype-assembly',
    sku: 'PCBA-SMT-PROTO',
    category: 'pcba',
    name: { en: 'SMT Prototype Assembly', zh: 'SMT 打样贴片' },
    shortDesc: {
      en: 'Fast SMT assembly from 2 boards, full AOI inspection included.',
      zh: '2 片起贴，速度快，全系标配 AOI 检测。',
    },
    description: {
      en: 'Send us your Gerber, BOM and pick-and-place files — we handle solder paste printing, placement, reflow and AOI. Ideal for engineering validation before mass production.',
      zh: '提供 Gerber、BOM 与坐标文件即可，我们完成印刷、贴片、回流焊与 AOI 检测，适合量产前的工程验证。',
    },
    moq: 2,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '2–3 days', zh: '2–3 天' },
    priceTiers: [
      { minQty: 2, unitPrice: 15.0 },
      { minQty: 20, unitPrice: 9.5 },
      { minQty: 100, unitPrice: 6.8 },
    ],
    specs: [
      { name: { en: 'Placement Accuracy', zh: '贴片精度' }, value: '±0.035 mm' },
      { name: { en: 'Min Package', zh: '最小封装' }, value: '0201 / BGA 0.4 mm' },
      { name: { en: 'Solder Type', zh: '焊料' }, value: 'Lead-free SAC305' },
      { name: { en: 'Inspection', zh: '检测' }, value: 'AOI 100%' },
      { name: { en: 'Max Board Size', zh: '最大板尺寸' }, value: '510 × 460 mm' },
      { name: { en: 'Components', zh: '物料方式' }, value: 'Consigned or kitted' },
    ],
    featured: true,
  },
  {
    slug: 'turnkey-pcba',
    sku: 'PCBA-TURNKEY',
    category: 'pcba',
    name: { en: 'Turnkey PCBA (Fab + Sourcing + Assembly)', zh: 'PCBA 一站式服务（制板+采购+贴片）' },
    shortDesc: {
      en: 'We source components, fabricate boards and assemble — one PO, one shipment.',
      zh: '元器件采购、制板、贴片一站完成，一张订单一次交付。',
    },
    description: {
      en: 'True one-stop service: send your design files and we return tested, ready-to-use assemblies. Component sourcing through authorized channels with alternatives suggested for shortage parts.',
      zh: '真正的一站式：提供设计文件，我们交付测试合格的成品板。元器件经授权渠道采购，缺料器件提供替代建议。',
    },
    moq: 10,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '10–15 days', zh: '10–15 天' },
    priceTiers: [
      { minQty: 10, unitPrice: 25.0 },
      { minQty: 100, unitPrice: 19.0 },
      { minQty: 500, unitPrice: 14.0 },
    ],
    specs: [
      { name: { en: 'Service Scope', zh: '服务范围' }, value: 'Fab + BOM sourcing + SMT + DIP + Test' },
      { name: { en: 'Sourcing Channel', zh: '采购渠道' }, value: 'Authorized distributors' },
      { name: { en: 'Inspection', zh: '检测' }, value: 'AOI + X-ray + FCT (optional)' },
      { name: { en: 'BOM Lines', zh: 'BOM 行数' }, value: 'Up to 300' },
      { name: { en: 'Traceability', zh: '追溯' }, value: 'Lot-level records' },
      { name: { en: 'Warranty', zh: '质保' }, value: '12 months workmanship' },
    ],
  },
  {
    slug: 'through-hole-assembly',
    sku: 'PCBA-DIP',
    category: 'pcba',
    name: { en: 'Through-Hole / Mixed Assembly', zh: '插件 / 混装焊接' },
    shortDesc: {
      en: 'Wave soldering and hand soldering for connectors, transformers and large parts.',
      zh: '波峰焊与手工焊，面向连接器、变压器等大器件。',
    },
    description: {
      en: 'Mixed SMT + through-hole builds handled in one pass: SMT lines feed into wave soldering with selective fixtures for odd-form parts. IPC-A-610 Class 2 workmanship standard.',
      zh: 'SMT 与插件混装一次完成：贴片线后接波峰焊，异形器件配选择性治具。焊接标准 IPC-A-610 Class 2。',
    },
    moq: 5,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '4–6 days', zh: '4–6 天' },
    priceTiers: [
      { minQty: 5, unitPrice: 12.0 },
      { minQty: 50, unitPrice: 8.9 },
      { minQty: 200, unitPrice: 6.2 },
    ],
    specs: [
      { name: { en: 'Process', zh: '工艺' }, value: 'Wave + selective + hand solder' },
      { name: { en: 'Standard', zh: '执行标准' }, value: 'IPC-A-610 Class 2' },
      { name: { en: 'Max Board Size', zh: '最大板尺寸' }, value: '450 × 350 mm' },
      { name: { en: 'Inspection', zh: '检测' }, value: 'AOI + visual' },
      { name: { en: 'Conformal Coat', zh: '三防漆' }, value: 'Optional' },
      { name: { en: 'Lead Time', zh: '交期' }, value: 'From 4 days' },
    ],
  },
  {
    slug: 'bga-qfn-assembly',
    sku: 'PCBA-BGA',
    category: 'pcba',
    name: { en: 'BGA / QFN Fine-Pitch Assembly', zh: 'BGA / QFN 精密焊接' },
    shortDesc: {
      en: 'Fine-pitch placement down to 0.4 mm with 100% X-ray inspection.',
      zh: '最小 0.4mm 间距贴装，100% X-ray 检测。',
    },
    description: {
      en: 'For processors, FPGAs and RF modules in BGA/QFN packages. Nitrogen reflow environment and 3D X-ray inspection ensure void rate under 15% on critical joints.',
      zh: '面向 BGA/QFN 封装的处理器、FPGA 与射频模组。氮气回流焊环境加 3D X-ray 检测，关键焊点空洞率控制在 15% 以内。',
    },
    moq: 2,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '5–7 days', zh: '5–7 天' },
    priceTiers: [
      { minQty: 2, unitPrice: 29.0 },
      { minQty: 20, unitPrice: 22.0 },
      { minQty: 100, unitPrice: 16.0 },
    ],
    specs: [
      { name: { en: 'Min BGA Pitch', zh: '最小 BGA 间距' }, value: '0.4 mm' },
      { name: { en: 'Reflow', zh: '回流焊' }, value: 'Nitrogen, 10 zones' },
      { name: { en: 'X-ray', zh: 'X-ray 检测' }, value: '100%, 3D' },
      { name: { en: 'Void Rate', zh: '空洞率' }, value: '≤ 15% critical joints' },
      { name: { en: 'Rework', zh: '返修' }, value: 'BGA rework station' },
      { name: { en: 'Moisture Control', zh: '湿敏管控' }, value: 'MSL 3 handling' },
    ],
  },
  {
    slug: 'arm-cortex-mcu',
    sku: 'COMP-MCU-M4',
    category: 'components',
    name: { en: 'ARM Cortex-M4 Microcontroller', zh: 'ARM Cortex-M4 微控制器' },
    shortDesc: {
      en: '168 MHz, 512 KB flash, LQFP-64. Authorized channel, full traceability.',
      zh: '168MHz 主频、512KB Flash、LQFP-64 封装，授权渠道全程可追溯。',
    },
    description: {
      en: 'Popular general-purpose MCU for industrial control and IoT nodes. Supplied in original factory packaging with date-code records kept per lot for warranty tracking.',
      zh: '工控与物联网节点常用主控。原厂包装出货，按批次留存日期码记录，便于质保追溯。',
    },
    moq: 10,
    unit: { en: 'pcs', zh: '只' },
    leadTime: { en: 'In stock / 2–4 weeks', zh: '现货 / 2–4 周' },
    priceTiers: [
      { minQty: 10, unitPrice: 1.85 },
      { minQty: 100, unitPrice: 1.62 },
      { minQty: 1000, unitPrice: 1.38 },
    ],
    specs: [
      { name: { en: 'Core', zh: '内核' }, value: 'ARM Cortex-M4 @ 168 MHz' },
      { name: { en: 'Flash / RAM', zh: '闪存 / 内存' }, value: '512 KB / 128 KB' },
      { name: { en: 'Package', zh: '封装' }, value: 'LQFP-64' },
      { name: { en: 'Supply Voltage', zh: '供电电压' }, value: '1.8–3.6 V' },
      { name: { en: 'Interfaces', zh: '接口' }, value: 'UART / SPI / I2C / CAN / USB' },
      { name: { en: 'Temperature', zh: '工作温度' }, value: '-40 ~ +85 °C' },
    ],
  },
  {
    slug: 'mlcc-capacitor-kit',
    sku: 'COMP-MLCC-KIT',
    category: 'components',
    name: { en: 'MLCC Capacitor Assortment Kit', zh: '贴片电容组合套装' },
    shortDesc: {
      en: '0603/0805, 50 values × 100 pcs, X7R dielectric, labeled reels.',
      zh: '0603/0805 封装，50 个容值 × 100 只，X7R 介质，标签编带。',
    },
    description: {
      en: 'Engineering-friendly assortment covering 1 pF to 10 µF. Each value individually reeled and labeled for quick prototyping and repair benches.',
      zh: '覆盖 1pF–10µF 的工程常用容值。每个容值独立编带贴标，适合研发打样与维修工作台。',
    },
    moq: 1,
    unit: { en: 'kits', zh: '套' },
    leadTime: { en: 'In stock', zh: '现货' },
    priceTiers: [
      { minQty: 1, unitPrice: 12.9 },
      { minQty: 10, unitPrice: 9.9 },
      { minQty: 50, unitPrice: 7.5 },
    ],
    specs: [
      { name: { en: 'Package Sizes', zh: '封装' }, value: '0603 / 0805' },
      { name: { en: 'Dielectric', zh: '介质' }, value: 'X7R' },
      { name: { en: 'Value Range', zh: '容值范围' }, value: '1 pF – 10 µF' },
      { name: { en: 'Tolerance', zh: '精度' }, value: '±10%' },
      { name: { en: 'Voltage', zh: '耐压' }, value: '16–50 V' },
      { name: { en: 'Quantity', zh: '数量' }, value: '50 values × 100 pcs' },
    ],
  },
  {
    slug: 'board-connectors',
    sku: 'COMP-CONN',
    category: 'components',
    name: { en: 'Board-to-Board & Wire Connectors', zh: '板对板与线对板连接器' },
    shortDesc: {
      en: '1.0–2.54 mm pitch, SMT and DIP options, gold-plated contacts.',
      zh: '1.0–2.54mm 间距，贴片/插件可选，镀金触点。',
    },
    description: {
      en: 'Broad connector lineup for board-to-board and wire-to-board links. Contact plating options from tin to 30 µin gold for different mating-cycle requirements.',
      zh: '覆盖板对板与线对板连接的常用型号。触点镀层从镀锡到 30µin 镀金可选，匹配不同插拔寿命需求。',
    },
    moq: 100,
    unit: { en: 'pcs', zh: '只' },
    leadTime: { en: 'In stock / 2 weeks', zh: '现货 / 2 周' },
    priceTiers: [
      { minQty: 100, unitPrice: 0.12 },
      { minQty: 1000, unitPrice: 0.09 },
      { minQty: 10000, unitPrice: 0.06 },
    ],
    specs: [
      { name: { en: 'Pitch', zh: '间距' }, value: '1.0 / 1.27 / 2.0 / 2.54 mm' },
      { name: { en: 'Mounting', zh: '安装方式' }, value: 'SMT / DIP' },
      { name: { en: 'Plating', zh: '镀层' }, value: 'Tin / 3–30 µin Au' },
      { name: { en: 'Current Rating', zh: '额定电流' }, value: '1–3 A' },
      { name: { en: 'Mating Cycles', zh: '插拔寿命' }, value: '50–500 cycles' },
      { name: { en: 'Temperature', zh: '工作温度' }, value: '-40 ~ +105 °C' },
    ],
  },
  {
    slug: 'ac-dc-power-module',
    sku: 'COMP-PSU',
    category: 'components',
    name: { en: 'AC-DC Isolated Power Module', zh: 'AC-DC 隔离电源模块' },
    shortDesc: {
      en: '85–265 VAC input, 5 V / 12 V output, 3–15 W, UL & CE certified.',
      zh: '85–265VAC 输入，5V/12V 输出，3–15W，UL 与 CE 认证。',
    },
    description: {
      en: 'Drop-in isolated power modules that simplify certification of the end product. Built-in over-voltage, over-current and short-circuit protection.',
      zh: '即插即用的隔离电源模块，简化整机认证。内置过压、过流与短路保护。',
    },
    moq: 10,
    unit: { en: 'pcs', zh: '只' },
    leadTime: { en: 'In stock', zh: '现货' },
    priceTiers: [
      { minQty: 10, unitPrice: 3.2 },
      { minQty: 100, unitPrice: 2.7 },
      { minQty: 1000, unitPrice: 2.1 },
    ],
    specs: [
      { name: { en: 'Input', zh: '输入' }, value: '85–265 VAC' },
      { name: { en: 'Output', zh: '输出' }, value: '5 V / 12 V DC' },
      { name: { en: 'Power', zh: '功率' }, value: '3–15 W' },
      { name: { en: 'Isolation', zh: '隔离耐压' }, value: '3000 VAC' },
      { name: { en: 'Efficiency', zh: '效率' }, value: '≥ 80%' },
      { name: { en: 'Certification', zh: '认证' }, value: 'UL / CE / RoHS' },
    ],
  },
  {
    slug: 'smt-stencil-framed',
    sku: 'SERV-STENCIL',
    category: 'services',
    name: { en: 'Laser-Cut SMT Stencil (Framed)', zh: '激光 SMT 钢网（带框）' },
    shortDesc: {
      en: '370 × 470 mm framed stencil, electropolished apertures, 24h delivery.',
      zh: '370×470mm 带框钢网，孔壁电抛光，24 小时交付。',
    },
    description: {
      en: 'Precision laser-cut stainless steel stencils matched to your paste layer. Electropolishing improves paste release for 0201 and fine-pitch apertures.',
      zh: '按锡膏层精密激光切割的不锈钢钢网。电抛光孔壁改善 0201 与细间距焊盘的脱模效果。',
    },
    moq: 1,
    unit: { en: 'pcs', zh: '张' },
    leadTime: { en: '24 hours', zh: '24 小时' },
    priceTiers: [
      { minQty: 1, unitPrice: 18.0 },
      { minQty: 5, unitPrice: 15.0 },
      { minQty: 20, unitPrice: 12.0 },
    ],
    specs: [
      { name: { en: 'Material', zh: '材质' }, value: 'SUS304 stainless, 0.12 mm' },
      { name: { en: 'Frame Size', zh: '网框尺寸' }, value: '370 × 470 mm' },
      { name: { en: 'Cutting Accuracy', zh: '切割精度' }, value: '±5 µm' },
      { name: { en: 'Finish', zh: '处理' }, value: 'Electropolished' },
      { name: { en: 'Min Aperture', zh: '最小开孔' }, value: '0.18 mm' },
      { name: { en: 'Data Format', zh: '资料格式' }, value: 'Gerber / PCB file' },
    ],
    featured: true,
  },
  {
    slug: 'flying-probe-test',
    sku: 'SERV-FPT',
    category: 'services',
    name: { en: 'Flying Probe Testing Service', zh: '飞针测试服务' },
    shortDesc: {
      en: 'No fixture cost, ideal for prototypes and small batches.',
      zh: '无治具成本，适合打样与小批量全测。',
    },
    description: {
      en: 'Fixtureless electrical testing for opens, shorts and netlist verification. Test program generated from your Gerber data within hours.',
      zh: '无治具电测，覆盖开路、短路与网络核对。测试程序依据 Gerber 数据数小时内生成。',
    },
    moq: 5,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '1–2 days', zh: '1–2 天' },
    priceTiers: [
      { minQty: 5, unitPrice: 2.5 },
      { minQty: 50, unitPrice: 1.8 },
      { minQty: 200, unitPrice: 1.2 },
    ],
    specs: [
      { name: { en: 'Test Type', zh: '测试类型' }, value: 'Open / short / netlist' },
      { name: { en: 'Probe Count', zh: '针数' }, value: '4 probes' },
      { name: { en: 'Min Pad', zh: '最小焊盘' }, value: '8 mil' },
      { name: { en: 'Test Voltage', zh: '测试电压' }, value: 'Up to 250 V' },
      { name: { en: 'Fixture', zh: '治具' }, value: 'Not required' },
      { name: { en: 'Report', zh: '报告' }, value: 'Per-board pass/fail log' },
    ],
  },
  {
    slug: 'conformal-coating',
    sku: 'SERV-COAT',
    category: 'services',
    name: { en: 'Conformal Coating Service', zh: '三防漆涂覆服务' },
    shortDesc: {
      en: 'Acrylic / silicone coating for humid and outdoor environments.',
      zh: '丙烯酸 / 有机硅涂覆，适应潮湿与户外环境。',
    },
    description: {
      en: 'Selective spray coating keeps connectors and test points mask-free while protecting the rest of the assembly. Cured thickness 30–80 µm with UV inspection.',
      zh: '选择性喷涂，连接器与测试点遮蔽保护，其余区域均匀覆盖。固化厚度 30–80µm，UV 灯全检。',
    },
    moq: 10,
    unit: { en: 'pcs', zh: '片' },
    leadTime: { en: '2–3 days', zh: '2–3 天' },
    priceTiers: [
      { minQty: 10, unitPrice: 1.5 },
      { minQty: 100, unitPrice: 1.1 },
      { minQty: 500, unitPrice: 0.8 },
    ],
    specs: [
      { name: { en: 'Coating Type', zh: '涂料类型' }, value: 'Acrylic / Silicone' },
      { name: { en: 'Thickness', zh: '厚度' }, value: '30–80 µm' },
      { name: { en: 'Method', zh: '工艺' }, value: 'Selective spray' },
      { name: { en: 'Masking', zh: '遮蔽' }, value: 'Per drawing' },
      { name: { en: 'Inspection', zh: '检验' }, value: 'UV light 100%' },
      { name: { en: 'Standard', zh: '标准' }, value: 'IPC-CC-830' },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
