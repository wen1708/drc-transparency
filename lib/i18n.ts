type Dict = Record<string, string>;

const zh: Dict = {
  "transparency.header.title": "透明页",
  "transparency.kpi.totalSupply": "总供应量",
  "transparency.kpi.holders": "持有人数",
  "transparency.kpi.transfers": "转账次数",
  "transparency.kpi.circulating": "流通量",
  "transparency.section.token": "代币信息",
  "transparency.section.locks": "锁仓信息",
  "transparency.section.allocation": "分配结构",
  "transparency.section.audit": "审计",
  "transparency.verified": "已验证",
  "transparency.unverified": "未验证",
  "transparency.viewOnBscScan": "在 BscScan 查看合约",
  "transparency.noLocks": "暂无锁仓记录"
};

const en: Dict = {
  "transparency.header.title": "Transparency",
  "transparency.kpi.totalSupply": "Total Supply",
  "transparency.kpi.holders": "Holders",
  "transparency.kpi.transfers": "Transfers",
  "transparency.kpi.circulating": "Circulating",
  "transparency.section.token": "Token",
  "transparency.section.locks": "Locks",
  "transparency.section.allocation": "Allocation",
  "transparency.section.audit": "Audit",
  "transparency.verified": "Verified",
  "transparency.unverified": "Unverified",
  "transparency.viewOnBscScan": "View on BscScan",
  "transparency.noLocks": "No lock records"
};

export function t(key: string, lang: "zh" | "en" = "zh") {
  return (lang === "zh" ? zh : en)[key] ?? key;
}
