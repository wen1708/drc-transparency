# DRC Transparency Starter (Full)

A Next.js + TypeScript + Tailwind + React Query starter focused on a **Transparency Page** for DragonCoin.

## 🚀 Quick Start

```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev
```

Open http://localhost:3000 and click **打开透明页** to view the sample.

## ⚙️ Configure

Set your token address in `.env.local`:

```
NEXT_PUBLIC_DRC_ADDRESS=0xYourTokenAddressHere
```

Replace mock API implementations in `lib/api/transparency/clients` with real BscScan / PinkLock / TeamFinance calls.

## 📦 Structure

- `app/transparency/page.tsx` — main page wiring queries to UI
- `lib/api/transparency` — fetch functions (mocked)
- `components/transparency/*` — UI components
- `components/ui/*` — basic primitives (Card/Badge/Button/Skeleton)

## 🧩 What’s Included

- Layout & grid
- TokenInfo, Locks, Allocation, Audit sections
- Loading / Empty / Error states
- Copy contract button
- Basic theming via Tailwind
- React Query caching

## 🛠️ Next Steps

- Wire real APIs (BscScan, PinkLock, TeamFinance)
- Add Holders table & pagination
- Add i18n routing and English UI text
- Add verified badge once BscScan verification is complete
- Add vesting timeline if needed
```

Enjoy!
