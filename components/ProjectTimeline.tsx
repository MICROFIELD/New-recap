import type { StudioProject } from "@/lib/types/recap-project";

type ProjectTimelineProps = {
  projects: StudioProject[];
};

function formatRelativeTime(value: string) {
  const createdAt = new Date(value).getTime();
  const diffInSeconds = Math.max(0, Math.round((Date.now() - createdAt) / 1000));

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.round(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric"
  }).format(createdAt);
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  return (
    <section className="glass-card rounded-[2rem] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight">Production queue</h2>
        <span className="text-sm font-bold text-white/45">{projects.length} tasks</span>
      </div>

      <div className="mt-5 space-y-3">
        {projects.map((project, index) => (
          <article className="flex items-center gap-3 rounded-3xl border border-white/12 bg-white/10 p-3" key={project.id}>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-sm font-black">
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-black">{project.title}</h3>
              <p className="mt-1 truncate text-xs text-white/50">
                {project.type.toUpperCase()} • {project.sourceLabel} • {formatRelativeTime(project.createdAt)}
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold capitalize text-white/60">
              {project.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
