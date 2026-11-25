<div align="center">

<img src="public/favicon-squircle.png" width="96" alt="matheseus logo">

# matheseus

**Past paper portal, topic practice runner, and revision tracker for Edexcel A Level Maths and Further Maths.**

Browse papers, filter questions by topic, mark against official schemes, and sync your progress across devices.

[![Live Site](https://img.shields.io/badge/live-matheseus.freedev.app-4A7BF7)](https://matheseus.freedev.app)
[![React 19](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](#setup)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](#setup)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](#setup)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Sync-3ECF8E?logo=supabase&logoColor=white)](#configuration)

[Why matheseus](#why-matheseus) · [Features](#features) · [Modules](#modules) · [Setup](#setup) · [Configuration](#configuration) · [Deployment](#deployment)

</div>

---

matheseus is a web app for **Pearson Edexcel A Level Mathematics (`9MA0`)** and **Further Mathematics (`9FM0`)** revision. It combines full past paper and mock paper archives, interactive question-by-question practice with official mark schemes, grade boundary tools, and an account-synced analytics dashboard.

## Why matheseus

- **Built for Edexcel workflows.** Every paper, module, formula booklet, and raw mark grade boundary sits in one dark, distraction-free workspace.
- **Practice without friction.** Open question papers and mark schemes side-by-side, or run questions interactively with self-marking and timers.
- **Filter straight to weak areas.** Jump directly into **By Topic** mode to drill specific theorems, modules, and question types instead of hunting through full PDFs.
- **Sync across devices.** Works locally out of the box, or signs into Supabase to persist completed papers, attempt history, and predicted grades across sessions.

## Features

<table>
<tr>
<td width="50%" valign="top">

### Past Papers & Mocks
- Complete Edexcel `9MA0` and `9FM0` past paper archive
- Curated Mock Sets organised by series
- Side-by-side Question Paper and Mark Scheme split view
- Instant status toggles (*Not Started*, *In Progress*, *Completed*)

</td>
<td width="50%" valign="top">

### Practice Mode
- Interactive question-by-question runner with KaTeX rendering
- Cropped official question and mark scheme cards
- Step-by-step mark pills for fast self-marking
- Built-in exam timer with presets and audio alerts

</td>
</tr>
<tr>
<td valign="top">

### Topic Practice
- Search and filter questions by subject, module, or topic
- Drill individual questions directly without loading full papers
- Integrated score reporting and attempt review breakdowns

</td>
<td valign="top">

### Dashboard & Tools
- Module coverage bars, average score, predicted grades, and practice time
- Topic Accuracy tracking (`>80%` green, `50–80%` amber, `<50%` red)
- Interactive Grade Boundaries explorer and marks-to-next-grade calculator
- Searchable Formula Sheet alongside official Edexcel PDF booklets

</td>
</tr>
</table>

## Modules

| Subject | Modules |
|---|---|
| Mathematics (`9MA0`) | `Pure 1` · `Pure 2` · `Paper 3 (Statistics & Mechanics)` |
| Further Mathematics (`9FM0`) | `Core Pure 1` · `Core Pure 2` · `FP1` · `FP2` · `FM1` · `FM2` · `FS1` · `FS2` · `D1` · `D2` |
| Mock Sets | Structured A Level Maths & Further Maths mock sets (`src/data/mockSetsData.ts`) |

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

Open `http://localhost:5173`. Add your local `public/papers/` and `public/crops/` assets locally, or set `VITE_ASSET_BASE_URL` in `.env.local` to load them from remote object storage.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build production bundle to `dist/` |
| `npm run build:infinityfree` | Build `dist/` and package static output to `deploy-infinityfree/` without `papers/` & `crops/` |
| `npm run preview` | Preview the production build locally |

## Configuration

| What | Where |
|---|---|
| Environment variables | `.env.local` (template in [`.env.example`](.env.example)) |
| Auth & progress database | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, schema in [`supabase/schema.sql`](supabase/schema.sql) |
| CDN / R2 asset URL | `VITE_ASSET_BASE_URL` (prefixes `/papers/*` and `/crops/*` via [`src/utils/assets.ts`](src/utils/assets.ts)) |
| SPA routing rules | [`public/.htaccess`](public/.htaccess) |

## Deployment

Large exam PDFs and question crops (`public/papers/` and `public/crops/`) are excluded from Git and hosted separately on Cloudflare R2 (`VITE_ASSET_BASE_URL`), keeping the web bundle compact enough for static hosting such as InfinityFree (`npm run build:infinityfree`).
