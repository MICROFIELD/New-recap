export function VideoImportPanel() {
  return (
    <section className="glass-card rounded-[2rem] p-5" id="import">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cyan-100/80">Step 01</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">Import video</h2>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/70">Upload or URL</span>
      </div>

      <label className="mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/30 bg-white/10 px-5 text-center transition active:scale-[0.99]">
        <input accept="video/*" className="sr-only" type="file" />
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/20 text-3xl">⇧</span>
        <span className="mt-4 text-lg font-black">Tap to upload video</span>
        <span className="mt-1 text-sm text-white/60">MP4, MOV, WebM • optimized for mobile recaps</span>
      </label>

      <div className="mt-4 rounded-3xl border border-white/12 bg-black/15 p-3">
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/45" htmlFor="video-url">
          Paste video URL
        </label>
        <div className="mt-2 flex gap-2">
          <input
            className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-200/60"
            id="video-url"
            placeholder="https://youtube.com/shorts/..."
            type="url"
          />
          <button className="touch-target rounded-2xl bg-white px-4 text-sm font-black text-studio-ink transition active:scale-95">
            Add
          </button>
        </div>
      </div>
    </section>
  );
}
