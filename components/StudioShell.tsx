"use client";

import { useMemo, useState } from "react";

import { DashboardStats } from "@/components/DashboardStats";
import { ProjectTimeline } from "@/components/ProjectTimeline";
import { RecapScriptGenerator } from "@/components/RecapScriptGenerator";
import { VideoImportPanel } from "@/components/VideoImportPanel";
import { VoiceStudioControls } from "@/components/VoiceStudioControls";
import type { StudioProject } from "@/lib/types/recap-project";

const navItems = ["Dashboard", "Import", "Script", "Voice"];

const initialProjects: StudioProject[] = [
  {
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    id: "demo-import",
    sourceLabel: "game-footage.mp4",
    status: "imported",
    title: "Import game footage",
    type: "file"
  },
  {
    createdAt: new Date().toISOString(),
    id: "demo-script",
    sourceLabel: "Short-form recap draft",
    status: "queued",
    title: "Generate short-form script",
    type: "url"
  }
];

export function StudioShell() {
  const [projects, setProjects] = useState<StudioProject[]>(initialProjects);
  const projectStats = useMemo(
    () => ({
      fileImports: projects.filter((project) => project.type === "file").length,
      projects: projects.length,
      urlImports: projects.filter((project) => project.type === "url").length
    }),
    [projects]
  );

  function handleProjectCreated(project: StudioProject) {
    setProjects((currentProjects) => [project, ...currentProjects]);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-studio-gradient px-4 pb-28 pt-5 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-gradient-to-b from-white/10 to-transparent" />
      <section className="relative mx-auto flex w-full max-w-md flex-col gap-5 lg:max-w-6xl">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/80">Recap OS</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Video Recap Studio</h1>
          </div>
          <button className="touch-target rounded-2xl border border-white/20 bg-white/15 px-4 text-sm font-bold shadow-glass backdrop-blur-xl transition active:scale-95">
            Pro
          </button>
        </header>

        <nav className="no-scrollbar flex gap-2 overflow-x-auto rounded-[1.75rem] border border-white/15 bg-white/10 p-2 backdrop-blur-2xl lg:hidden">
          {navItems.map((item, index) => (
            <a
              className={`touch-target flex shrink-0 items-center rounded-2xl px-4 text-sm font-bold transition active:scale-95 ${
                index === 0 ? "bg-white text-studio-ink" : "text-white/75"
              }`}
              href={`#${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="flex flex-col gap-5">
            <DashboardStats stats={projectStats} />
            <VideoImportPanel onProjectCreated={handleProjectCreated} />
            <ProjectTimeline projects={projects} />
          </div>
          <div className="flex flex-col gap-5 lg:sticky lg:top-5">
            <RecapScriptGenerator />
            <VoiceStudioControls />
          </div>
        </div>
      </section>
    </main>
  );
}
