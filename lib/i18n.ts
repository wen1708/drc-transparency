// lib/i18n.ts
export type Dict = Record<string, string>;

const zh: Dict = {
  "transparency.header.title": "透明页",
  "transparency.kpi.totalSupply": "总供应量",
  "transparency.kpi.holders": "持有人数",
  "transparency.kpi.transfers": "转账次数",
  "transparency.kpi.locked": "已锁定",
  "transparency.kpi.circulating": "流通量",
  "transparency.footer.note": "数据来源：区块链浏览器及合约接口",
};

const en: Dict = {
  "transparency.header.title": "Transparency",
  "transparency.kpi.totalSupply": "Total Supply",
  "transparency.kpi.holders": "Holders",
  "transparency.kpi.transfers": "Transfers",
  "transparency.kpi.locked": "Locked",
  "transparency.kpi.circulating": "Circulating",
  "transparency.footer.note": "Data source: blockchain explorer and contract APIs",
};

export const dict = { zh, en };
