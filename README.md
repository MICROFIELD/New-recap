# Video Recap Studio

A mobile-first Next.js App Router starter for a glassmorphism video recap workflow.

## Folder structure

```text
.
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── DashboardStats.tsx
│   ├── ProjectTimeline.tsx
│   ├── RecapScriptGenerator.tsx
│   ├── StudioShell.tsx
│   ├── VideoImportPanel.tsx
│   └── VoiceStudioControls.tsx
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` on a mobile viewport to preview the touch-friendly studio interface.

## Vercel deployment

This project uses only Next.js, React, TypeScript, Tailwind CSS, and PostCSS packages that are compatible with Vercel. No native desktop or local-only packages are required.
