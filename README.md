# matheseus

Past paper portal, topic practice runner, and revision tracker for Pearson Edexcel A Level Mathematics (`9MA0`) and Further Mathematics (`9FM0`).

## Features

- **Past Papers & Mock Sets**: Archive of Edexcel Maths (`P1`, `P2`, `P3`) and Further Maths (`CP1`, `CP2`, `FP1`, `FP2`, `FM1`, `FM2`, `FS1`, `FS2`, `D1`, `D2`) papers plus mock sets.
- **Topic Practice**: Filter and practice past paper questions by subject, module, topic, or theorem.
- **Practice Mode & Split View**: Interactive question runner with mark schemes, countdown timer, and side-by-side QP/MS view.
- **Grade Boundaries & Formulae**: Edexcel grade boundaries calculator and searchable formula reference with official PDF booklets.
- **Dashboard & Cloud Sync**: Track module coverage, topic accuracy, and attempt history with optional Supabase account sync.

## Setup

### Requirements
- Node.js v18+
- npm

### Local Development
```bash
git clone https://github.com/Abeer-Maheshwari/matheseus.git
cd matheseus
npm install
cp .env.example .env.local
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

For static hosting with paper/crop assets offloaded to object storage (such as Cloudflare R2 via `VITE_ASSET_BASE_URL`):
```bash
npm run build:infinityfree
```
