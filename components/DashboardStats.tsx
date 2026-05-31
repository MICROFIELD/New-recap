type DashboardStatsProps = {
  stats: {
    fileImports: number;
    projects: number;
    urlImports: number;
  };
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    { label: "Projects", value: stats.projects.toString(), detail: "Firestore records", accent: "from-cyan-300 to-blue-400" },
    { label: "File imports", value: stats.fileImports.toString(), detail: "Firebase Storage", accent: "from-fuchsia-300 to-pink-400" },
    { label: "URL imports", value: stats.urlImports.toString(), detail: "External sources", accent: "from-violet-300 to-indigo-400" }
  ];

  return (
    <section className="glass-card rounded-[2rem] p-5" id="dashboard">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cyan-100/80">Today&apos;s workspace</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">Creator dashboard</h2>
        </div>
        <span className="rounded-full border border-emerald-300/30 bg-emerald-300/15 px-3 py-1 text-xs font-bold text-emerald-100">
          Live
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cards.map((stat) => (
          <article className="rounded-3xl border border-white/12 bg-white/10 p-4" key={stat.label}>
            <div className={`mb-4 h-1.5 w-12 rounded-full bg-gradient-to-r ${stat.accent}`} />
            <p className="text-sm text-white/65">{stat.label}</p>
            <p className="mt-1 text-3xl font-black">{stat.value}</p>
            <p className="mt-2 text-xs font-semibold text-white/55">{stat.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
