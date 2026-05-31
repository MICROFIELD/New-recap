const timeline = [
  { title: "Import game footage", status: "Complete", time: "2m ago" },
  { title: "Generate short-form script", status: "Draft", time: "Now" },
  { title: "Mix voiceover and captions", status: "Queued", time: "Next" }
];

export function ProjectTimeline() {
  return (
    <section className="glass-card rounded-[2rem] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight">Production queue</h2>
        <span className="text-sm font-bold text-white/45">3 tasks</span>
      </div>

      <div className="mt-5 space-y-3">
        {timeline.map((item, index) => (
          <article className="flex items-center gap-3 rounded-3xl border border-white/12 bg-white/10 p-3" key={item.title}>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-sm font-black">
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-black">{item.title}</h3>
              <p className="mt-1 text-xs text-white/50">{item.time}</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60">{item.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
