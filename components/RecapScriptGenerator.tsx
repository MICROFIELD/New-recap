const formats = ["Hook", "Highlights", "Tutorial", "Story"];

export function RecapScriptGenerator() {
  return (
    <section className="glass-card rounded-[2rem] p-5" id="script">
      <div>
        <p className="text-sm font-semibold text-fuchsia-100/80">Step 02</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Recap script generator</h2>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Shape the narration arc before sending it to voice studio.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {formats.map((format, index) => (
          <button
            className={`touch-target rounded-2xl border px-4 text-sm font-bold transition active:scale-95 ${
              index === 0
                ? "border-fuchsia-200/70 bg-fuchsia-200 text-studio-ink"
                : "border-white/15 bg-white/10 text-white/70"
            }`}
            key={format}
          >
            {format}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-3xl border border-white/12 bg-black/15 p-3">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/45" htmlFor="recap-brief">
          Creative brief
        </label>
        <textarea
          className="mt-2 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white outline-none placeholder:text-white/35 focus:border-fuchsia-200/60"
          id="recap-brief"
          placeholder="Example: Turn the final match into a 60-second energetic recap with a cliffhanger ending."
        />
      </div>

      <button className="touch-target mt-4 w-full rounded-3xl bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 px-5 text-base font-black text-studio-ink shadow-glow transition active:scale-[0.98]">
        Generate recap script
      </button>
    </section>
  );
}
