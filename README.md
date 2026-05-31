# Video Recap Studio

A production-ready mobile-first Next.js App Router starter for a glassmorphism video recap workflow. It is preconfigured for the `recap-62a9e` Firebase project, supports direct Firebase Cloud Storage uploads for video files, and creates Firestore project documents through an App Router API route.

## Folder structure

```text
.
├── app
│   ├── api
│   │   └── import
│   │       └── route.ts
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
├── lib
│   ├── firebase
│   │   ├── client.ts
│   │   └── config.ts
│   ├── recap
│   │   └── import-project.ts
│   └── types
│       └── recap-project.ts
├── .env.local.example
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000` on a mobile viewport to preview the touch-friendly studio interface.

## Firebase setup

1. Confirm Firestore Database and Cloud Storage are enabled in the `recap-62a9e` Firebase project.
2. The provided Web App config is already committed in `lib/firebase/config.ts`, and `.env.local.example` contains the same values for easy Vercel configuration.
3. If you want a different Firebase project later, override the `NEXT_PUBLIC_FIREBASE_*` values in `.env.local` or Vercel Environment Variables.
4. Make sure your Firebase Security Rules allow the import flow you want. For development, allow authenticated or temporary test writes to `recap_projects` and uploads under `recap-videos/`.

The app uploads files directly from the browser to Firebase Cloud Storage. The `/api/import` route writes a document to the `recap_projects` Firestore collection with the import type, status, timestamps, and source details using the initialized Firebase Web SDK config.

## Vercel deployment

This project uses only Vercel-compatible packages: Next.js, React, TypeScript, Tailwind CSS, and the Firebase JS SDK. No native desktop or local-only dependencies are required.
